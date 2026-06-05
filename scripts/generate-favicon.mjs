// Generates a 32×32 PNG favicon for each game from its emoji icon using
// Twemoji SVGs (no network required). Also generates public/favicon.png as
// the site-wide fallback. Re-run via `bun run generate:favicon` when a game's
// icon changes or a new game is added to src/_data/games.js.
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createRequire } from 'module';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const require = createRequire(import.meta.url);

const FAVICON_SIZE = 32;
const FALLBACK_EMOJI = '🎮';

function toTwemojiBase(emoji) {
  const hasZwj = [...emoji].some((c) => c.codePointAt(0) === 0x200d);
  const cps = [];
  for (const ch of emoji) {
    const cp = ch.codePointAt(0);
    if (!hasZwj && cp === 0xfe0f) continue;
    cps.push(cp.toString(16));
  }
  return cps.join('-');
}

function loadTwemojiSvg(emoji) {
  const base = toTwemojiBase(emoji);
  const svgPath = resolve(root, 'node_modules/@twemoji/svg', `${base}.svg`);
  if (!existsSync(svgPath)) {
    throw new Error(`No Twemoji SVG for "${emoji}" (codepoints "${base}") at ${svgPath}`);
  }
  return readFileSync(svgPath, 'utf8');
}

function renderFavicon(svg) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: FAVICON_SIZE } })
    .render()
    .asPng();
}

const games = require('../src/_data/games.js');

const targets = [
  { outFile: 'favicon.png', emoji: FALLBACK_EMOJI, label: 'fallback' },
  ...games.map((g) => ({
    outFile: `favicon-${g.slug}.png`,
    emoji: g.icon,
    label: g.slug,
  })),
];

let written = 0;
for (const { outFile, emoji, label } of targets) {
  const svg = loadTwemojiSvg(emoji);
  const png = renderFavicon(svg);
  const outPath = resolve(root, 'public', outFile);
  writeFileSync(outPath, png);
  console.log(`[generate-favicon] ${label.padEnd(20)} ${emoji}  → public/${outFile} (${png.length} B)`);
  written++;
}
console.log(`[generate-favicon] 🎉 wrote ${written} favicons`);
