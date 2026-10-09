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
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
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

async function main() {
  // Snapshot the built shell before we overwrite dist/index.html with the
  // prerendered home page. See PRISTINE_INDEX for why this matters.
  await mkdir(path.dirname(PRISTINE_INDEX), { recursive: true });
  await writeFile(PRISTINE_INDEX, await readFile(path.join(DIST, 'index.html')));

  const server = await serve();
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let failed = 0;
  const report = [];

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      // Desktop width so nothing is hidden behind a mobile disclosure.
      await page.setViewport({ width: 1280, height: 1000 });

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
        await writeFile(path.join(outDir, 'index.html'), html, 'utf8');

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
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

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