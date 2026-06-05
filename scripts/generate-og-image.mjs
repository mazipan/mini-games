// Renders public/og-image.svg → public/og-image.png.
// Re-run via `bun run generate:og` whenever the SVG changes.
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const svg = readFileSync(resolve(root, 'public/og-image.svg'));
const png = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true },
})
  .render()
  .asPng();

const outPath = resolve(root, 'public/og-image.png');
writeFileSync(outPath, png);
console.log(`Wrote ${outPath} (${(png.length / 1024).toFixed(1)} kB)`);
