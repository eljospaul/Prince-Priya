/**
 * A Little Forever — placeholder image generator.
 *
 * Creates SVG placeholder photographs in public/uploads/ so the site is
 * complete and reviewable before the couple's real photographs are supplied.
 *
 * Run:  npm run generate:placeholders
 *
 * Replace these SVGs with real JPEG/PNG photographs (same file names), then
 * update content/gallery.ts with real captions and categories.
 */

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dir = join(root, "public", "uploads");
mkdirSync(dir, { recursive: true });

const IVORY = "#F5EBDD";
const PARCHMENT = "#EFE1CE";
const CHAMPAGNE = "#D8C1A0";
const GOLD = "#B58B50";
const VERMILION = "#A92D32";
const MAROON = "#702B32";
const ROSE = "#B77D78";
const WALNUT = "#493126";
const OLIVE = "#777A5A";
const WARM_WHITE = "#FFFBF5";

function rect(w, h, fill) {
  return `<rect width="${w}" height="${h}" fill="${fill}"/>`;
}

function text(x, y, content, { size = 24, fill = WALNUT, family = "Georgia, serif", weight = "normal", style = "normal" } = {}) {
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" font-style="${style}" fill="${fill}" text-anchor="middle">${content}</text>`;
}

function line(x1, y1, x2, y2, stroke, width = 1) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}"/>`;
}

function photo(w, h, label, accent, accent2) {
  const bg = [IVORY, PARCHMENT, CHAMPAGNE, WARM_WHITE][
    Math.floor(Math.random() * 4)
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label} - placeholder photograph">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="${accent2}" stop-opacity="0.04"/>
    </linearGradient>
  </defs>
  ${rect(w, h, bg)}
  <rect x="8" y="8" width="${w - 16}" height="${h - 16}" fill="none" stroke="${accent}" stroke-width="2"/>
  <rect x="16" y="16" width="${w - 32}" height="${h - 32}" fill="none" stroke="${accent2}" stroke-width="1" stroke-dasharray="4 4"/>
  ${text(w / 2, h / 2 - 10, label, { size: 26, fill: WALNUT, weight: "600" })}
  ${text(w / 2, h / 2 + 18, "A Little Forever · placeholder", { size: 14, fill: MAROON, style: "italic" })}
  ${text(w / 2, h - 30, "Replace with a real photograph", { size: 13, fill: "#9a7e5f" })}
  <circle cx="${w - 22}" cy="${h - 22}" r="6" fill="${VERMILION}"/>
  <circle cx="${w - 22}" cy="${h - 22}" r="2" fill="${WARM_WHITE}"/>
</svg>`;
}

const images = [
  { file: "hero.jpg", w: 1400, h: 900, label: "Hero photograph", accent: GOLD, accent2: VERMILION },
  { file: "story-01.jpg", w: 700, h: 900, label: "Story photograph 01", accent: OLIVE, accent2: CHAMPAGNE },
  { file: "story-02.jpg", w: 900, h: 600, label: "Story photograph 02", accent: GOLD, accent2: CHAMPAGNE },
  { file: "story-03.jpg", w: 700, h: 900, label: "Story photograph 03", accent: ROSE, accent2: MAROON },
  { file: "story-04.jpg", w: 1000, h: 700, label: "Story photograph 04", accent: GOLD, accent2: OLIVE },
  { file: "gallery-01.jpg", w: 1000, h: 1333, label: "Gallery 01 · Pre-wedding", accent: GOLD, accent2: CHAMPAGNE },
  { file: "gallery-02.jpg", w: 1333, h: 1000, label: "Gallery 02 · Wedding", accent: VERMILION, accent2: MAROON },
  { file: "gallery-03.jpg", w: 800, h: 1000, label: "Gallery 03 · Candid", accent: OLIVE, accent2: CHAMPAGNE },
  { file: "gallery-04.jpg", w: 600, h: 800, label: "Gallery 04 · Details", accent: ROSE, accent2: MAROON },
  { file: "gallery-05.jpg", w: 1000, h: 1333, label: "Gallery 05 · Wedding", accent: GOLD, accent2: VERMILION },
  { file: "gallery-06.jpg", w: 1333, h: 800, label: "Gallery 06 · Candid", accent: CHAMPAGNE, accent2: GOLD },
  { file: "gallery-07.jpg", w: 800, h: 600, label: "Gallery 07 · Pre-wedding", accent: OLIVE, accent2: GOLD },
  { file: "gallery-08.jpg", w: 600, h: 600, label: "Gallery 08 · Details", accent: MAROON, accent2: ROSE },
  { file: "gallery-09.jpg", w: 1000, h: 1000, label: "Gallery 09 · Wedding", accent: VERMILION, accent2: CHAMPAGNE },
  { file: "gallery-10.jpg", w: 1000, h: 1333, label: "Gallery 10 · Candid", accent: GOLD, accent2: ROSE },
  { file: "gallery-11.jpg", w: 800, h: 1000, label: "Gallery 11 · Pre-wedding", accent: CHAMPAGNE, accent2: OLIVE },
  { file: "gallery-12.jpg", w: 600, h: 600, label: "Gallery 12 · Details", accent: ROSE, accent2: GOLD },
];

for (const img of images) {
  if (existsSync(join(dir, img.file))) continue;
  writeFileSync(join(dir, img.file), photo(img.w, img.h, img.label, img.accent, img.accent2));
}

console.log(`Generated ${images.length} placeholder images in ${dir}`);
