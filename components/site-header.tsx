"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArcMark, CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";
import { nav, site, whatsappUrl } from "@/lib/site";

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function isScrolled() {
  return window.scrollY > 16;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* The bar earns its background only once the hero has moved under it.
     Subscribing via useSyncExternalStore keeps the SSR pass consistent (false)
     and avoids an extra render pass on mount. */
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, () => false);

  /* Close the panel when the route changes — adjusted during render rather
     than in an effect, so the overlay never paints over the new page. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  /* While the panel is open: lock scroll, trap focus, honour Escape. */
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    // Move focus into the panel so keyboard users land where they expect.
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-out ${
        scrolled && !open
          ? "border-b border-sage/25 bg-sand/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[86rem] items-center justify-between px-6 sm:px-8 lg:h-20 lg:px-12">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-2.5 text-bark"
          aria-label={`${site.name} — ir al inicio`}
        >
          <ArcMark className="h-6 w-6 text-sage-deep transition-transform duration-700 ease-out group-hover:-translate-y-0.5" />
          <span className="font-display text-lg font-normal leading-none tracking-tight sm:text-xl">
            Maylen Aguedo
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={`link-draw inline-flex min-h-11 items-center font-sans text-[0.8rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                isCurrent(item.href) ? "text-terra-deep" : "text-bark hover:text-terra-deep"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-terra px-6 font-sans text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-terra-deep"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            Escríbeme
          </a>
        </nav>

        {/* Mobile toggle — 44×44 minimum touch target */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="-mr-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-bark transition-colors duration-300 hover:bg-bark/[0.06] lg:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* ── Mobile panel ───────────────────────────────────────────────────
          Not a collapsed desktop nav: the links are set large in the display
          face and numbered, so the menu reads as a page of its own. */}
      <div
        id="menu-movil"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 top-16 z-40 flex flex-col bg-sand lg:hidden"
      >
        <nav aria-label="Principal (móvil)" className="flex-1 overflow-y-auto px-6 pt-8">
          <ul>
            {nav.map((item, index) => (
              <li key={item.href} className="border-b border-sage/25">
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="flex items-baseline gap-5 py-5 transition-colors duration-300"
                >
                  <span
                    aria-hidden
                    className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.24em] text-sage-deep"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-3xl font-light ${
                      isCurrent(item.href) ? "text-terra-deep italic" : "text-bark"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-[30ch] font-display text-xl font-light italic leading-snug text-bark-soft">
            Respira. Muévete. Vuelve a ti.
          </p>
        </nav>

        <div className="border-t border-sage/25 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-terra px-6 font-sans text-[0.82rem] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-terra-deep"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            Escríbeme por WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
