/**
 * Screenshot every route at every breakpoint, headless.
 *
 *  node scripts/shoot.mjs            → capture all
 *  node scripts/shoot.mjs --motion   → additionally probe the reveal animations
 *
 * The reveals are IntersectionObserver-driven, so a naive full-page shot would
 * capture everything below the fold still masked. Each page is therefore
 * scrolled to the bottom in steps (firing every observer), returned to the top,
 * and given time to settle before the shutter opens.
 */

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = path.resolve("screenshots");

const ROUTES = [
  { slug: "home", path: "/" },
  { slug: "clases", path: "/clases" },
  { slug: "sobre-maylen", path: "/sobre-maylen" },
  { slug: "contacto", path: "/contacto" },
];

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

/** Scroll the whole page so every IntersectionObserver fires, then return to top. */
async function primeReveals(page) {
  return page.evaluate(async () => {
    // The stylesheet sets `scroll-behavior: smooth`, which makes successive
    // scrollTo calls animate and cancel each other — the page would crawl a few
    // hundred pixels and most observers would never fire. Force instant jumps.
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const step = Math.round(window.innerHeight * 0.6);
    let maxY = 0;
    for (let y = 0; y < root.scrollHeight; y += step) {
      window.scrollTo(0, y);
      maxY = Math.max(maxY, window.scrollY);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, root.scrollHeight);
    await new Promise((r) => setTimeout(r, 300));
    maxY = Math.max(maxY, window.scrollY);
    window.scrollTo(0, 0);

    root.style.scrollBehavior = previous;
    return { maxY, pageH: root.scrollHeight };
  });
}

/** How many reveal elements never became visible, and is anything mid-transition? */
async function revealState(page) {
  return page.evaluate(() => {
    // Only count elements that are actually rendered. Responsive duplicates
    // (e.g. a CTA that is `hidden lg:block`) are display:none at some widths,
    // can never intersect, and would otherwise be permanent false positives.
    const all = [...document.querySelectorAll("[data-reveal],[data-rule]")].filter(
      (e) => e.getClientRects().length > 0,
    );

    /**
     * Measure the rendered result, not the `data-visible` attribute. Nested
     * reveals are made visible by inheriting their parent's state in CSS and
     * never receive the attribute themselves — what matters is whether a
     * visitor can actually see them.
     */
    const scaleX = (t) => (t === "none" ? 1 : Number(t.slice(t.indexOf("(") + 1).split(",")[0]));
    const isRevealed = (e) => {
      const cs = getComputedStyle(e);
      if (e.hasAttribute("data-rule")) return scaleX(cs.transform) > 0.99;
      return Number(cs.opacity) > 0.99 && /^(inset\(0px\)|none)$/.test(cs.clipPath);
    };

    const describe = (e) =>
      e.textContent.trim().slice(0, 40) ||
      `<${e.tagName.toLowerCase()} class="${e.className.slice(0, 40)}"> in ${e.parentElement?.tagName}`;

    const unrevealed = all.filter((e) => !isRevealed(e));
    const midFlight = all.filter((e) => {
      const o = Number(getComputedStyle(e).opacity);
      return o > 0.01 && o < 0.99;
    });

    return {
      total: all.length,
      unrevealed: unrevealed.length,
      unrevealedSample: unrevealed.slice(0, 4).map(describe),
      midFlight: midFlight.length,
      hOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
      pageH: document.body.scrollHeight,
    };
  });
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const report = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      // Explicitly opt OUT of reduced motion: we want the real animated result.
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      await page.goto(BASE + route.path, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);

      const scrolled = await primeReveals(page);
      // Longest chain is ~1.7s of transition plus ~0.5s of stagger delay.
      await page.waitForTimeout(2600);

      const state = await revealState(page);
      await page.screenshot({ path: path.join(OUT, `${route.slug}-${vp.name}.png`), fullPage: true });
      // Full-page shots of a 7000px page lose detail once scaled down, so also
      // keep an above-the-fold frame at native resolution for close inspection.
      await page.screenshot({ path: path.join(OUT, `${route.slug}-${vp.name}-fold.png`) });

      report.push({ route: route.slug, viewport: vp.name, width: vp.width, ...state, ...scrolled });
      const flag = state.unrevealed > 0 || state.midFlight > 0 ? "  <-- CHECK" : "";
      console.log(
        `${route.slug.padEnd(14)} ${vp.name.padEnd(8)} ${String(vp.width).padStart(4)}px  ` +
          `reveals ${state.total - state.unrevealed}/${state.total}  ` +
          `midFlight ${state.midFlight}  hOverflow ${state.hOverflow}  ` +
          `scrolled ${scrolled.maxY}/${scrolled.pageH}px${flag}`,
      );
    }

    // Mobile also gets the open navigation panel, which no other shot shows.
    if (vp.name === "mobile") {
      await page.goto(BASE + "/", { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.click('button[aria-controls="menu-movil"]');
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(OUT, "home-mobile-menu.png") });
      console.log("home (menu)    mobile     375px  captured");
    }

    await context.close();
  }

  await browser.close();
  await writeFile(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
  console.log(`\n${report.length} screenshots → ${OUT}`);

  /**
   * Regression guard.
   *
   * A reveal that never fires leaves its content permanently invisible to real
   * visitors while the markup still looks correct in the DOM — exactly the bug
   * that shipped once here, when `clip-path` zeroed the intersection ratio and
   * pinned it below a non-zero threshold. Fail loudly rather than quietly
   * producing screenshots of a half-blank page.
   */
  const broken = report.filter((r) => r.unrevealed > 0);
  if (broken.length) {
    console.error("\n✗ Content that never revealed — visitors would never see it:");
    for (const r of broken) {
      console.error(`  ${r.route} @ ${r.viewport}: ${r.unrevealed} of ${r.total}`);
      for (const s of r.unrevealedSample) console.error(`      "${s}"`);
    }
    process.exit(1);
  }

  const stuck = report.filter((r) => r.midFlight > 0);
  if (stuck.length) {
    console.warn(
      `\n! ${stuck.length} capture(s) taken while a transition was still running — ` +
        `raise the settle timeout if screenshots look partial.`,
    );
  }

  console.log("✓ every rendered reveal fired");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
