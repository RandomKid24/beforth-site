/**
 * Final gate on the built output.
 *
 * The failure mode this exists to catch: prerendering fails or is skipped, the
 * deploy still succeeds, and every route ships `<div id="root"></div>`. That
 * looks fine in a browser but is invisible to every crawler that does not run
 * JavaScript — the exact problem prerendering was introduced to fix.
 *
 * This asserts the thing we actually care about, on the real files Vercel will
 * serve, after the whole build has run.
 */

import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const ROUTES = [
  '/', '/services', '/insights', '/about', '/team', '/contact',
  '/product/delivery-tracking', '/product/salon-erp', '/product/hrms',
  '/product/crm', '/product/mobile-apps', '/product/websites',
  '/product/tunnelgate', '/product/seo-tracking', '/product/payroll',
  '/product/pos',
];

/** Below this a page has no chance of ranking or being cited. */
const MIN_WORDS = 120;

const problems = [];

function fileFor(route) {
  return route === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, route, 'index.html');
}

async function checkRoute(route) {
  const file = fileFor(route);

  let html;
  try {
    html = await readFile(file, 'utf8');
  } catch {
    problems.push(`${route}: missing ${path.relative(ROOT, file)}`);
    return;
  }

  // Strip script and style bodies so only visible text is counted.
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  if (words < MIN_WORDS) {
    problems.push(`${route}: only ${words} words of static text (min ${MIN_WORDS}) — prerender did not run`);
  }

  if (!/<h1[\s>]/i.test(html)) problems.push(`${route}: no <h1> in static HTML`);
  if (!/<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^"]+\.css"/i.test(html)) {
    problems.push(`${route}: stylesheet link missing — assets were stripped`);
  }
  if (!/<title>[^<]+<\/title>/i.test(html)) problems.push(`${route}: no <title>`);
  if (!/name="description"/i.test(html)) problems.push(`${route}: no meta description`);

  // Every route must point og:image at its own card, or shares render the
  // home page's image and look like the wrong link.
  const og = html.match(/<meta property="og:image" content="([^"]+)"/i)?.[1] ?? '';
  const expected = `https://beforth.in/og/${route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-')}.png`;
  if (og !== expected) problems.push(`${route}: og:image is "${og || 'missing'}", expected ${expected}`);

  // The root div must contain rendered markup, not be an empty shell.
  const root = html.match(/<div id="root"[^>]*>([\s\S]*?)<\/div>\s*<\/body>/i);
  if (root && root[1].trim().length < 200) {
    problems.push(`${route}: #root looks empty — the SPA shell was served instead of prerendered HTML`);
  }
}

async function main() {
  for (const route of ROUTES) await checkRoute(route);

  // Public files must be served as files, not swallowed by the SPA rewrite.
  for (const f of ['robots.txt', 'sitemap.xml', 'llms.txt', 'favicon.ico', 'logo.png', 'og-image.png']) {
    try {
      await access(path.join(DIST, f));
    } catch {
      problems.push(`public asset missing from dist: ${f}`);
    }
  }

  // One OG card per route, so no share falls back to the home image.
  for (const route of ROUTES) {
    const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
    try {
      await access(path.join(DIST, 'og', `${slug}.png`));
    } catch {
      problems.push(`og image missing: og/${slug}.png`);
    }
  }

  // FAQPage belongs only on pages that render a FAQ.
  const home = await readFile(path.join(DIST, 'index.html'), 'utf8');
  if (!home.includes('FAQPage')) problems.push('/ : home page has no FAQPage schema');

  const services = await readFile(path.join(DIST, 'services', 'index.html'), 'utf8');
  if (services.includes('FAQPage')) {
    problems.push('/services : FAQPage present but no FAQ is rendered there');
  }

  if (problems.length) {
    console.error('\nBuild verification failed:\n');
    problems.forEach((p) => console.error(`  - ${p}`));
    console.error('\nRefusing to ship an empty or broken build.\n');
    process.exit(1);
  }

  console.log(`verify: ${ROUTES.length} routes prerendered and healthy.`);
}

main().catch((err) => {
  console.error('verify: crashed', err);
  process.exit(1);
});