import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { setConsent } from '@/lib/consent';

export type LegalKind = 'privacy' | 'terms' | 'cookies';

const UPDATED = '26 October 2026';
const EMAIL = 'support@beforth.in';

const P = ({ children }: { children: React.ReactNode }) => <p className="body mb-4">{children}</p>;
const UL = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="mb-4 flex flex-col gap-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 body">
        <span className="w-1.5 h-1.5 rounded-full bg-signal mt-[0.7em] shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
const Mail = () => (
  <a href={`mailto:${EMAIL}`} className="text-ink underline hover:text-signal">{EMAIL}</a>
);

type Section = { h: string; body: React.ReactNode };

const PRIVACY: Section[] = [
  {
    h: 'Who we are',
    body: (
      <P>
        BeForth ("BeForth", "we", "us") is a software company based in Nashik, Maharashtra, India. This
        policy explains what personal information we collect through beforth.in, why, and what you can do about
        it. We handle personal information in line with the Information Technology Act, 2000, the
        Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or
        Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023 as its provisions come into
        force.
      </P>
    ),
  },
  {
    h: 'What we collect',
    body: (
      <>
        <P><strong className="text-ink">Contact form.</strong> When you send an enquiry we collect:</P>
        <UL items={['your name and email address (required)', 'your company name (optional)', 'the topic you select', 'the message you write']} />
        <P>
          Please do not put sensitive information such as financial account details, passwords or government ID
          numbers in the message. We do not need them to respond.
        </P>
        <P>
          <strong className="text-ink">Live chat (only if you accept it).</strong> If you accept the chat widget, our
          chat provider Tawk.to processes the messages you type, any name or email you share, your approximate
          location and IP address, and cookie identifiers.
        </P>
        <P>
          <strong className="text-ink">Email and phone.</strong> If you email or call us, we keep what you send and
          the contact details you used.
        </P>
        <P>
          <strong className="text-ink">Automatic data.</strong> Our hosting provider (Vercel) records standard server
          logs such as IP address, browser and pages requested. We use Vercel Web Analytics to count page views and
          clicks on phone and email links. It does not use cookies and does not record anything you type into a form.
        </P>
        <P>We do not run user accounts, take payments, or sell anything through this website.</P>
      </>
    ),
  },
  {
    h: 'Why we use it',
    body: (
      <UL
        items={[
          'to reply to your enquiry and discuss a possible project',
          'to respond to career enquiries sent through the form',
          'to keep the website secure and understand which pages are useful',
          'to meet legal obligations and handle disputes',
        ]}
      />
    ),
  },
  {
    h: 'Your consent',
    body: (
      <P>
        We use the details you give in the contact form only because you submit them, after ticking the consent
        box on the form. The live chat loads only after you accept it in the cookie banner. You can withdraw
        consent at any time by writing to <Mail />; withdrawal does not affect what we did before it, and we may
        keep information we are legally required to keep.
      </P>
    ),
  },
  {
    h: 'Who receives your information',
    body: (
      <>
        <P>We do not sell your information and do not use it for marketing lists. It is handled by:</P>
        <UL
          items={[
            'Our team at BeForth, who read contact form emails.',
            'Google (Gmail), which delivers contact form messages to our mailboxes.',
            'Our CRM system, where contact form enquiries are recorded as leads so we can follow up.',
            'Vercel Inc., which hosts the website and provides analytics.',
            'Tawk.to Inc., only if you accept the chat widget.',
            'Google Fonts and Google Maps, which receive your IP address when the page loads fonts or the map on our Contact page.',
            'Authorities or courts, where the law requires.',
          ]}
        />
        <P>
          These providers are located partly outside India, so your information may be transferred and stored
          abroad. We use providers with established security practices and share only what is needed.
        </P>
      </>
    ),
  },
  {
    h: 'How long we keep it',
    body: (
      <P>
        Enquiry emails and CRM lead records are kept for as long as needed to respond and for a reasonable period afterwards to follow up
        or resolve disputes, then deleted. If an enquiry becomes a project, the project records are handled under the
        written agreement for that project. Chat records are kept by Tawk.to under its own policy.
      </P>
    ),
  },
  {
    h: 'Security',
    body: (
      <P>
        The website is served over HTTPS, enquiries are sent from our server to company mailboxes, and we do not
        keep them in a public database. We limit access to the people who need it. No system is completely secure,
        and we cannot guarantee absolute security of data sent over the internet.
      </P>
    ),
  },
  {
    h: 'Your rights',
    body: (
      <>
        <P>You can ask us to:</P>
        <UL
          items={[
            'tell you what personal information we hold about you',
            'correct or update it',
            'delete it, unless we must keep it by law',
            'withdraw your consent',
            'respond to a complaint about how we handled it',
          ]}
        />
        <P>
          Write to <Mail /> from the email address you used. We may need to confirm your identity first.
        </P>
      </>
    ),
  },
  {
    h: "Children",
    body: <P>This website is meant for businesses and adults. We do not knowingly collect information from anyone under 18.</P>,
  },
  {
    h: 'Other websites',
    body: <P>Our pages link to LinkedIn and Instagram. They have their own privacy practices, which we do not control.</P>,
  },
  {
    h: 'Grievance officer and contact',
    body: (
      <>
        <P>
          For questions, requests or complaints about your personal information, contact the Grievance Officer, BeForth,
          Nashik, Maharashtra, India, at <Mail /> or +91 97661 83834 (Mon–Fri, 9:00 AM–6:00 PM IST). We aim to
          acknowledge complaints promptly and resolve them within one month.
        </P>
      </>
    ),
  },
  {
    h: 'Changes',
    body: <P>We may update this policy. The date at the top shows the latest version.</P>,
  },
];

const TERMS: Section[] = [
  {
    h: 'Using this website',
    body: (
      <P>
        These terms apply to beforth.in. By using the website you agree to them. If you do not agree, please do not use
        it. See also our <Link to="/privacy-policy" className="text-ink underline hover:text-signal">Privacy Policy</Link> and{' '}
        <Link to="/cookie-policy" className="text-ink underline hover:text-signal">Cookie Policy</Link>.
      </P>
    ),
  },
  {
    h: 'Information only',
    body: (
      <P>
        The website describes BeForth and its services. It is not an offer, quotation or contract. Any work we do for
        you is governed by a separate written agreement or proposal that you and BeForth both accept. Sending an enquiry
        does not create an obligation on either side.
      </P>
    ),
  },
  {
    h: 'Demonstrations and sample data',
    body: (
      <P>
        Dashboards, screens and product pages show demonstration builds with sample data to illustrate how our
        software can work. They are not client deliveries or a promise of specific features, results or timelines. Names,
        figures and records shown in them are illustrative.
      </P>
    ),
  },
  {
    h: 'Articles and general advice',
    body: (
      <P>
        Articles in Insights are general information, not legal, financial, tax or professional advice. Please take
        advice suited to your own situation before acting on them.
      </P>
    ),
  },
  {
    h: 'Intellectual property',
    body: (
      <P>
        The text, design, logo, illustrations and code on this website belong to BeForth or its licensors. You may view
        and share pages for personal or internal business reference. Please do not copy, republish or reuse them
        commercially without our written permission.
      </P>
    ),
  },
  {
    h: 'Acceptable use',
    body: (
      <>
        <P>When using the website or contact form, you agree not to:</P>
        <UL
          items={[
            'submit false, unlawful, abusive or misleading content',
            'send spam, malware or automated bulk messages',
            'try to gain unauthorised access to, disrupt or overload the website',
            'submit personal information about other people without a right to do so',
          ]}
        />
      </>
    ),
  },
  {
    h: 'Disclaimer',
    body: (
      <P>
        We try to keep the website accurate and available, but it is provided "as is" without warranties of any kind, to
        the extent the law permits. We do not guarantee that it will be error-free, uninterrupted or always up to date.
        Links to other websites are for convenience; we are not responsible for their content.
      </P>
    ),
  },
  {
    h: 'Limitation of liability',
    body: (
      <P>
        To the extent the law permits, BeForth is not liable for any indirect or consequential loss arising from your use
        of, or inability to use, this website. Nothing in these terms limits liability that cannot be limited by law.
      </P>
    ),
  },
  {
    h: 'Governing law',
    body: (
      <P>
        These terms are governed by the laws of India. Courts at Nashik, Maharashtra have jurisdiction over disputes
        arising from use of this website, subject to any mandatory rights you have under law.
      </P>
    ),
  },
  {
    h: 'Changes and contact',
    body: (
      <P>
        We may update these terms from time to time; the date above shows the latest version. Questions: <Mail />.
      </P>
    ),
  },
];

const COOKIE_ROWS: [string, string, string][] = [
  ['Tawk.to live chat', 'Sets cookies to recognise a visitor and keep a chat going. Processes chat messages.', 'Only after you accept'],
  ['Vercel Web Analytics', 'Counts page views and clicks on phone and email links. No cookies, no personal data.', 'Always on'],
  ['Google Fonts', 'No cookies. Your browser requests fonts from Google, which sees your IP address.', 'Always on'],
  ['Google Maps', 'Map on the Contact page. Google may set cookies when it loads.', 'On the Contact page'],
  ['Your choice (beforth-consent)', 'Stored in your browser so we do not ask again. Not a tracking cookie.', 'After you choose'],
];

function CookieChoice() {
  return (
    <button type="button" onClick={() => setConsent(null)} className="btn-line !px-5 !py-2.5 !text-[13px]">
      Change my choice
    </button>
  );
}

const COOKIES: Section[] = [
  {
    h: 'What cookies are',
    body: (
      <P>
        Cookies are small files a website stores in your browser. We keep their use to a minimum: this website has no
        advertising or tracking cookies, and no accounts to sign in to.
      </P>
    ),
  },
  {
    h: 'What this website uses',
    body: (
      <div className="mb-4 border border-ink/12 divide-y divide-ink/12 bg-white">
        {COOKIE_ROWS.map(([name, what, when]) => (
          <div key={name} className="grid md:grid-cols-[1fr_2fr_0.8fr] gap-x-6 gap-y-1 p-4">
            <span className="display-md text-[15px]">{name}</span>
            <span className="body-tight">{what}</span>
            <span className="label !text-[11px] md:text-right">{when}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    h: 'Your choice',
    body: (
      <>
        <P>
          The first time you visit, a banner asks whether the live chat may load. If you decline, the chat does not load
          and Tawk.to sets no cookies. You can change your mind at any time:
        </P>
        <div className="mb-4"><CookieChoice /></div>
        <P>
          You can also block or delete cookies in your browser settings. Cookies already set by the chat remain until you
          delete them there.
        </P>
      </>
    ),
  },
  {
    h: 'More information',
    body: (
      <P>
        See our <Link to="/privacy-policy" className="text-ink underline hover:text-signal">Privacy Policy</Link> for how we
        handle personal information, or write to <Mail />.
      </P>
    ),
  },
];

const PAGES: Record<LegalKind, { label: string; title: string; intro: string; sections: Section[] }> = {
  privacy: {
    label: 'Legal',
    title: 'Privacy Policy',
    intro: 'What we collect through this website, why, and the choices you have.',
    sections: PRIVACY,
  },
  terms: {
    label: 'Legal',
    title: 'Terms & Conditions',
    intro: 'The ground rules for using beforth.in.',
    sections: TERMS,
  },
  cookies: {
    label: 'Legal',
    title: 'Cookie Policy',
    intro: 'The cookies and similar technologies this website uses, and how to control them.',
    sections: COOKIES,
  },
};

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const page = PAGES[kind];
  return (
    <>
      <section className="pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="wrap">
          <Reveal>
            <div className="rule mb-6" />
            <span className="label block mb-6">{page.label}</span>
            <h1 className="display-xl text-[clamp(2.2rem,6vw,4.2rem)]">{page.title}</h1>
            <p className="lead mt-6 max-w-2xl">{page.intro}</p>
            <p className="label !normal-case !tracking-[0.06em] mt-5">Last updated: {UPDATED}</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="wrap">
          <div className="max-w-3xl border-t border-ink/12">
            {page.sections.map((s, i) => (
              <div key={s.h} className="py-7 border-b border-ink/12">
                <h2 className="display-md text-lg md:text-xl mb-4">
                  <span className="label text-signal mr-3">{String(i + 1).padStart(2, '0')}</span>
                  {s.h}
                </h2>
                {s.body}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
