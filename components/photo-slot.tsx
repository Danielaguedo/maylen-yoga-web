import Image from "next/image";
import { Reveal } from "./reveal";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PHOTO SLOT — zona de foto reemplazable
 *
 *  CÓMO PONER LA FOTO REAL:
 *    1. Guarda la imagen en /public/fotos/  (p. ej. /public/fotos/maylen-acro.jpg)
 *    2. Añade  src="/fotos/maylen-acro.jpg"  a este componente.
 *    3. Escribe un `alt` descriptivo. Nada más — el marco, la máscara de arco
 *       y la animación siguen funcionando igual.
 *
 *  Sin `src`, se dibuja un marcador de posición con la descripción de la foto
 *  que debería ir ahí. Busca `<PhotoSlot` en el proyecto para listarlas todas.
 * ─────────────────────────────────────────────────────────────────────────
 */

type PhotoSlotProps = {
  /** Qué foto va aquí. Se muestra en el marcador y guía a quien la reemplace. */
  caption: string;
  /** Tailwind aspect ratio, p. ej. "aspect-[3/4]" */
  ratio?: string;
  className?: string;
  /** Ruta de la imagen real. Cuando existe, el marcador desaparece. */
  src?: string;
  alt?: string;
  /** `priority` sólo para la imagen del hero (LCP). */
  priority?: boolean;
  /** Pista de tamaño para next/image. */
  sizes?: string;
  /** Variación del marcador, para que dos huecos vecinos no se repitan. */
  tone?: Tone;
  delay?: number;
};

type Tone = "sage" | "terra" | "sand" | "dusk";

/**
 * Cada tono cambia la dirección del degradado, no sólo el color: con cuatro
 * huecos seguidos en /clases, una variación sólo de matiz era imperceptible y
 * la página parecía cuatro cajas vacías iguales.
 */
const tones: Record<Tone, { field: string; mark: string }> = {
  sage: {
    field: "bg-gradient-to-br from-sage-veil via-sand-deep to-sage/45",
    mark: "w-1/3 -translate-y-[58%]",
  },
  terra: {
    field: "bg-gradient-to-tl from-terra/25 via-sand-veil to-sand-deep",
    mark: "w-1/4 -translate-y-[72%]",
  },
  sand: {
    field: "bg-gradient-to-t from-bark/16 via-sand-deep to-sand-veil",
    mark: "w-2/5 -translate-y-[48%]",
  },
  dusk: {
    field: "bg-gradient-to-bl from-sage/35 via-sand-veil to-terra/18",
    mark: "w-[30%] -translate-y-[64%]",
  },
};

export function PhotoSlot({
  caption,
  ratio = "aspect-[3/4]",
  className = "",
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 45vw",
  tone = "sage",
  delay = 0,
}: PhotoSlotProps) {
  return (
    <Reveal variant="fade" delay={delay} className={`relative ${ratio} ${className}`}>
      <div className="arch relative h-full w-full overflow-hidden bg-sand-deep">
        {src ? (
          <Image
            src={src}
            alt={alt ?? caption}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
            data-arch-inner
          />
        ) : (
          <Placeholder caption={caption} tone={tone} />
        )}
      </div>

      {/* Hairline echo of the arch, offset — a quiet second contour. */}
      <div
        aria-hidden
        className="arch pointer-events-none absolute -inset-2 -z-10 border border-sage/30 sm:-inset-3"
      />
    </Reveal>
  );
}

function Placeholder({ caption, tone }: { caption: string; tone: Tone }) {
  const { field, mark } = tones[tone];

  return (
    <div
      /* Marcador de posición — buscar `data-photo-slot` para localizarlos todos. */
      data-photo-slot={caption}
      className="grain absolute inset-0"
      role="img"
      aria-label={`Zona reservada para una fotografía: ${caption}`}
    >
      <div data-arch-inner className={`absolute inset-0 ${field}`} />

      {/* Brand mark, sunk into the field */}
      <svg
        aria-hidden
        viewBox="0 0 120 120"
        className={`absolute left-1/2 top-1/2 max-w-28 -translate-x-1/2 text-bark/20 ${mark}`}
        fill="none"
      >
        <path
          d="M14 96a46 46 0 0 1 92 0"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M34 96a26 26 0 0 1 52 0"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle cx="60" cy="38" r="4" fill="currentColor" />
      </svg>

      {/* The instruction to whoever swaps this out */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.22em] text-bark-soft">
          Zona de foto
        </p>
        <p className="mt-1.5 max-w-[34ch] font-sans text-xs leading-relaxed text-bark/75">
          {caption}
        </p>
      </div>
    </div>
  );
}
