/**
 * Writes the organization-level JSON-LD into index.html between the
 * BEGIN/END markers below.
 *
 * Why: after prerendering, crawlers that do not execute JavaScript still need
 * the Organization entity in the initial HTML. Generating it from
 * src/lib/schema.ts rather than hand-writing it means the static block and the
 * client-injected route graph can never disagree about name, phone or address.
 *
 * Run as part of `npm run build`.
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Compiled from src via esbuild so we don't need ts-node at build time. */
async function loadGraph() {
  const { build } = await import('esbuild');
  const outfile = path.join(ROOT, 'node_modules', '.cache', 'schema-entry.mjs');
  await build({
    entryPoints: [path.join(ROOT, 'src', 'lib', 'schema-entry.ts')],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: true,
    outfile,
    logLevel: 'silent',
  });
  const mod = await import(outfile);
  return mod.organizationGraph();
}

const BEGIN = '<!-- BEGIN organization-schema -->';
const END = '<!-- END organization-schema -->';

async function main() {
  const graph = await loadGraph();
  const json = JSON.stringify(graph, null, 2);

  const indexPath = path.join(ROOT, 'index.html');
  let html = await readFile(indexPath, 'utf8');

  const block = `${BEGIN}\n  <script type="application/ld+json">\n${json
    .split('\n')
    .map((line) => '  ' + line)
    .join('\n')}\n  </script>\n  ${END}`;

  if (html.includes(BEGIN)) {
    html = html.replace(new RegExp(`${BEGIN}[\\s\\S]*?${END}`), block);
  } else {
    html = html.replace('</head>', `  ${block}\n</head>`);
  }

  await writeFile(indexPath, html, 'utf8');
  console.log(`index.html: organization schema written (${graph['@graph'].length} nodes)`);
}

main().catch((err) => {
  console.error('Failed to emit organization schema:', err);
  process.exit(1);
});