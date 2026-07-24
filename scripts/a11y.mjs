/**
 * Barrido de accesibilidad — cada ruta × cada punto de ruptura.
 *
 *   npm run build && npx next start -p 3001
 *   node scripts/a11y.mjs                    (o BASE_URL=… node scripts/a11y.mjs)
 *
 * Termina con código 1 si algo falla, para que sirva en CI.
 *
 * Comprueba:
 *   · contraste AA (4.5:1, o 3:1 en texto grande)
 *   · objetivos táctiles ≥ 44px
 *   · el enlace «saltar al contenido» crece al recibir el foco
 *   · sin desbordamiento horizontal
 *   · un solo <h1> y jerarquía de encabezados sin saltos
 *   · alt en imágenes, nombre accesible en enlaces y botones
 *   · rel="noopener" en enlaces externos
 *   · atributo lang en <html>
 */

import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3001";

const ROUTES = ["/", "/clases", "/sobre-maylen", "/contacto"];
const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

/** Reveals are scroll-triggered; audit the final state, not the hidden one. */
async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const step = Math.round(window.innerHeight * 0.6);
    for (let y = 0; y < root.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 70));
    }
    window.scrollTo(0, root.scrollHeight);
    await new Promise((r) => setTimeout(r, 200));
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  });
  await page.waitForTimeout(1800);
}

function audit() {
  /**
   * Compositing the colour onto its background on a canvas resolves oklab()
   * and alpha in one step, so Tailwind's /opacity utilities measure correctly.
   */
  const cv = document.createElement("canvas");
  cv.width = cv.height = 1;
  const cx = cv.getContext("2d", { willReadFrequently: true });
  const flatten = (fg, bg) => {
    cx.clearRect(0, 0, 1, 1);
    cx.fillStyle = bg;
    cx.fillRect(0, 0, 1, 1);
    cx.fillStyle = fg;
    cx.fillRect(0, 0, 1, 1);
    const d = cx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  };
  const lum = (rgb) => {
    const [r, g, b] = rgb.map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (fg, bg) => {
    const a = lum(flatten(fg, bg));
    const b = lum(flatten(bg, bg));
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  };
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const bg = getComputedStyle(n).backgroundColor;
      if (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) return bg;
      n = n.parentElement;
    }
    return "rgb(255,255,255)";
  };

  /** The sr-only pattern: 1px and absolute until focused. Sized separately. */
  const isScreenReaderOnly = (el, rect) =>
    getComputedStyle(el).position === "absolute" && rect.width <= 1 && rect.height <= 1;

  const issues = [];

  document.querySelectorAll("h1,h2,h3,p,li,a,span,dt,dd,blockquote,figcaption,button").forEach((el) => {
    if (!el.textContent.trim() || el.getAttribute("aria-hidden") === "true") return;
    // Only elements holding their own text node; skip pure wrappers.
    if (el.children.length && ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || cs.opacity === "0") return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height || isScreenReaderOnly(el, rect)) return;

    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight) || 400;
    const need = size >= 24 || (size >= 18.66 && weight >= 700) ? 3 : 4.5;
    const value = ratio(cs.color, bgOf(el));
    if (value < need - 0.005) {
      issues.push(`contrast ${value.toFixed(2)}:1 < ${need}  "${el.textContent.trim().slice(0, 38)}" @${Math.round(size)}px`);
    }
  });

  document.querySelectorAll("a[href],button").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height || isScreenReaderOnly(el, rect)) return;
    if (rect.height < 44) {
      const label = (el.textContent.trim() || el.getAttribute("aria-label") || "?").slice(0, 30);
      issues.push(`touch target ${Math.round(rect.height)}px < 44px  "${label}"`);
    }
    if (!(el.textContent.trim() || el.getAttribute("aria-label") || el.getAttribute("title"))) {
      issues.push(`no accessible name on <${el.tagName.toLowerCase()}>`);
    }
  });

  document.querySelectorAll("img").forEach((img) => {
    if (!img.alt) issues.push(`img without alt: ${img.getAttribute("src")}`);
  });

  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    if (!/noopener/.test(a.rel)) issues.push(`target=_blank without rel=noopener: ${a.href}`);
  });

  const h1s = document.querySelectorAll("h1").length;
  if (h1s !== 1) issues.push(`expected exactly one <h1>, found ${h1s}`);

  const levels = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => +h.tagName[1]);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      issues.push(`heading level jumps h${levels[i - 1]} → h${levels[i]}`);
      break;
    }
  }

  if (document.documentElement.scrollWidth > document.documentElement.clientWidth) {
    issues.push(`horizontal overflow: ${document.documentElement.scrollWidth}px > ${document.documentElement.clientWidth}px`);
  }

  if (!document.documentElement.lang) issues.push("<html> has no lang attribute");

  return issues;
}

const browser = await chromium.launch();
let total = 0;

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await settle(page);

    const issues = await page.evaluate(audit);

    // The skip link is 1px until focused — assert it becomes a real target.
    const skip = page.locator('a[href="#contenido"]').first();
    if (await skip.count()) {
      await skip.focus();
      const box = await skip.boundingBox();
      if (!box || box.height < 44) {
        issues.push(`skip link is ${box ? Math.round(box.height) : 0}px when focused, expected ≥ 44px`);
      }
    } else {
      issues.push("no skip link found");
    }

    total += issues.length;
    const status = issues.length ? `✗ ${issues.length}` : "✓";
    console.log(`${status}  ${route.padEnd(15)} ${vp.name} (${vp.width}px)`);
    issues.forEach((i) => console.log(`     ${i}`));
  }

  await context.close();
}

await browser.close();

if (total) {
  console.error(`\n✗ ${total} accessibility issue(s) across ${ROUTES.length} routes × ${VIEWPORTS.length} widths`);
  process.exit(1);
}
console.log(`\n✓ clean — ${ROUTES.length} routes × ${VIEWPORTS.length} widths`);
