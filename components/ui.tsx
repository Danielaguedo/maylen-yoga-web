import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "./icons";
import { Reveal, Rule } from "./reveal";

/* ── Layout shells ────────────────────────────────────────────────────── */

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const width =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-[86rem]" : "max-w-6xl";
  return <div className={`mx-auto w-full ${width} px-6 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
  tone = "sand",
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "sand" | "deep" | "veil" | "bark";
  as?: "section" | "div";
}) {
  const tones = {
    sand: "bg-sand text-bark",
    deep: "bg-sand-deep text-bark",
    veil: "bg-sage-veil text-bark",
    bark: "bg-bark text-sand",
  } as const;

  return (
    <Tag
      id={id}
      className={`${tones[tone]} py-20 sm:py-28 lg:py-36 ${className}`}
      style={id ? { scrollMarginTop: "5rem" } : undefined}
    >
      {children}
    </Tag>
  );
}

/* ── Typographic devices ──────────────────────────────────────────────── */

/**
 * Eyebrow: small caps sans with wide tracking, preceded by a short rule.
 * This is the page's recurring "label" gesture — always the same shape.
 */
export function Eyebrow({
  children,
  tone = "sage",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  tone?: "sage" | "terra" | "light";
  className?: string;
  delay?: number;
}) {
  const colour =
    tone === "terra"
      ? "text-terra-deep"
      : tone === "light"
        ? "text-sage-light"
        : "text-sage-deep";
  const dash = tone === "light" ? "bg-sage-light/60" : "bg-current/45";

  return (
    <Reveal delay={delay} className={`flex items-center gap-3 ${colour} ${className}`}>
      <span aria-hidden className={`h-px w-8 ${dash}`} />
      <span className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.26em]">
        {children}
      </span>
    </Reveal>
  );
}

/** Section heading: eyebrow + display title + optional lead, on one rhythm. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "sage",
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "sage" | "terra" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const centred = align === "center";
  const leadColour = tone === "light" ? "text-sand/75" : "text-bark-soft";

  return (
    <div className={`${centred ? "flex flex-col items-center text-center" : ""} ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Reveal as="h2" delay={80} className="mt-6 text-display">
        {title}
      </Reveal>
      {lead && (
        <Reveal
          as="p"
          delay={160}
          className={`mt-6 max-w-[46ch] text-lead font-light ${leadColour}`}
        >
          {lead}
        </Reveal>
      )}
      <Rule delay={220} className={`mt-10 ${centred ? "max-w-24" : "max-w-32"}`} tone={tone === "light" ? "light" : "sage"} />
    </div>
  );
}

/** A number set in the display face — the editorial index device. */
export function IndexNumber({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      aria-hidden
      className={`font-display text-2xl font-light leading-none text-terra-deep sm:text-3xl ${className}`}
    >
      {children}
    </span>
  );
}

/* ── Actions ──────────────────────────────────────────────────────────── */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost" | "light";
  className?: string;
  external?: boolean;
  arrow?: boolean;
  /** Etiqueta accesible cuando el texto visible no basta por sí solo. */
  "aria-label"?: string;
};

/**
 * All CTAs are ≥48px tall so they clear the 44×44px touch target minimum
 * comfortably, with the arrow easing forward on hover as the only flourish.
 */
export function Button({
  href,
  children,
  variant = "solid",
  className = "",
  external = false,
  arrow = true,
  ...rest
}: ButtonProps) {
  const variants = {
    solid: "bg-terra text-white hover:bg-terra-deep",
    outline: "border border-bark/25 text-bark hover:border-bark/60 hover:bg-bark/[0.04]",
    ghost: "text-bark hover:text-terra-deep",
    light: "border border-sand/30 text-sand hover:border-sand/70 hover:bg-sand/10",
  } as const;

  const classes = [
    "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7",
    "font-sans text-[0.82rem] font-medium uppercase tracking-[0.16em]",
    "transition-colors duration-300 ease-out cursor-pointer",
    variants[variant],
    className,
  ].join(" ");

  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowIcon className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {inner}
    </Link>
  );
}

/** Enlace de texto con subrayado que se dibuja desde la izquierda. */
export function TextLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  /* inline-flex + min-h-11 keeps the hit area at 44px without changing how the
     underline sits against the text. */
  const classes = `link-draw inline-flex min-h-11 items-center font-sans text-sm font-medium uppercase tracking-[0.16em] text-terra-deep transition-colors duration-300 hover:text-bark ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
