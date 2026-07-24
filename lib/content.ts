/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CONTENIDO EDITORIAL
 *
 *  Textos de marcador de posición (placeholder) redactados en el tono de la
 *  marca. Maylen puede reescribirlos sin tocar ningún componente.
 *  Los precios y la formación están marcados con  ⚠  y son inventados.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type ClassKind = {
  /** slug — se usa como ancla: /clases#acroyoga */
  id: string;
  /** Número de índice editorial: 01 … 04 */
  index: string;
  name: string;
  /** Una línea, aparece bajo el título */
  tagline: string;
  description: string;
  /** 3 viñetas cortas — qué esperar */
  highlights: readonly string[];
  level: string;
  duration: string;
  /** Descripción de la foto que irá en este hueco */
  photo: string;
  /**
   * Proporción del hueco. DEBE coincidir con la orientación descrita en
   * `photo`: si el pie dice "horizontal 4:3" y el marco es vertical, la página
   * se descuadra el día que llegue la foto real.
   */
  aspect: string;
};

export const classes: readonly ClassKind[] = [
  {
    id: "acroyoga",
    index: "01",
    name: "Yoga acrobático",
    tagline: "Confianza compartida, fuerza en dos cuerpos",
    description:
      "Trabajo en pareja donde el equilibrio deja de ser individual. Combinamos posturas de suelo, vuelos suaves y ejercicios de contrapeso, siempre con progresiones y acompañamiento cercano. No necesitas pareja: se forman duplas en clase.",
    highlights: ["Progresiones desde cero", "Trabajo de base y volante", "Confianza y comunicación"],
    level: "Todos los niveles · con progresiones",
    duration: "75 min",
    photo: "Maylen sosteniendo a una alumna en un vuelo bajo — plano entero, vertical 3:4",
    aspect: "aspect-[3/4]",
  },
  {
    id: "pilates",
    index: "02",
    name: "Pilates",
    tagline: "El centro que sostiene todo lo demás",
    description:
      "Método clásico en colchoneta, con foco en el centro, la respiración y el control del movimiento. Ideal para recuperar movilidad, corregir postura y construir una fuerza que se nota fuera de la clase: al caminar, al cargar, al respirar.",
    highlights: ["Fuerza profunda de centro", "Cuidado de espalda y postura", "Ritmo controlado, sin impacto"],
    level: "Adaptable · apto para adultos mayores",
    duration: "60 min",
    photo: "Detalle de manos y colchoneta en luz lateral cálida — horizontal 4:3",
    aspect: "aspect-[4/3]",
  },
  {
    id: "vinyasa",
    index: "03",
    name: "Vinyasa",
    tagline: "Movimiento continuo al ritmo de la respiración",
    description:
      "Secuencias fluidas donde cada transición sigue a una inhalación o una exhalación. Es la práctica más dinámica de la casa: entra en calor, moviliza todo el cuerpo y termina en una calma que se queda contigo el resto del día.",
    highlights: ["Secuencias fluidas", "Trabajo cardiovascular suave", "Cierre en meditación guiada"],
    level: "Intermedio · se ofrecen variantes",
    duration: "75 min",
    photo: "Maylen en transición de saludo al sol, contraluz de ventana — vertical 3:4",
    aspect: "aspect-[3/4]",
  },
  {
    id: "iniciacion",
    index: "04",
    name: "Iniciación",
    tagline: "Para quien nunca ha pisado una esterilla",
    description:
      "Una puerta de entrada sin prisa. Aprendemos los nombres, la respiración y las posturas base con todo el tiempo del mundo. Grupos pequeños para que nadie se quede atrás y nadie se sienta observado.",
    highlights: ["Vocabulario y respiración", "Posturas base sin exigencia", "Grupos muy reducidos"],
    level: "Principiantes absolutos",
    duration: "60 min",
    photo: "Esterillas dispuestas en el estudio de casa, luz de mañana — horizontal 16:9",
    aspect: "aspect-[16/9]",
  },
] as const;

/** Grupal vs. privada — la decisión principal del visitante. */
export const formats = [
  {
    id: "grupal",
    name: "Clase grupal",
    subtitle: "En el estudio de casa",
    description:
      "Grupos reducidos en el estudio de Maylen. El espacio es doméstico y cálido a propósito: se practica entre pocas personas, con luz natural y sin espejos.",
    points: [
      "Máximo 6 personas por clase",
      "En el estudio de Maylen, Arequipa",
      "Esterillas y material incluidos",
      "Se coordina el horario por WhatsApp",
    ],
    price: "S/ 35", // ⚠ PLACEHOLDER — confirmar precio real
    priceNote: "por clase suelta",
  },
  {
    id: "privada",
    name: "Sesión privada",
    subtitle: "Uno a uno",
    description:
      "Toda la clase construida alrededor de tu cuerpo, tu historia y tu objetivo. Útil si vienes de una lesión, si te cuesta el ritmo de grupo o si quieres avanzar en algo concreto.",
    points: [
      "Plan diseñado para ti",
      "En el estudio o a domicilio",
      "Horario totalmente flexible",
      "Ideal tras una lesión o en embarazo",
    ],
    price: "S/ 90", // ⚠ PLACEHOLDER — confirmar precio real
    priceNote: "por sesión",
  },
] as const;

/** ⚠ PLACEHOLDER — tarifas inventadas. Confirmar con Maylen antes de publicar. */
export const rates = [
  { label: "Clase suelta", detail: "Grupal, sin compromiso", price: "S/ 35" },
  { label: "Pack de 4 clases", detail: "Válido un mes", price: "S/ 120" },
  { label: "Pack de 8 clases", detail: "Válido dos meses", price: "S/ 220" },
  { label: "Sesión privada", detail: "Uno a uno, 60–75 min", price: "S/ 90" },
] as const;

/** El horario es flexible a propósito — esto es una orientación, no un calendario. */
export const schedule = [
  { days: "Lunes a viernes", time: "07:00 — 09:00", note: "Mañanas" },
  { days: "Lunes a viernes", time: "18:00 — 20:30", note: "Tardes" },
  { days: "Sábados", time: "09:00 — 12:00", note: "Mañana ampliada" },
  { days: "Privadas", time: "A convenir", note: "Horario abierto" },
] as const;

/** ⚠ PLACEHOLDER — testimonios de ejemplo. Reemplazar por reseñas reales. */
export const testimonials = [
  {
    quote:
      "Llegué sin haber hecho yoga nunca y con miedo a no dar la talla. Maylen tiene una manera de corregirte que nunca te hace sentir mal. A los tres meses estaba haciendo cosas que creía imposibles.",
    name: "Lucía R.",
    detail: "Iniciación · 1 año practicando",
  },
  {
    quote:
      "El pilates con Maylen me devolvió la espalda. Tengo 62 años y por fin encontré a alguien que adapta la clase a lo que mi cuerpo puede hacer hoy, no a lo que debería poder.",
    name: "Carmen V.",
    detail: "Pilates · 2 años practicando",
  },
  {
    quote:
      "El acroyoga me enganchó por lo que no esperaba: la confianza. Aprendes a sostener a alguien y a dejarte sostener. Salgo de cada clase riéndome.",
    name: "Diego M.",
    detail: "Yoga acrobático · 8 meses",
  },
] as const;

/** ⚠ PLACEHOLDER — la formación real de Maylen debe reemplazar esta lista. */
export const training = [
  { year: "2016", title: "Primera práctica", detail: "Una clase suelta que no estaba en los planes." },
  { year: "2018", title: "Formación 200h Hatha & Vinyasa", detail: "Yoga Alliance · Lima, Perú" },
  { year: "2020", title: "Certificación en Pilates Mat", detail: "Método clásico · formación presencial" },
  { year: "2022", title: "Formación en Acroyoga", detail: "Bases, vuelos y terapéutica en pareja" },
  { year: "2023", title: "El estudio de casa", detail: "Abre el espacio propio en Arequipa." },
] as const;

/** Los tres principios que ordenan la página "Sobre Maylen". */
export const principles = [
  {
    index: "01",
    title: "El cuerpo de hoy",
    body: "No practicamos con el cuerpo que tuvimos ni con el que queremos tener. Cada clase empieza preguntando cómo llegaste, y la secuencia se ajusta a esa respuesta.",
  },
  {
    index: "02",
    title: "Fuerza sin prisa",
    body: "El acroyoga y el pilates piden fuerza real, y la fuerza real se construye despacio. Progresiones claras, sin saltarse pasos y sin comparar tu semana uno con la semana treinta de otra persona.",
  },
  {
    index: "03",
    title: "Un lugar sin espejos",
    body: "El estudio es una casa, no un gimnasio. No hay espejos ni música alta ni nadie mirando. La atención va hacia adentro porque el espacio está pensado para eso.",
  },
] as const;
