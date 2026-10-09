/**
 * Post-build prerendering.
 *
 * Why this exists: the site is a client-rendered SPA. Before this ran, the
 * served HTML for every route was `<div id="root"></div>` and nothing else.
 * Google will render JavaScript, but most AI answer-engine crawlers
 * (ChatGPT, Perplexity, ClaudeBot) and many social scrapers fetch raw HTML
 * and see nothing. Prerendering puts real content, real meta tags and real
 * JSON-LD in the initial response.
 *
 * Why the previous attempt was removed (commit 0cf3d0c): it stripped
 * <link> tags pointing at /assets/*.css and rewrote the production bundle
 * reference back to the dev-only /src/main.tsx, which broke styling on every
 * sub-route. This version keeps the built asset tags exactly as Vite emitted
 * them and writes the rendered DOM on top. Nothing is stripped.
 *
 * Usage: npm run build && node scripts/prerender.mjs
 * Output: dist/<route>/index.html for each route (Vercel serves these as
 *         static files before the SPA rewrite).
 */

import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, access, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

/** Preferred port; falls back to an ephemeral one if it is already taken. */
const PREFERRED_PORT = Number(process.env.PRERENDER_PORT ?? 4788);

/**
 * Pristine copy of the freshly built index.html.
 *
 * Critical: the SPA fallback must serve THIS, never dist/index.html itself.
 * dist/index.html is overwritten by the '/' prerender with rendered markup,
 * which already contains a route-scoped JSON-LD block for '/'. Serving it back
 * for /services on a later run would re-inject the home page's schema, so
 * every non-home route would ship FAQPage it does not display — a structured
 * data violation. Reading from a copy taken before any route is written keeps
 * each run independent.
 */
const PRISTINE_INDEX = path.join(ROOT, 'node_modules', '.cache', 'prerender-index.html');

/** Every route the sitemap advertises. Keep in sync with public/sitemap.xml. */
const ROUTES = [
  '/',
  '/services',
  '/insights',
  '/about',
  '/team',
  '/contact',
  ...[
    'delivery-tracking',
    'salon-erp',
    'hrms',
    'crm',
    'mobile-apps',
    'websites',
    'tunnelgate',
    'seo-tracking',
    'payroll',
    'pos',
  ].map((slug) => `/product/${slug}`),
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
};

/**
 * Static file server with SPA fallback, mirroring how Vercel will serve
 * `dist/` once the prerendered route folders exist.
 *
 * Listens on PREFERRED_PORT when free, otherwise an ephemeral port, so a
 * stale process or a busy CI runner cannot fail the build.
 */
async function serve() {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost`);
    let filePath = path.join(DIST, decodeURIComponent(url.pathname));

    // Block traversal outside dist.
    if (!filePath.startsWith(DIST)) {
      res.writeHead(403).end('Forbidden');
      return;
    }

    try {
      const stat = await access(filePath).then(
        () => 'file',
        async () => {
          // Directory -> index.html inside it
          const idx = path.join(filePath, 'index.html');
          await access(idx);
          filePath = idx;
          return 'file';
        },
      );
      if (stat !== 'file') throw new Error('unreachable');

      const body = await readFile(filePath);
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(body);
    } catch {
      const body = await readFile(PRISTINE_INDEX);
      res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store' });
      res.end(body);
    }
  });

    // Bind to an ephemeral port from the start when the preferred one is busy.
  // Retrying via recursion leaks every failed server and can exhaust memory,
  // so probe first and listen exactly once.
  const listen = (port) =>
    new Promise((res, rej) => {
      const s = server.listen(port);
      s.once('listening', () => res(s));
      s.once('error', rej);
    });

  let chosen;
  try {
    chosen = await listen(PREFERRED_PORT);
  } catch (err) {
    if (err.code !== 'EADDRINUSE') throw err;
    chosen = await listen(0); // 0 = let the OS pick a free port
  }

  const { port } = chosen.address();
  origin = `http://localhost:${port}`;
  return chosen;
}

let origin = `http://localhost:${PREFERRED_PORT}`;

/**
 * Wait until the route has actually painted. Prerendering an empty shell is
 * worse than not prerendering at all, because it produces a page that looks
 * valid to a crawler but contains nothing.
 */
async function waitForContent(page, route) {
  // An <h1> only exists once the route component has mounted.
  await page.waitForFunction(() => {
    const h1 = document.querySelector('h1');
    return h1 && h1.innerText.trim().length > 3;
  }, { timeout: 15000 });

  // Lazy chunks for this route must have resolved too.
  await page.waitForNetworkIdle({ idleTime: 600, timeout: 15000 });

  const heading = await page.$eval('h1', (el) => el.innerText.trim());
  if (!heading || heading.length < 4) {
    throw new Error(`Route ${route} rendered an empty h1 — refusing to write it.`);
  }
  return heading;
}

const SYSTEM_CHROME_PATHS = [
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/opt/google/chrome/chrome',
  '/usr/bin/microsoft-edge-stable',
];

/** Flags needed for any Chrome in a container, on any platform. */
const BASE_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  // Containers often have a small /dev/shm; without this Chrome crashes
  // partway through rendering.
  '--disable-dev-shm-usage',
  '--disable-gpu',
];

/**
 * Chrome flags supplied by @sparticuz/chromium, minus the ones that break
 * multi-page use.
 *
 * Its default list includes --single-process, added to avoid a
 * `prctl(PR_SET_NO_NEW_PRIVS) failed` error on Lambda. In exchange the browser
 * runs its renderer in the browser process, so creating a second page kills
 * the whole connection — which is exactly what happens here, since prerendering
 * opens fifteen pages in sequence.
 *
 * Vercel does not hit the prctl problem, so the flag is dropped rather than
 * worked around. Every other supplied flag is kept: swiftshader for software
 * GL, font rendering, and the AL2023 library paths.
 */
function chromiumArgs(chromium) {
  const supplied = Array.isArray(chromium.args) ? chromium.args : [];
  return supplied.filter((flag) => flag !== '--single-process');
}

/**
 * Candidate browsers, in the order they are tried.
 *
 * Each entry returns launch options, or null if it is not usable here.
 *
 * Why the ordering is not simply "fastest first": on Vercel, puppeteer's own
 * Chrome downloads fine but cannot start, because the build image lacks its
 * shared libraries (libnspr4.so and friends). @sparticuz/chromium ships a
 * self-contained Chromium with those libraries bundled for Amazon Linux 2023,
 * which is exactly the image Vercel runs. So on Linux we prefer the bundled
 * build and fall back to the downloaded one; on macOS and Windows the bundled
 * Linux binary is unusable, so the managed download is preferred.
 */
async function browserCandidates() {
  const override = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (override && existsSync(override)) {
    return [{
      label: `PUPPETEER_EXECUTABLE_PATH (${override})`,
      options: { executablePath: override, headless: true, args: BASE_ARGS },
    }];
  }

  const isLinux = process.platform === 'linux';

  if (isLinux) {
    // Bundled, self-contained build: the reliable option on Vercel.
    const bundled = {
      label: '@sparticuz/chromium (bundled, self-contained)',
      options: null,
    };

    try {
      // @sparticuz/chromium decides at import time whether to unpack its
      // Amazon Linux 2023 shared libraries, and it reads the VERCEL env var to
      // do so. Vercel's own build containers do not set it, so the libraries
      // stay packed and Chromium dies with "libnspr4.so: cannot open shared
      // object file". Setting it first is what makes the bundled build usable
      // here — it must happen before the import, since the check runs at module
      // evaluation. Harmless anywhere else: the flag only adds library paths.
      process.env.VERCEL ||= '1';

      const { default: chromium } = await import('@sparticuz/chromium');
      const executablePath = await chromium.executablePath();
      bundled.options = {
        executablePath,
        headless: true,
        args: [...BASE_ARGS, ...chromiumArgs(chromium)],
      };
    } catch (err) {
      bundled.error = err.message;
    }

    const candidates = [bundled];

    // Fallbacks, in case the bundled build cannot be extracted.
    for (const candidate of SYSTEM_CHROME_PATHS) {
      if (existsSync(candidate)) {
        candidates.push({
          label: `system Chrome (${candidate})`,
          options: { executablePath: candidate, headless: true, args: BASE_ARGS },
        });
        break;
      }
    }

    try {
      candidates.push({
        label: "puppeteer's managed Chrome",
        options: {
          executablePath: await puppeteer.executablePath(),
          headless: true,
          args: BASE_ARGS,
        },
      });
    } catch {
      /* not downloaded; the loop below will report it */
    }

    return candidates;
  }

  // macOS / Windows: prefer puppeteer's own download, then any system browser.
  const candidates = [];
  try {
    candidates.push({
      label: "puppeteer's managed Chrome",
      options: {
        executablePath: await puppeteer.executablePath(),
        headless: true,
        args: BASE_ARGS,
      },
    });
  } catch {
    /* not downloaded */
  }

  for (const candidate of SYSTEM_CHROME_PATHS) {
    if (existsSync(candidate)) {
      candidates.push({
        label: `system Chrome (${candidate})`,
        options: { executablePath: candidate, headless: true, args: BASE_ARGS },
      });
      break;
    }
  }

  return candidates;
}

/**
 * Launch the first browser that actually starts.
 *
 * Resolving a path is not enough: on Vercel the downloaded Chrome exists but
 * dies with exit code 127 for a missing shared library. Each candidate is
 * therefore launched for real, and a failure moves on to the next rather than
 * ending the build.
 */
async function launchBrowser() {
  const candidates = await browserCandidates();
  const failures = [];

  if (!candidates.some((c) => c.options)) {
    throw new Error(
      'No usable browser for prerendering. Tried:\n' +
        candidates.map((c) => `  - ${c.label}${c.error ? `: ${c.error}` : ' (unavailable)'}`).join('\n') +
        '\n\nFix by installing one during the build:\n' +
        '  npx puppeteer browsers install chrome\n' +
        'or set PUPPETEER_EXECUTABLE_PATH to an existing Chrome/Chromium.',
    );
  }

  for (const candidate of candidates) {
    if (!candidate.options) {
      failures.push(`${candidate.label}: ${candidate.error ?? 'unavailable'}`);
      continue;
    }
    try {
      console.log(`Prerender browser: ${candidate.label}`);
      return await puppeteer.launch(candidate.options);
    } catch (err) {
      // Most often "error while loading shared libraries" on a bare image.
      const detail = (err.stderr?.toString() ?? err.message ?? '').split('\n').find(Boolean) ?? '';
      failures.push(`${candidate.label}: ${detail}`);
    }
  }

  throw new Error(
    'Every browser candidate failed to launch:\n' +
      failures.map((f) => `  - ${f}`).join('\n') +
      '\n\nOn a bare Linux image this usually means missing shared libraries ' +
      '(libnspr4, libnss3). @sparticuz/chromium bundles them; check that it ' +
      'installed correctly.',
  );
}

/** Marker written into every prerendered page, so we can tell our own output
 *  apart from the raw Vite build. See takePristineSnapshot. */
const PRERENDER_MARKER = '<!-- prerendered -->';

/** Insert the marker just after <head> so re-runs can detect this file. */
function withMarker(html) {
  return html.replace(/<head([^>]*)>/i, `<head$1>\n  ${PRERENDER_MARKER}`);
}

/** Route -> og image filename, produced by scripts/generate-og-images.mjs. */
function ogSlug(route) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
}

/**
 * Point og:image and twitter:image at this route's own card.
 *
 * Without this every share renders the home page's image, so a LinkedIn post
 * of /product/payroll previews as the homepage. Scraper-facing meta has to be
 * right in the static HTML because most scrapers never execute JavaScript —
 * the client-side SeoManager cannot fix this on its own.
 *
 * Only the URL is rewritten; title, description and the 1200x630 dimensions
 * are already correct in index.html and are shared across cards.
 */
function withRouteOgImage(html, route) {
  const image = `https://beforth.in/og/${ogSlug(route)}.png`;

  return html
    .replace(
      /<meta property="og:image" content="[^"]*"/i,
      `<meta property="og:image" content="${image}"`,
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*"/i,
      `<meta name="twitter:image" content="${image}"`,
    );
}

async function takePristineSnapshot() {
  const built = await readFile(path.join(DIST, 'index.html'), 'utf8');
  await mkdir(path.dirname(PRISTINE_INDEX), { recursive: true });

  // Running `npm run prerender` twice without rebuilding must not snapshot our
  // own output: dist/index.html would then contain the home page's rendered DOM
  // and its route-scoped JSON-LD, which the other routes would then serve and
  // re-inject. Only the freshly built shell is safe to snapshot.
  if (built.includes(PRERENDER_MARKER)) {
    if (!existsSync(PRISTINE_INDEX)) {
      throw new Error(
        'dist/index.html is already prerendered and no pristine build snapshot exists.\n' +
          'Run `npm run build:raw` (or `npm run build`) first, then prerender again.',
      );
    }
    console.log('prerender: reusing existing build snapshot (dist is already prerendered)');
    return;
  }

  await writeFile(PRISTINE_INDEX, built);
}

/**
 * Block every off-origin request for the duration of a prerender.
 *
 * The page loads two external resources: the Google Fonts stylesheet and the
 * Tawk.to live-chat widget. In the bundled Chromium used on Vercel, fetching
 * them detaches the renderer mid-navigation and kills the browser
 * ("Navigating frame was detached"), failing all 15 routes. Denying them makes
 * rendering deterministic.
 *
 * This is also the correct behaviour on its own terms: prerendering captures
 * the page as a search crawler would see it, so it must not depend on a
 * third-party CDN being reachable, nor embed a live-chat widget in the static
 * output. Both load again normally in a real browser.
 */
async function blockExternalRequests(page, siteOrigin) {
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (request.url().startsWith(siteOrigin)) request.continue();
    else request.abort();
  });
}

async function main() {
  await takePristineSnapshot();

  const server = await serve();

  let failed = 0;
  const report = [];

  // One browser per route.
  //
  // Reusing a single browser across all fifteen routes is the obvious
  // optimisation, but the bundled Chromium in a constrained container becomes
  // unstable across repeated page lifecycle events: the renderer detaches
  // mid-navigation ("Navigating frame was detached") and the browser process
  // exits, so the run dies on whichever route happens to be next. Launching
  // per route costs a few seconds each and is reliable, which matters more
  // than build speed here — a crashed prerender fails the deploy.
  for (const route of ROUTES) {
    let browser;
    try {
      browser = await launchBrowser();
      const page = await browser.newPage();
      // Desktop width so nothing is hidden behind a mobile disclosure.
      await page.setViewport({ width: 1280, height: 1000 });
      await blockExternalRequests(page, `http://localhost:${new URL(origin).port}`);

      try {
        await page.goto(`http://localhost:${new URL(origin).port}${route}`, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        });

        const heading = await waitForContent(page, route);
        const html = await page.content();

        // Sanity check: the Vite CSS link must survive. This is exactly the
        // regression that got prerendering removed, so assert it every run.
        if (!/<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^"]+\.css"/i.test(html)) {
          throw new Error('stylesheet link missing from rendered output');
        }

        const outDir = route === '/' ? DIST : path.join(DIST, route);
        await mkdir(outDir, { recursive: true });
        await writeFile(
          path.join(outDir, 'index.html'),
          withRouteOgImage(withMarker(html), route),
          'utf8',
        );

        // Verify the route-scoped schema matches this route. A mismatch means
        // markup leaked in from a previous run, which would ship schema for
        // content the page does not show.
        //
        // Both "/" and every product page legitimately render an FAQ list
        // (product pages carry their own per-platform FAQ), so FAQPage is
        // expected on both. Only the plain pages must not carry it.
        const isFaqRoute = route === '/' || route.startsWith('/product/');
        const scriptBlocks = [...html.matchAll(
          /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
        )].map((m) => m[1]);

        // The home page is the breadcrumb root and correctly has no BreadcrumbList.
        // Everything else must carry one.
        if (route !== '/' && !scriptBlocks.some((b) => b.includes('"BreadcrumbList"'))) {
          throw new Error('route-scoped schema missing BreadcrumbList');
        }
        if (!isFaqRoute && scriptBlocks.some((b) => b.includes('"FAQPage"'))) {
          throw new Error('FAQPage leaked onto a route that does not render it');
        }
        if (isFaqRoute && !scriptBlocks.some((b) => b.includes('"FAQPage"'))) {
          throw new Error('route renders an FAQ list but ships no FAQPage schema');
        }

        const words = await page.evaluate(() => {
          const t = document.body.innerText.trim();
          return t ? t.split(/\s+/).length : 0;
        });
        report.push({ route, heading, words, ok: true });
      } catch (err) {
        failed++;
        report.push({ route, error: err.message, ok: false });
      }
    } finally {
      // Closing is best-effort. When the renderer has crashed, close() rejects
      // with ConnectionClosedError and would mask the failure that actually
      // caused the route to fail.
      try {
        await browser.close();
      } catch {
        /* already gone */
      }
    }
  }

  server.close();

  console.log('\nPrerender report');
  console.log('─────────────────────────────────────────────');
  for (const r of report) {
    if (r.ok) {
      console.log(`  ok    ${r.route.padEnd(28)} ${String(r.words).padStart(5)} words  "${r.heading.slice(0, 42)}"`);
    } else {
      console.log(`  FAIL  ${r.route.padEnd(28)} ${r.error}`);
    }
  }
  console.log('─────────────────────────────────────────────');
  console.log(`  ${report.filter((r) => r.ok).length}/${report.length} routes prerendered`);

  if (failed) {
    // Non-zero exit so CI catches a silently broken prerender.
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('Prerender crashed:', err);
  process.exit(1);
});