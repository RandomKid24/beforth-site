/**
 * Places BeForth writes location pages for.
 *
 * The data lives in locations.json so the build scripts (prerender, verify,
 * OG cards) read the same list as the app. Add a place there and every
 * surface picks it up. Then add its sitemap entry and Vercel rewrite; the
 * build fails if either is missing.
 *
 * Honesty (designV2.md section 8): only list a place where the owner has
 * confirmed delivery. The `local` text must stay general ("usually", "is
 * known for"). Never claim offices, onsite visits, named clients or counts
 * for a place.
 */
import data from './locations.json';

export type PageKind = 'erp' | 'custom';

export interface Location {
  slug: string;
  name: string;
  kind: 'city' | 'state' | 'country';
  pages: PageKind[];
  focus: string;
  localHeading: string;
  local: string;
}

export const LOCATIONS = data as Location[];

const PREFIX: Record<PageKind, string> = { erp: 'erp-software', custom: 'custom-software' };

export const locationPath = (kind: PageKind, slug: string) => `/${PREFIX[kind]}-${slug}`;

export const LOCATION_PAGES = LOCATIONS.flatMap((loc) =>
  loc.pages.map((kind) => ({ kind, loc, path: locationPath(kind, loc.slug) })),
);

export const LOCATIONS_PATH = '/locations';

export function pageTitle(kind: PageKind, loc: Location): string {
  return kind === 'erp'
    ? `ERP Software Company in ${loc.name} | Custom ERP — Beforth`
    : `Custom Software Development in ${loc.name} | Beforth`;
}

export function pageDescription(kind: PageKind, loc: Location): string {
  return kind === 'erp'
    ? `Custom ERP for ${loc.focus} in ${loc.name} from Beforth, a software company in Nashik: inventory, sales, purchase, approvals and reporting.`
    : `Custom software, web and mobile apps, automation and integrations for businesses in ${loc.name} from Beforth, a software company in Nashik.`;
}

export function pageKeywords(kind: PageKind, loc: Location): string {
  const n = loc.name;
  return kind === 'erp'
    ? `ERP software company ${n}, custom ERP ${n}, ERP development ${n}, ERP software provider ${n}`
    : `custom software development ${n}, software company ${n}, web application development ${n}, mobile app development ${n}`;
}

/** Route metadata for every location page, keyed by path. */
export function locationMeta(): Record<string, { title: string; description: string; keywords: string }> {
  const out: Record<string, { title: string; description: string; keywords: string }> = {};
  for (const { kind, loc, path } of LOCATION_PAGES) {
    out[path] = { title: pageTitle(kind, loc), description: pageDescription(kind, loc), keywords: pageKeywords(kind, loc) };
  }
  out[LOCATIONS_PATH] = {
    title: 'Where We Deliver | Custom ERP & Software Across India — Beforth',
    description:
      'Beforth is based in Nashik, Maharashtra and delivers custom ERP and software to businesses across India, including Maharashtra, Mumbai, Pune, Thane, Bengaluru and Surat.',
    keywords: 'ERP software India, custom software India, ERP software Maharashtra, ERP company Mumbai Pune Bengaluru Surat',
  };
  return out;
}
