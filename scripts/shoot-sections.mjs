/**
 * Section-level frames. Full-page shots of a 7000px page are unreadable once
 * scaled down, so this captures each <section> on its own at native resolution.
 *
 *   node scripts/shoot-sections.mjs <route-slug> <viewport>
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3001";
const OUT = path.resolve("screenshots", "sections");

const VIEWPORTS = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
};

const ROUTES = { home: "/", clases: "/clases", "sobre-maylen": "/sobre-maylen", contacto: "/contacto" };

const [slug = "home", vpName = "mobile"] = process.argv.slice(2);
const vp = VIEWPORTS[vpName];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: vp, deviceScaleFactor: 2 });

await page.goto(BASE + ROUTES[slug], { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

// Prime every reveal, then let the transitions land.
await page.evaluate(async () => {
  const root = document.documentElement;
  root.style.scrollBehavior = "auto";
  const step = Math.round(window.innerHeight * 0.6);
  for (let y = 0; y < root.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, root.scrollHeight);
  await new Promise((r) => setTimeout(r, 300));
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2600);

const targets = await page.$$("main > section, main > div > section, footer");
console.log(`${slug} @ ${vpName}: ${targets.length} sections`);

for (const [i, el] of targets.entries()) {
  const box = await el.boundingBox();
  if (!box || box.height < 40) continue;
  const file = path.join(OUT, `${slug}-${vpName}-${String(i).padStart(2, "0")}.png`);
  await el.screenshot({ path: file });
  console.log(`  ${path.basename(file)}  ${Math.round(box.width)}x${Math.round(box.height)}`);
}

await browser.close();
