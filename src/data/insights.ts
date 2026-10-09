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
 * The list below is deliberately EMPTY. Draft titles are recorded in
 * `TOPIC_BACKLOG` as a planning aid, but they are not published as articles
 * and carry no content. An insights section with thin auto-generated posts
 * is worse than no section at all: it dilutes topical authority and gives
 * crawlers nothing worth citing.
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

export const INSIGHTS: Insight[] = [];

export const PUBLISHED_INSIGHTS = INSIGHTS.filter((i) => i.live);