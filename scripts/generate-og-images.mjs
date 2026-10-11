/**
 * Generates one Open Graph card per route at build time.
 *
 * Why: og:image was static, so every share — a LinkedIn post of /product/payroll,
 * a WhatsApp message of /contact — rendered the home page's card. A preview that
 * does not match the page is worse than no custom image, because it looks wrong
 * rather than absent.
 *
 * Each card is built from that route's real title and description, so it can
 * never claim something the page does not. Output: dist/og/<route>.png, and the
 * per-route meta tags that point at them are written by the prerenderer.
 */

import puppeteer from 'puppeteer';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'dist', 'og');

const W = 1200;
const H = 630;

/** Brand tokens, mirrored from src/index.css. */
const C = {
  paper: '#F2F7F9',
  bone: '#D6E7F1',
  ink: '#231F20',
  ash: '#6D737F',
  signal: '#1C75BC',
};

/** Split a pipe-delimited SEO title into a headline and a trailing brand. */
function splitTitle(title) {
  const [head, tail] = title.split('|').map((s) => s.trim());
  return { headline: head, tail: tail ?? '' };
}

/** Escape for safe interpolation into the template. */
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Fit the headline by stepping the size down until it wraps within the card.
 * Done in the page rather than guessed here, because wrapping depends on the
 * real font metrics of whatever the headline happens to be.
 */
function cardHtml({ eyebrow, headline, sub, tail }) {
  return `<!doctype html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{width:${W}px;height:${H}px;background:${C.paper};
         font-family:'Plus Jakarta Sans',sans-serif;color:${C.ink};
         position:relative;overflow:hidden}
    .top{position:absolute;top:0;left:0;right:0;height:8px;background:${C.signal}}
    .wrap{position:absolute;inset:0;padding:64px 72px;display:flex;
          flex-direction:column;justify-content:space-between}
    .brand{display:flex;align-items:center;gap:12px}
    .dot{width:28px;height:28px;background:${C.signal}}
    .wordmark{font-size:24px;font-weight:800;letter-spacing:-.02em}
    .mid{flex:1;display:flex;flex-direction:column;justify-content:center}
    .eyebrow{font-size:19px;font-weight:600;letter-spacing:.1em;
             text-transform:uppercase;color:${C.ash};margin-bottom:18px}
    h1{font-weight:800;letter-spacing:-.035em;line-height:1.02;color:${C.ink}}
    .sub{font-size:24px;line-height:1.45;color:${C.ash};margin-top:22px;max-width:30ch}
    .foot{display:flex;align-items:center;justify-content:space-between;
          border-top:1px solid rgba(35,31,32,.14);padding-top:22px}
    .site{font-size:20px;font-weight:600}
    .tag{font-size:20px;color:${C.ash}}
  </style></head><body>
  <div class="top"></div>
  <div class="wrap">
    <div class="brand"><div class="dot"></div><span class="wordmark">BEFORTH</span></div>
    <div class="mid">
      <div class="eyebrow">${esc(eyebrow)}</div>
      <h1 id="h">${esc(headline)}</h1>
      ${sub ? `<p class="sub">${esc(sub)}</p>` : ''}
    </div>
    <div class="foot"><span class="site">beforth.in</span><span class="tag">${esc(tail)}</span></div>
  </div>
  <script>
    // Step the headline down until it fits the reserved block.
    const h = document.getElementById('h');
    const box = h.parentElement;
    const limit = box.clientHeight - (document.querySelector('.sub')?.offsetHeight || 0) - 22;
    for (let size = 66; size >= 34; size -= 2) {
      h.style.fontSize = size + 'px';
      if (h.offsetHeight <= limit) break;
    }
  </script>
  </body></html>`;
}

/** Routes and their real titles/descriptions, read from the built app. */
const ROUTE_META = {
  '/': {
    eyebrow: 'Custom software',
    title: 'Custom ERP, CRM and HR software for your business | BeForth',
    sub: 'Manufacturing, pharma, distribution and service companies.',
  },
  '/services': {
    eyebrow: 'Services',
    title: 'Custom ERP, CRM, HRMS and automation | BeForth',
    sub: 'Seven service lines, one accountable partner.',
  },
  '/insights': {
    eyebrow: 'Insights',
    title: 'Practical notes on business systems | BeForth',
    sub: 'ERP, CRM, HRMS and payroll, from the people who build them.',
  },
  '/about': {
    eyebrow: 'About',
    title: 'Technology that fits the business | BeForth',
    sub: 'A software company in Nashik, India.',
  },
  '/team': {
    eyebrow: 'Team',
    title: 'The people behind the builds | BeForth',
    sub: 'Strategy, architecture and engineering.',
  },
  '/contact': {
    eyebrow: 'Contact',
    title: 'Discuss your ERP or software project | BeForth',
    sub: 'Nashik, Maharashtra, India.',
  },
};

/**
 * Vercel's build image cannot start puppeteer's downloaded Chrome (missing
 * libnspr4.so), so on Linux use the self-contained @sparticuz/chromium, the
 * same build prerender.mjs uses. Elsewhere puppeteer's own Chrome is fine.
 */
async function launchOptions() {
  const base = { headless: true, args: ['--no-sandbox'] };
  if (process.platform !== 'linux') return base;
  try {
    process.env.VERCEL ||= '1'; // makes it unpack its bundled libraries
    const { default: chromium } = await import('@sparticuz/chromium');
    return {
      headless: true,
      executablePath: await chromium.executablePath(),
      args: chromium.args.filter((f) => f !== '--single-process'),
    };
  } catch {
    return base;
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });

  // Product pages read their metadata from the catalog so the card always
  // matches the page, never a hand-kept duplicate.
  const catalog = await readFile(
    path.join(ROOT, 'src', 'components', 'platforms', 'catalog.tsx'),
    'utf8',
  );
  const entries = [...catalog.matchAll(/slug: '([^']+)'[\s\S]*?name: '([^']+)'/g)];
  const subs = [...catalog.matchAll(/slug: '([^']+)'[\s\S]*?sub: '([^']+)'/g)];

  entries.forEach((m) => {
    const sub = subs.find((s) => s[1] === m[1]);
    ROUTE_META[`/product/${m[1]}`] = {
      eyebrow: 'Product',
      title: `${m[2]} | BeForth`,
      sub: sub ? sub[2] : undefined,
    };
  });

  const insights = await readFile(path.join(ROOT, 'src', 'data', 'insights.ts'), 'utf8');
  [...insights.matchAll(/slug: '([^']+)',\s*title: '([^']+)'/g)].forEach((m) => {
    ROUTE_META[`/insights/${m[1]}`] = { eyebrow: 'Insights', title: `${m[2]} | BeForth` };
  });

  const browser = await puppeteer.launch(await launchOptions());
  let made = 0;

  try {
    for (const [route, meta] of Object.entries(ROUTE_META)) {
      const { headline, tail } = splitTitle(meta.title);
      const page = await browser.newPage();
      await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
      await page.setContent(
        cardHtml({ eyebrow: meta.eyebrow, headline, tail, sub: meta.sub }),
        { waitUntil: 'networkidle0' },
      );
      await page.evaluate(() => document.fonts.ready);
      await new Promise((r) => setTimeout(r, 400));

      const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
      const buf = await page.screenshot({ type: 'png' });
      await writeFile(path.join(OUT, `${slug}.png`), buf);
      await page.close();
      made++;
    }
  } finally {
    await browser.close();
  }

  // Manifest so the prerenderer can map route -> image without duplicating paths.
  await writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(ROUTE_META, null, 2), 'utf8');
  console.log(`og: generated ${made} cards`);
}

main().catch((err) => {
  console.error('og images failed:', err);
  process.exit(1);
});