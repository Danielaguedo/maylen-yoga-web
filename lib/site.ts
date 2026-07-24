/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — single source of truth for every real-world detail.
 *
 *  ⚠️  TODO ANTES DE PUBLICAR: cada valor marcado con `PLACEHOLDER`
 *      debe reemplazarse con los datos reales de Maylen.
 *      No hay datos de contacto reales en ninguna otra parte del código.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Maylen Aguedo",
  role: "Instructora de yoga y pilates",
  city: "Arequipa",
  country: "Perú",

  /** Cambiar por el dominio real cuando se despliegue. */
  url: "https://maylenaguedo.com", // PLACEHOLDER

  description:
    "Clases de yoga acrobático, pilates, vinyasa e iniciación en Arequipa. Grupos reducidos en estudio propio y sesiones privadas uno a uno.",
} as const;

export const contact = {
  /** Formato internacional, sólo dígitos — se usa para el enlace wa.me */
  whatsappNumber: "51999999999", // PLACEHOLDER — número real de Maylen
  /** Cómo se muestra en pantalla */
  phoneDisplay: "+51 999 999 999", // PLACEHOLDER
  /** Formato tel: para marcar desde el móvil */
  phoneHref: "+51999999999", // PLACEHOLDER

  email: "hola@maylenaguedo.com", // PLACEHOLDER

  instagramHandle: "@maylen.yoga", // PLACEHOLDER
  instagramUrl: "https://instagram.com/maylen.yoga", // PLACEHOLDER

  /** El estudio es su casa: se comparte la zona, la dirección exacta va por WhatsApp. */
  neighbourhood: "Yanahuara, Arequipa", // PLACEHOLDER
} as const;

/** Mensaje que se autocompleta al abrir WhatsApp. */
export const whatsappUrl = (message = "Hola Maylen, me gustaría saber más sobre tus clases.") =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/clases", label: "Clases" },
  { href: "/sobre-maylen", label: "Sobre Maylen" },
  { href: "/contacto", label: "Contacto" },
] as const;
