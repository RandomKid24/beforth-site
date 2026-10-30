import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body || '{}')
        : req.body && typeof req.body === 'object'
          ? req.body
          : {};

    const { name, email, company, phone, subject, message } = body as {
      name?: string;
      email?: string;
      company?: string;
      phone?: string;
      subject?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // CRM lead webhook (server-side: the URL holds the token, and the CRM is plain http,
    // which browsers block from an https page). Set CRM_WEBHOOK_URL in Vercel.
    const crmUrl = process.env.CRM_WEBHOOK_URL;
    const emailConfigured = !!(process.env.GMAIL_USER && process.env.GMAIL_PASS);
    if (!crmUrl && !emailConfigured) {
      res.status(500).json({ success: false, message: 'Contact service is not configured.' });
      return;
    }

    const sendToCrm = async () => {
      if (!crmUrl) return;
      const r = await fetch(crmUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: name,
          email,
          company: company || '',
          phone: phone || '',
          need: subject || '',
          details: message,
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (r.status === 400) {
        const data = (await r.json().catch(() => ({}))) as { errors?: Record<string, unknown> };
        throw Object.assign(new Error('CRM validation failed'), { crmErrors: data.errors ?? {} });
      }
      if (!r.ok) throw new Error(`CRM responded ${r.status}`);
    };

    const sendEmail = async () => {
      if (!emailConfigured) return;
      await sendMail();
    };

    const sendMail = async () => {
    // Configure the SMTP transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const recipients = [
      process.env.GMAIL_USER,
      'support@beforth.in',
      'vivek.zope@beforth.in',
    ].filter(Boolean).join(', ');

    // Setup email data
    const mailOptions = {
      from: `"Beforth Website" <${process.env.GMAIL_USER}>`,
      to: recipients,
      replyTo: email,
      subject: `New Contact Form Submission: ${String(subject || 'General Inquiry').replace(/[\r\n]+/g, ' ')}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #0F172A; border-bottom: 2px solid #slate-200; padding-bottom: 10px;">New Form Submission</h2>
          <p>You have received a new message from the Beforth Website contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 120px;">Name</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${esc(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Email</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${esc(email)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Phone</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${esc(phone)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Subject</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${esc(subject)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Company</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${esc(company)}</td>
            </tr>
          </table>
          
          <h3 style="margin-top: 30px;">Message:</h3>
          <div style="padding: 15px; background: #f8fafc; border-left: 4px solid #0F172A; white-space: pre-wrap;">${esc(message)}</div>
          
          <p style="margin-top: 40px; font-size: 12px; color: #64748b;">This email was automatically generated from your Vercel frontend.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    };

    // Either channel reaching the team is enough; a lead is never lost to one outage.
    const [crm, mail] = await Promise.allSettled([sendToCrm(), sendEmail()]);
    if (crm.status === 'rejected') console.error('CRM error:', crm.reason);
    if (mail.status === 'rejected') console.error('Email error:', mail.reason);

    const crmErrors = crm.status === 'rejected' ? (crm.reason as { crmErrors?: Record<string, unknown> }).crmErrors : undefined;
    if (crmErrors) {
      res.status(400).json({ success: false, message: 'Please check the highlighted details.', errors: crmErrors });
      return;
    }
    const delivered = (crmUrl && crm.status === 'fulfilled') || (emailConfigured && mail.status === 'fulfilled');
    if (!delivered) {
      res.status(500).json({ success: false, message: 'Failed to send message.' });
      return;
    }

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error: any) {
    console.error('Email error:', error);
    const isJsonParseError =
      error instanceof SyntaxError || /JSON/i.test(String(error?.message || ''));
    const errorMessage = String(error?.message || '').trim();

    res.status(isJsonParseError ? 400 : 500).json({
      success: false,
      message: isJsonParseError
        ? 'Invalid JSON payload.'
        : errorMessage || 'Failed to send message.',
      error: error.message,
    });
  }
}
