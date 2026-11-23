/**
 * Generate lossless modern-format variants of the brand logos so browsers can
 * pick WebP/AVIF over PNG via <picture> without any visible quality loss.
 * Runs as part of `npm run build` before Vite copies public/ into dist/.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

const logos = [
  'logo.png',
  'logo-white.png',
  'logo-mark.png',
  'logo-mark-white.png',
];

for (const name of logos) {
  const input = path.join(publicDir, name);
  const base = name.replace(/\.png$/i, '');

  await sharp(input).webp({ lossless: true }).toFile(path.join(publicDir, `${base}.webp`));
  await sharp(input).avif({ lossless: true }).toFile(path.join(publicDir, `${base}.avif`));
}

console.log(`Generated WebP and AVIF variants for ${logos.length} logos.`);
