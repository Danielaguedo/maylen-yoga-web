/** Prove the reveal actually animates over time rather than snapping. */
import { chromium } from "playwright";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3001";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200);

// Park just above the "Cuatro maneras de moverse" index so it is still hidden.
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = "auto";
  const h = [...document.querySelectorAll("h2")].find((e) => e.textContent.includes("Cuatro maneras"));
  window.scrollTo(0, h.getBoundingClientRect().top + window.scrollY - window.innerHeight - 40);
});
await page.waitForTimeout(900);

const sample = () =>
  page.evaluate(() => {
    const h = [...document.querySelectorAll("h2")].find((e) => e.textContent.includes("Cuatro maneras"));
    const rule = document.querySelector('[data-rule]:not([data-visible="true"])') ?? document.querySelector("[data-rule]");
    const cs = getComputedStyle(h);
    return {
      heading: {
        vis: h.getAttribute("data-visible") ?? "-",
        opacity: +Number(cs.opacity).toFixed(2),
        clip: cs.clipPath.replace(/px/g, "").slice(0, 34),
        y: cs.transform === "none" ? "none" : cs.transform.split(",").slice(-1)[0].replace(")", "").trim(),
      },
      rule: rule ? getComputedStyle(rule).transform.slice(0, 30) : "-",
    };
  });

console.log("before scroll into view:", JSON.stringify(await sample()));

// Nudge it into view and sample the transition as it plays.
await page.evaluate(() => window.scrollBy(0, 420));
for (const t of [80, 200, 400, 700, 1100, 1600]) {
  await page.waitForTimeout(t === 80 ? 80 : 0);
  const s = await sample();
  console.log(`~${String(t).padStart(4)}ms  opacity ${String(s.heading.opacity).padEnd(5)} clip ${s.heading.clip.padEnd(30)} y ${s.heading.y}`);
  if (t < 1600) await page.waitForTimeout(t === 80 ? 120 : t === 200 ? 200 : t === 400 ? 300 : t === 700 ? 400 : 500);
  if (t === 200 || t === 700) {
    await page.screenshot({ path: path.resolve("screenshots", `motion-${t}ms.png`) });
  }
}

await browser.close();
