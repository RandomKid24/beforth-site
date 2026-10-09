/**
 * Installs a Chrome/Chromium build for prerendering, unless one is already
 * available.
 *
 * Vercel blocks npm install scripts by default, so puppeteer's postinstall —
 * which is what normally downloads Chrome — never runs. Without this step the
 * build fails with "Could not find Chrome". `npx puppeteer browsers install`
 * bypasses the blocked postinstall and does the download explicitly.
 *
 * Skips the download when any of these already hold:
 *   - PUPPETEER_SKIP_DOWNLOAD / PUPPETEER_SKIP_CHROMIUM_DOWNLOAD is set
 *   - PUPPETEER_EXECUTABLE_PATH points at a real binary
 *   - a system Chrome/Chromium is present
 *   - puppeteer's cache already holds a build
 *
 * Set SKIP_BROWSER_INSTALL=1 to bypass entirely.
 */

import { spawnSync } from 'node:child_process';
import { stat } from 'node:fs/promises';

/** Resolve a path without existsSync, which warns on some input types. */
async function fileExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

const SYSTEM_CHROME_PATHS = [
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/opt/google/chrome/chrome',
  '/usr/bin/microsoft-edge-stable',
];

async function haveBrowser() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH && (await fileExists(process.env.PUPPETEER_EXECUTABLE_PATH))) {
    return true;
  }
  for (const p of SYSTEM_CHROME_PATHS) {
    if (await fileExists(p)) return true;
  }
  return false;
}

async function puppeteerOwnsABrowser() {
  try {
    const { default: puppeteer } = await import('puppeteer');
    // executablePath() is async in puppeteer >= 22; awaiting is required or the
    // check silently sees a pending Promise and reports "no browser".
    const p = await puppeteer.executablePath();
    return Boolean(p) && (await fileExists(p));
  } catch {
    return false;
  }
}

/**
 * On Linux, @sparticuz/chromium provides a self-contained browser with the
 * required shared libraries bundled, so there is nothing to download. This is
 * the path Vercel takes: its build image cannot run a stock Chrome binary
 * (missing libnspr4.so and friends), but the bundled build works.
 */
async function bundledBrowserAvailable() {
  if (process.platform !== 'linux') return false;
  try {
    const { default: chromium } = await import('@sparticuz/chromium');
    return typeof chromium?.executablePath === 'function';
  } catch {
    return false;
  }
}

function skip(reason) {
  console.log(`prerender-browser: skipping install (${reason})`);
  process.exit(0);
}

async function main() {
  if (process.env.SKIP_BROWSER_INSTALL === '1') skip('SKIP_BROWSER_INSTALL=1');
  if (process.env.PUPPETEER_SKIP_DOWNLOAD === '1') skip('PUPPETEER_SKIP_DOWNLOAD=1');
  if (process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD === '1') {
    skip('PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1');
  }
  if (await bundledBrowserAvailable()) {
    skip('@sparticuz/chromium is bundled and self-contained');
  }
  if (await haveBrowser()) skip('a system Chrome/Chromium is present');
  if (await puppeteerOwnsABrowser()) skip('puppeteer already has a managed build');

  console.log('prerender-browser: downloading Chrome for prerendering...');
  const res = spawnSync('npx', ['--yes', 'puppeteer', 'browsers', 'install', 'chrome'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (res.status !== 0) {
    console.error(
      '\nprerender-browser: Chrome download failed.\n' +
        'Prerendering needs a browser. Either allow the install script, or set\n' +
        'PUPPETEER_EXECUTABLE_PATH to an existing Chrome/Chromium binary.',
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('prerender-browser: unexpected failure', err);
  process.exit(1);
});