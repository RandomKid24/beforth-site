/**
 * Renders a BeForth document (HTML + CSS) to an A4 PDF.
 *
 *   node docs/srs/build.mjs                                  # the SRS template
 *   node docs/srs/build.mjs <input.html> <output.pdf>        # any other document
 *
 * Two passes: the first renders the document to find which page each heading lands
 * on, the second fills the contents page with those page numbers and renders again.
 * The input needs a `{{TOC}}` placeholder, headings that look like
 * `<h1 class="sec" id="s1"><span class="n">1</span>Title</h1>` / `<h2 id="s1-1">…`, and
 * a heading that says "Contents". `LOGO_DARK` and `LOGO_WHITE` are replaced with the
 * brand logos. Needs `pdftotext` and `pdfinfo` (poppler).
 */
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const SRC = path.resolve(process.argv[2] ?? path.join(HERE, 'srs.html'));
const OUT = path.resolve(process.argv[3] ?? path.join(ROOT, 'docs', 'BeForth-SRS-Template.pdf'));

const dataUri = async (file) =>
  `data:image/png;base64,${(await readFile(path.join(ROOT, 'public', file))).toString('base64')}`;

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const strip = (s) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const pageCount = () => Number(execFileSync('pdfinfo', [OUT]).toString().match(/Pages:\s+(\d+)/)[1]);

async function main() {
  let html = await readFile(SRC, 'utf8');
  html = html
    .replace('LOGO_DARK', await dataUri('logo.png'))
    .replace('LOGO_WHITE', await dataUri('logo-white.png'));

  // Contents entries, in document order.
  const entries = [];
  for (const m of html.matchAll(/<h([12])(?: class="sec")? id="([^"]+)"><span class="n">(.*?)<\/span>(.*?)<\/h\1>/g)) {
    entries.push({ level: Number(m[1]), id: m[2], num: strip(m[3]), title: strip(m[4]) });
  }

  const browser = await puppeteer.launch({ headless: true });
  const render = async (pages) => {
    // One group per top-level section, so a two-column contents never splits a group.
    let toc = '';
    for (const e of entries) {
      if (e.level === 1) toc += `${toc ? '</div>' : ''}<div class="grp">`;
      const p = pages?.[e.id] ?? '';
      toc += `<div class="row l${e.level}"><span class="t"><span class="n">${escapeHtml(e.num)}</span>${escapeHtml(e.title)}</span><span class="dots"></span><span class="p">${p}</span></div>`;
    }
    toc += '</div>';
    const page = await browser.newPage();
    await page.setContent(html.replace('{{TOC}}', toc), { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: OUT, preferCSSPageSize: true, printBackground: true });
    await page.close();
  };

  // Pass 1: render, then find each heading's page.
  await render(null);
  const count = pageCount();
  const text = [];
  for (let i = 1; i <= count; i++) {
    text.push(norm(execFileSync('pdftotext', ['-f', String(i), '-l', String(i), OUT, '-']).toString()));
  }
  const tocIdx = text.findIndex((t) => /\bContents\b/.test(t));
  if (tocIdx < 0) throw new Error('no page says "Contents"');
  const last = entries[entries.length - 1];
  if (!text[tocIdx].includes(norm(last.title))) throw new Error('contents spilled onto a second page');

  const pages = {};
  for (const e of entries) {
    const needle = norm(`${e.num} ${e.title}`);
    const at = text.findIndex((t, i) => i > tocIdx && t.includes(needle));
    pages[e.id] = at >= 0 ? at + 1 : '';
  }

  // Pass 2: same layout, with page numbers in the contents.
  await render(pages);
  await browser.close();

  const missing = entries.filter((e) => !pages[e.id]).map((e) => e.title);
  console.log(`pages: ${pageCount()} (first pass ${count})  contents entries: ${entries.length}`);
  if (missing.length) console.log('page not found for:', missing.join(', '));
  console.log(`wrote ${path.relative(ROOT, OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
