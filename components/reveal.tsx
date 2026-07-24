"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  children?: ReactNode;
  /**
   * `wipe`  — mask lifts off the content (default, for text blocks)
   * `fade`  — same timing without the mask, for elements that paint outside
   *           their own box and would otherwise be cropped
   * `rule`  — draws a hairline left-to-right
   */
  variant?: "wipe" | "fade" | "rule";
  /** Stagger, in ms. Keep increments small (60–90ms) so it reads as one gesture. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Scroll-triggered reveal.
 *
 * The `data-visible` flag is written straight to the DOM rather than held in
 * React state: this is a one-way sync with an external system (the observer),
 * it costs no re-render, and it keeps the animation entirely in CSS — so a
 * `prefers-reduced-motion` user simply gets the final state.
 *
 * Elements are only ever revealed, never re-hidden, so nothing flickers when
 * the visitor scrolls back up.
 */
export function Reveal({
  children,
  variant = "wipe",
  delay = 0,
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.setAttribute("data-visible", "true");

    // No IntersectionObserver, or the visitor asked for less motion: show now.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      /**
       * `threshold` MUST stay 0.
       *
       * The hidden state clips the element with `clip-path: inset(0 0 100% 0)`,
       * and Chromium applies a target's own clip-path when computing the
       * intersection rect — so intersectionRatio is pinned at 0 for exactly the
       * elements we need to reveal. Any non-zero threshold is unsatisfiable and
       * the content stays invisible forever. `isIntersecting` is still true at
       * ratio 0, so a zero threshold fires correctly; the trigger point is
       * tuned with rootMargin instead.
       */
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const motionAttr =
    variant === "rule" ? { "data-rule": "" } : { "data-reveal": variant === "fade" ? "fade" : "" };

  return (
    <Tag
      ref={ref}
      {...motionAttr}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** A hairline that draws itself into place. The page's main structural device. */
export function Rule({
  delay = 0,
  className = "",
  tone = "sage",
}: {
  delay?: number;
  className?: string;
  tone?: "sage" | "bark" | "light";
}) {
  const colour =
    tone === "bark" ? "bg-bark/25" : tone === "light" ? "bg-sand/20" : "bg-sage/45";

  return <Reveal variant="rule" delay={delay} className={`h-px w-full ${colour} ${className}`} />;
}
