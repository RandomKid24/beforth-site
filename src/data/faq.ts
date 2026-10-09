/**
 * Home-page FAQ.
 *
 * Kept in its own module because two consumers need it: the <details> list on
 * the home page and the FAQPage structured data in lib/schema.ts. Putting it
 * here avoids lib/schema.ts importing App.tsx, which would be a cycle.
 *
 * Answers are written answer-first in 40-60 words, because that is the shape
 * an AI answer engine quotes back. Each states only what this company
 * actually publishes about itself — no pricing claims, timelines, client names
 * or performance figures, since none of those are established anywhere on the
 * site. If you publish real ones, add them here and both the page and the
 * schema pick them up automatically.
 */

export const FAQ: { q: string; a: string; related?: string }[] = [
  {
    q: 'What does BeForth do?',
    a: 'BeForth builds custom business software from Nashik, India. That covers ERP systems, CRM platforms, HRMS and payroll, inventory management, workflow automation, internal web applications and mobile apps. The work is custom rather than off-the-shelf: systems are designed around the approval structures, roles and reporting requirements of the specific business.',
    related: 'services',
  },
  {
    q: 'Is the software custom or off-the-shelf?',
    a: 'Custom. We design around your approval structures, roles, pricing rules, inventory processes and reporting requirements rather than fitting you into a predefined structure. The intended outcome is that your existing process is preserved and the software adapts to it. Where a standard system would almost fit, we map what genuinely has to change before deciding whether a build is the right answer at all.',
    related: 'hrms',
  },
  {
    q: 'Can you build around our existing process?',
    a: 'Yes. Development starts by understanding your processes, roles, workflows, integrations and reporting requirements, then builds around them. Discovery maps the current workflow, the users involved and the actual bottlenecks before any code is written. This is why we describe the process back to you for confirmation early — it is cheaper to correct a process map than to rebuild a system.',
    related: 'crm',
  },
  {
    q: 'Do you build mobile applications?',
    a: 'Yes — both native and cross-platform. Native builds use Swift for iOS and Kotlin for Android; cross-platform work uses Flutter or React Native. Choice depends on what the app needs to do offline, whether it needs deep hardware access, and how it must fit existing backend systems. Field and delivery apps we build typically need offline capture and background location, which affects the decision.',
    related: 'mobile-apps',
  },
  {
    q: 'Can it integrate with our existing systems?',
    a: 'Yes. Systems are designed with integrations and APIs according to project requirements. In practice this covers connecting a custom system to accounting software, existing ERPs, CRMs and third-party services, and moving data out of spreadsheets into structured tables. Where an existing system cannot expose an API, we work through database-level or file-exchange integration instead.',
    related: 'delivery-tracking',
  },
  {
    q: 'Do you build HR and payroll systems?',
    a: 'Yes. HRMS and payroll solutions cover employee management, attendance, shifts, leave, payroll, salary calculation, approvals, reports and biometric integration. Payroll is handled with Indian statutory deductions including PF, professional tax and TDS. See our HRMS and payroll product pages for the module lists in full.',
    related: 'payroll',
  },
  {
    q: 'Where are you based?',
    a: 'BeForth is based in Nashik, Maharashtra, India. You can reach the team by email at support@beforth.in or by phone on +91 97661 83834. Engagements are delivered remotely with scheduled reviews rather than on-site presence, so the team working on your system is available across working hours without needing a visit.',
    related: 'contact',
  },
  {
    q: 'What happens after we get in touch?',
    a: 'A conversation about the process you need to fix, not a sales pitch. If it looks like a fit, we map your workflows, roles and bottlenecks in discovery, then propose scope and architecture. You get a written understanding of the problem before committing to a build. We also say so when a project is a poor fit — a simple website, or wanting zero customisation, are both reasons to look elsewhere.',
    related: 'services',
  },
  {
    q: 'Do you only work with certain industries?',
    a: 'No. Our best work is in manufacturing, logistics and distribution, pharma, and service firms — but the method is industry-independent, because we start from your process rather than a template. The same approach applies to any business whose workflows, roles or reporting requirements do not match an off-the-shelf product. Tell us what breaks today and we will tell you honestly whether a custom build helps.',
    related: 'pos',
  },
];