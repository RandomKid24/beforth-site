/**
 * Per-platform FAQ for the custom ERP product page.
 *
 * Answer-first, 40-60 words each: the shape an answer engine quotes back. The
 * same array feeds the visible <details> list and the FAQPage node generated in
 * src/lib/schema.ts, so the markup can never claim a question the page hides.
 *
 * Honesty rules apply: no price list, no fixed timeline, no named competitor,
 * no invented metrics. Cost and schedule follow a written scope you approve.
 */

export const ERP_FAQ: { q: string; a: string }[] = [
  {
    q: 'What is custom ERP software?',
    a: 'Custom ERP software is one system built around how your business actually runs. It brings sales, purchase, inventory, approvals, people and reporting together, with your roles and rules written into it. BeForth builds it from a discovery map of your workflows, then delivers working modules in stages you review. You approve the written scope before any build starts.',
  },
  {
    q: 'How much does custom ERP cost in India?',
    a: 'There is no public price list. Cost depends on the modules you need, your approval rules, integrations, data migration and support. After a short discovery conversation, we give you a written scope and cost, which you approve before any build starts. We reply within one working day and do not add a hidden per-seat charge later.',
  },
  {
    q: 'How long does a custom ERP build take?',
    a: 'We do not publish a fixed timeline, because it depends on the scope you approve. Discovery defines the modules, integrations and data migration; the written scope sets out the stages and what each one delivers. Modules are built and reviewed in stages, so you see working software early rather than waiting for one large release.',
  },
  {
    q: 'Which industries do you build ERP for?',
    a: 'We build ERP for manufacturing, pharma, distribution and service firms, typically with 20 to 500 people. The method is the same across sectors: we map your workflows, roles and reporting first, then build around them. If your processes do not match an off-the-shelf product, we will tell you honestly whether a custom system helps.',
  },
  {
    q: 'Which modules should we start with?',
    a: 'Start with the processes that hurt most today, usually sales and inventory or the flow that creates the most rework. We map those in discovery and agree the first set of modules in the written scope. Later modules are added in reviewed stages, so the business is using working software while the rest is being built.',
  },
  {
    q: 'Can it connect to Tally, GST and existing machines?',
    a: 'Yes. Integrations are part of the build. We connect to accounting tools such as Tally where required, handle GST data in the billing flow, and read from devices and machines that can expose their data. Discovery confirms exactly what needs to connect, and the written scope states it before any build starts.',
  },
  {
    q: 'How do you migrate data from spreadsheets?',
    a: 'We move spreadsheet data into structured tables as part of onboarding. Discovery identifies which sheets are authoritative, what needs cleaning and how historical records should carry across. Migration happens during testing, is checked with your team against sample records, and is validated before the system goes live.',
  },
  {
    q: 'What happens after launch?',
    a: 'We stay on after launch. The same team trains your users, supports the system and extends it as requirements change. Hosting, backups, maintenance and later changes are set out in writing as part of the approved scope. The aim is a system you keep improving rather than one that has to be replaced.',
  },
  {
    q: 'Can it handle multiple locations and companies?',
    a: 'Yes, where that requirement is in scope. Roles, permissions, stock and reports can be structured for different sites and legal entities, so each team sees what it is responsible for and owners see the whole picture. We confirm the structure during discovery and write it into the scope you approve before the build starts.',
  },
  {
    q: 'Why build with BeForth rather than a larger vendor?',
    a: 'BeForth is a small software company in Nashik, founded in 2025. You work with the people who design, build and maintain the system, with one point of contact. We say when a project is a poor fit, give a written scope and cost before any build starts, and let you try 13 working previews on sample data first.',
  },
];
