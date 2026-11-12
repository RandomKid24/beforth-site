/**
 * Location pages, read from src/data/locations.json so the build scripts and
 * the app agree on the list. Mirrors locationPath() in src/data/locations.ts.
 */
import { readFileSync } from 'node:fs';

export const LOCATIONS = JSON.parse(
  readFileSync(new URL('../src/data/locations.json', import.meta.url), 'utf8'),
);

const PREFIX = { erp: 'erp-software', custom: 'custom-software' };
export const locationPath = (kind, slug) => `/${PREFIX[kind]}-${slug}`;

/** Every route the location pages add, including the /locations hub. */
export const LOCATION_ROUTES = [
  ...LOCATIONS.flatMap((l) => l.pages.map((k) => locationPath(k, l.slug))),
  '/locations',
];
