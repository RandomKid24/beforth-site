/**
 * Insights (long-form articles).
 *
 * This is the highest-leverage section for both SEO and AI answer engines,
 * because it is the only thing on the site that can answer a question a
 * prospect is actually typing. Everything else describes BeForth; this
 * explains a problem.
 *
 * IMPORTANT — nothing here may be invented.
 *
 * Articles are general guidance with no client names, figures or results.
 * Add a real example only if it is true. Planned topics that are not written
 * yet stay in `TOPIC_BACKLOG`; thin posts written to fill a slot dilute topical
 * authority and give crawlers nothing worth citing.
 *
 * To publish an article:
 *   1. Write the content in src/content/insights/<slug>.ts (see the shape of
 *      an existing file once you have one) or add an entry below with a
 *      `body` field.
 *   2. Set live: true.
 *   3. Add the slug to ROUTES in scripts/prerender.mjs and to the sitemap.
 *
 * `updated` must reflect a real edit date. Do not backdate or forward-date.
 */

export interface InsightSection {
  /** An <h2> or <h3> heading. Must be a question or a specific claim, never a label. */
  heading: string;
  /** Paragraphs. Answer-first: lead with the conclusion, then the reasoning. */
  paragraphs: string[];
  /** Bullet lists, comparison rows, or numbered steps. */
  points?: string[];
}

export interface Insight {
  slug: string;
  title: string;
  /** One sentence used for <meta name="description"> and schema. */
  summary: string;
  /** ISO date of real publication. */
  publishedOn: string;
  /** ISO date of last real edit, or null. */
  updated: string | null;
  /** Sector this applies to, for internal linking. */
  sector?: string;
  /** Related product slugs. */
  relatedProducts?: string[];
  sections: InsightSection[];
  /** False until real written content exists. Gates rendering entirely. */
  live: boolean;
}

/**
 * Topics this company can speak to with genuine authority, based on the
 * sectors and systems already described elsewhere on the site. These are
 * prompts for writing, not articles.
 */
export const TOPIC_BACKLOG = [
  'Why spreadsheets break once a second depot opens',
  'Batch and expiry tracking: what pharma distribution actually needs from an ERP',
  'GST and e-invoicing in an inventory system: where integration usually goes wrong',
  'ERP versus off-the-shelf: how to decide when custom is worth it',
  'Payroll compliance in India: what PF, PT and TDS actually require',
  'Designing approval workflows people do not route around',
  'Integrating a custom system with Tally or an accounting package',
  'What to expect during ERP discovery, week by week',
];

export const INSIGHTS: Insight[] = [
  {
    slug: 'custom-erp-or-off-the-shelf',
    title: 'Custom ERP or Off-the-Shelf: How to Decide',
    summary:
      'A plain way to decide between buying packaged business software and building custom, based on how different your process really is.',
    publishedOn: '2026-10-11',
    updated: null,
    relatedProducts: ['crm', 'hrms', 'pos'],
    live: true,
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'Buy packaged software when your process is ordinary and the package fits it with few changes. Build custom when your process is the thing that makes your business work, and forcing it into a standard shape would cost you more than building.',
          'Most businesses are somewhere in between, so the honest first step is to find out how far a package really gets you.',
        ],
      },
      {
        heading: 'What does "fits" actually mean?',
        paragraphs: [
          'A package fits when your team can do their daily work in it without workarounds. The warning signs are specific. One or two is normal. If this is the daily reality for most of the team, the package is not fitting.',
        ],
        points: [
          'People keep a spreadsheet next to the software for things it cannot hold.',
          'The same data is typed into two systems.',
          'Approvals happen over chat or phone because the software has no step for them.',
          'Reports are built by hand each month because the numbers in the system do not match how you measure the business.',
        ],
      },
      {
        heading: 'When is packaged software the better choice?',
        paragraphs: ['Packaged software is the better choice in these situations.'],
        points: [
          'Your process is common to your industry and you are happy to adopt the way the package does it.',
          'You need to start quickly and the cost of a build is not justified yet.',
          'The package already handles the compliance rules you need, and you have confirmed that with the vendor.',
        ],
      },
      {
        heading: 'When is custom the better choice?',
        paragraphs: ['A custom build is the better choice in these situations.'],
        points: [
          'Your approval structure, pricing rules or stock handling are specific to you and are a real part of how you compete.',
          'You would otherwise pay for several tools and still need people to move data between them.',
          'You expect the process to change as you grow and want the software to change with it, not the other way round.',
        ],
      },
      {
        heading: 'How do the costs compare?',
        paragraphs: [
          'Packaged software is usually cheaper at the start, and its cost tends to grow with the number of users, add-ons and workarounds. Custom software costs more at the start, and the cost is mostly the build.',
          'Which is cheaper over time depends on how many workarounds you would otherwise carry. Ask for both numbers over a period you care about, such as three years, before deciding.',
        ],
      },
      {
        heading: 'Is there a middle path?',
        paragraphs: [
          'Often the best answer is neither extreme. Keep a package for the parts that are standard, such as accounts, and build only the part that is specific to you, connected to it. That keeps the build small and the risk low.',
        ],
      },
      {
        heading: 'What should you do next?',
        paragraphs: [
          'List the five most painful steps in your current process, then check each against the package you are considering. If it handles four or five without workarounds, buy it. If it fails most of them, the gap is the case for a custom build.',
        ],
      },
    ],
  },
  {
    slug: 'what-to-expect-during-erp-discovery',
    title: 'What to Expect During ERP Discovery',
    summary:
      'What happens before any code is written on a custom ERP project, and what you should have in hand when discovery ends.',
    publishedOn: '2026-10-11',
    updated: null,
    relatedProducts: ['crm', 'hrms', 'payroll'],
    live: true,
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'Discovery is the stage where the team learns how your business really runs, before deciding what to build. It ends with a written description of your process and a proposed scope that you have confirmed. If you are asked to sign off on a build before that exists, push back.',
        ],
      },
      {
        heading: 'What does discovery cover?',
        paragraphs: ['A good discovery looks at six things.'],
        points: [
          'Workflows: how an order, a purchase, a hire or a payment actually moves through your business, step by step, as it happens today and not as the manual says.',
          'People and roles: who does each step, who approves it, and who only needs to see it.',
          'Data: where the information lives today, in what shape, and how clean it is. Spreadsheets with text typed into number columns are common and need to be dealt with.',
          'Bottlenecks: where work waits, gets re-typed or goes wrong. These are usually where the software earns its cost.',
          'Integrations: what the new system needs to exchange data with, for example accounting software or an existing ERP.',
          'Reporting: the numbers management actually reads, and where they come from.',
        ],
      },
      {
        heading: 'Who needs to be involved?',
        paragraphs: [
          'The people who do the work, not only the people who sign the contract. A manager\'s description of a process often differs from what the person doing it describes. Plan for the time of a few of the actual users.',
        ],
      },
      {
        heading: 'What should you have when discovery ends?',
        paragraphs: ['You should receive four things in writing.'],
        points: [
          'A map of your current process, which you read and correct.',
          'A scope: what will be built, in what order, and what is deliberately left out.',
          'An outline of the system\'s structure, covering roles, permissions and integrations.',
          'An honest view on whether a build is the right answer. Sometimes the answer is a smaller tool or a change in process.',
        ],
      },
      {
        heading: 'Why is it worth the time?',
        paragraphs: [
          'It is cheaper to correct a process map than to rebuild a system. Most of the mistakes that become expensive later are misunderstandings that a few conversations would have caught.',
        ],
      },
      {
        heading: 'What should you ask before you start?',
        paragraphs: ['Three questions are worth asking any team before discovery begins.'],
        points: [
          'Who will do the discovery, and will the same people build it?',
          'What will I have in writing at the end?',
          'What happens if discovery shows a build is not the right answer?',
        ],
      },
    ],
  },
  {
    slug: 'spreadsheets-fail-at-a-second-location',
    title: 'Why Spreadsheets Fail at a Second Location',
    summary:
      'The specific ways a spreadsheet-run business breaks once it has more than one depot, branch or team, and what to put in place instead.',
    publishedOn: '2026-10-11',
    updated: null,
    relatedProducts: ['pos', 'salon-erp', 'delivery-tracking'],
    live: true,
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'A spreadsheet works while one person holds the whole picture in their head. A second location means two people editing, two versions of the truth and no way to see the combined position. The fix is one shared system where each location enters data once and everyone sees the same numbers.',
        ],
      },
      {
        heading: 'What goes wrong, in order?',
        paragraphs: ['The problems tend to arrive in this order.'],
        points: [
          'Two copies: each location keeps its own file. Someone emails them around, and by the time they are merged, they are out of date.',
          'Nobody trusts the totals: combined stock or sales is built by hand, and different people get different answers to the same question.',
          'No clear owner for a number: when a figure looks wrong, nobody knows who changed it, when, or why. Some spreadsheet tools keep a version history, but that is not the same as a record of who approved a change and why.',
          'Manual re-entry: orders typed from one sheet into another, and from there into billing, multiply errors with every step.',
          'No permissions: anyone with the file can change anything, including prices and formulas.',
        ],
      },
      {
        heading: 'Why does a second location make it worse?',
        paragraphs: [
          'With one location, the cost of these problems is small and absorbed by one careful person. A second location multiplies the points where data is entered and removes the person who held it all together. The business gets slower at the exact moment it is trying to grow.',
        ],
      },
      {
        heading: 'What should you put in place instead?',
        paragraphs: ['You do not necessarily need a large system. You need four things.'],
        points: [
          'One record for each thing: a product, a customer or a stock count exists once, and every location sees the same entry.',
          'Entry once, at the source: data is captured where the work happens and flows onward without being retyped.',
          'Roles: each person can see and change only what their job needs.',
          'A history: every change is recorded with who made it and when.',
        ],
      },
      {
        heading: 'When is it time to move?',
        paragraphs: [
          'If you recognise three or more of the problems above, the cost of staying is probably higher than the cost of changing. The simplest test is whether your team spends noticeable time each week reconciling numbers rather than using them.',
        ],
      },
    ],
  },
];

export const PUBLISHED_INSIGHTS = INSIGHTS.filter((i) => i.live);

/** ISO date of a real, live article, rendered as a readable string. */
export function formatInsightDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** One plain-text summary of an article, for llms.txt. */
export function insightToPlainText(a: Insight): string {
  const parts: string[] = [`# ${a.title}`, a.summary];
  for (const s of a.sections) {
    parts.push(`## ${s.heading}`);
    parts.push(...s.paragraphs);
    if (s.points?.length) parts.push(...s.points.map((p) => `- ${p}`));
  }
  return parts.join('\n\n');
}