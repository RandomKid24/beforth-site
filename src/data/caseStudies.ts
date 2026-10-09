/**
 * Case studies.
 *
 * IMPORTANT — read before editing.
 *
 * These are gated on `live: true`, and the page renders nothing at all
 * until a study is genuinely ready. That is deliberate. The alternative —
 * showing template cards with placeholder text — produces thin, obviously
 * unfinished pages that search engines and AI engines index as content, and
 * which visitors read as filler.
 *
 * Nothing here may be invented. No sample client names, no invented metrics,
 * no "50+ projects delivered". Every field below must come from a real,
 * verifiable engagement, and anonymised studies must say they are anonymised.
 *
 * To publish one:
 *   1. Add the entry below with `published: true`.
 *   2. Replace every field with real detail.
 *   3. Set `named: false` if the client is anonymised — the page then prints
 *      "Client anonymised" rather than implying a logo or named relationship.
 *   4. Add the route to ROUTES in scripts/prerender.mjs.
 *
 * CaseStudyMetric deliberately has no `optional` variant. A study that cannot
 * state a measured outcome is not a case study, so the type will not compile
 * without one.
 */

export interface CaseStudyMetric {
  /** What was measured. Be specific: "Stock reconciliation time", not "Efficiency". */
  label: string;
  /** The measured value, as a plain string so units stay attached: "4 hrs → 8 min". */
  value: string;
}

export interface CaseStudy {
  slug: string;
  /** Use a descriptive title. If anonymised, prefer the sector: "Pharma distribution ERP". */
  title: string;
  /** Sector and system type: "Pharma · Distribution". */
  kind: string;
  /** False when the client is anonymised. Drives the "Client anonymised" note. */
  named: boolean;
  industry: string;
  /** What the business did before. Written in their terms. */
  problem: string;
  /** What was built. Concrete modules, not adjectives. */
  solution: string;
  /** The module list. */
  points: string[];
  /** At least one measured, before-and-after outcome. */
  metrics: CaseStudyMetric[];
  /** Link to the relevant product page. */
  product: string;
  /** False until real detail exists. Gates rendering entirely. */
  live: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  /*
    Example of the shape. `published: false` means it renders nothing.
    Copy this block, replace every value with real detail, then set
    published: true and add the slug to ROUTES in scripts/prerender.mjs.

  {
    slug: 'pharma-distribution-erp',
    title: 'Pharma distribution ERP',
    kind: 'Pharma · Distribution',
    named: false,
    industry: 'Pharma distribution, 3 depots',
    problem: 'Stock was tracked in separate spreadsheets per depot...',
    solution: 'A single system covering...',
    points: ['Batch and expiry tracking', 'Purchase management', 'Route planning'],
    metrics: [
      { label: 'Daily stock reconciliation', value: '4 hrs → 8 min' },
    ],
    product: 'hrms',
    live: false,
  },
  */
];

export const PUBLISHED_CASE_STUDIES = CASE_STUDIES.filter((c) => c.live);