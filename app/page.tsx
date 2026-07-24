import Link from "next/link";
import { Container, Eyebrow, IndexNumber, Section, SectionHeading, Button, TextLink } from "@/components/ui";
import { Reveal, Rule } from "@/components/reveal";
import { PhotoSlot } from "@/components/photo-slot";
import { ArcMark, ClockIcon, MapPinIcon } from "@/components/icons";
import { classes, schedule, testimonials } from "@/lib/content";
import { contact, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════════════
          Móvil: el texto ocupa la primera pantalla completa y la foto llega
          después, a sangre. Escritorio: rejilla asimétrica 7/5 con la foto
          descolgada, para que la columna de texto respire por arriba. */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-44">
        {/* Arco fantasma: el motivo de marca, enorme y casi invisible.
            `.veil` difumina los bordes — un bloque sólido dejaba una costura
            recta atravesando el párrafo en pantallas medianas. */}
        <div
          aria-hidden
          className="veil pointer-events-none absolute -right-1/4 -top-16 -z-10 h-[34rem] w-[34rem] bg-sage-veil sm:h-[42rem] sm:w-[42rem] lg:-right-40 lg:h-[52rem] lg:w-[52rem]"
        />

        <Container size="wide">
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 lg:pt-10">
              <Eyebrow>
                {site.city}, {site.country}
              </Eyebrow>

              <h1 className="mt-8 text-hero font-light">
                <Reveal as="span" className="block">
                  Respira.
                </Reveal>
                <Reveal as="span" delay={110} className="block italic text-terra-deep">
                  Muévete.
                </Reveal>
                <Reveal as="span" delay={220} className="block">
                  Vuelve a ti.
                </Reveal>
              </h1>

              <Reveal
                as="p"
                delay={340}
                className="mt-9 max-w-[44ch] text-lead font-light text-bark-soft md:max-w-[58ch] lg:max-w-[44ch]"
              >
                Soy Maylen. Enseño yoga acrobático, pilates, vinyasa e iniciación en un
                estudio pequeño en {site.city} — grupos de pocas personas y sesiones
                privadas, al ritmo del cuerpo con el que llegues hoy.
              </Reveal>

              <Reveal delay={440} className="mt-11 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Button href="/clases">Ver las clases</Button>
                <Button href="/contacto" variant="outline">
                  Reservar un lugar
                </Button>
              </Reveal>

              {/* Micro-datos: sitúan el negocio sin ocupar espacio */}
              <Reveal delay={540} className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
                {[
                  { icon: MapPinIcon, text: "Estudio propio y a domicilio" },
                  { icon: ClockIcon, text: "Horarios flexibles" },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="flex items-center gap-2.5 font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-sage-deep"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {text}
                  </span>
                ))}
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              {/* En tablet la foto pasa a apaisada y ocupa todo el ancho: a 768px
                  una vertical centrada dejaba media pantalla vacía. */}
              <PhotoSlot
                caption="Retrato de Maylen en el estudio, luz natural lateral, mirada tranquila"
                ratio="aspect-[4/5] md:aspect-[16/10] lg:aspect-[3/4]"
                tone="sage"
                delay={260}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="mx-auto max-w-md md:max-w-none"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ══ BIENVENIDA ════════════════════════════════════════════════════ */}
      <Section tone="sand" className="!pt-24 sm:!pt-32">
        <Container size="narrow">
          <Reveal className="flex justify-center">
            <ArcMark className="h-9 w-9 text-sage" />
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mt-10 text-center font-display text-2xl font-light leading-[1.5] text-bark sm:text-3xl lg:text-[2.1rem]"
          >
            No hace falta tocarse los pies ni saber respirar de una forma especial.
            Hace falta{" "}
            <span className="italic text-terra-deep">llegar</span>. Del resto nos
            encargamos juntas, sin prisa y sin espejos.
          </Reveal>
          <Reveal delay={240} className="mt-10 flex justify-center">
            <TextLink href="/sobre-maylen">Conoce a Maylen</TextLink>
          </Reveal>
        </Container>
      </Section>

      {/* ══ ÍNDICE DE CLASES ══════════════════════════════════════════════
          Un índice tipográfico, no una cuadrícula de tarjetas: cada clase es
          una fila con su número, separada por una línea que se dibuja sola. */}
      <Section tone="deep" id="clases">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Qué practicamos"
                title={
                  <>
                    Cuatro maneras
                    <br />
                    <span className="italic text-terra-deep">de moverse</span>
                  </>
                }
                lead="De la quietud del suelo al vuelo en pareja. Todas comparten lo mismo: progresiones claras y ninguna prisa."
              />
              <Reveal delay={300} className="mt-10 hidden lg:block">
                <Button href="/clases" variant="outline">
                  Todos los detalles
                </Button>
              </Reveal>
            </div>

            <ul className="lg:col-span-7 lg:col-start-6">
              {classes.map((klass, index) => (
                <li key={klass.id}>
                  <Rule delay={index * 70} tone="bark" />
                  <Reveal delay={index * 70 + 60}>
                    <Link
                      href={`/clases#${klass.id}`}
                      className="group flex items-start gap-5 py-7 sm:gap-8 sm:py-9"
                    >
                      <IndexNumber className="pt-1.5 transition-colors duration-500 group-hover:text-terra">
                        {klass.index}
                      </IndexNumber>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-title font-light transition-colors duration-500 group-hover:text-terra-deep">
                          {klass.name}
                        </h3>
                        <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-bark-soft">
                          {klass.tagline}
                        </p>
                        <p className="mt-4 font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-sage-deep">
                          {klass.duration} · {klass.level}
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className="mt-2 hidden font-display text-2xl font-light text-sage-deep transition-transform duration-500 ease-out group-hover:translate-x-1.5 sm:block"
                      >
                        →
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
              <li>
                <Rule delay={classes.length * 70} tone="bark" />
              </li>
            </ul>

            <Reveal delay={200} className="lg:hidden">
              <Button href="/clases" variant="outline" className="w-full sm:w-auto">
                Todos los detalles
              </Button>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ══ TESTIMONIOS ═══════════════════════════════════════════════════ */}
      <Section tone="sand">
        <Container size="wide">
          <SectionHeading
            eyebrow="Quienes practican aquí"
            title={
              <>
                Lo que cuentan
                <br />
                <span className="italic text-terra-deep">de la clase</span>
              </>
            }
            align="center"
            className="mx-auto"
          />

          <ul className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-3 lg:gap-12">
            {testimonials.map((item, index) => (
              <li key={item.name}>
                <Reveal delay={index * 90} as="figure" className="flex h-full flex-col">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-7 w-7 text-sage"
                    fill="currentColor"
                  >
                    <path d="M9.5 6C6.5 7.5 5 10 5 13v5h6v-6H8c0-2 .8-3.4 2.4-4.3L9.5 6Zm9 0C15.5 7.5 14 10 14 13v5h6v-6h-3c0-2 .8-3.4 2.4-4.3L18.5 6Z" />
                  </svg>
                  <blockquote className="mt-6 flex-1 font-display text-xl font-light italic leading-[1.55] text-bark sm:text-[1.35rem]">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-7">
                    <Rule delay={index * 90 + 120} className="max-w-16" />
                    <p className="mt-5 font-sans text-sm font-medium text-bark">{item.name}</p>
                    <p className="mt-1 font-sans text-[0.68rem] font-medium uppercase tracking-[0.2em] text-sage-deep">
                      {item.detail}
                    </p>
                  </figcaption>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ══ HORARIOS ══════════════════════════════════════════════════════
          Orientativo a propósito: el horario real se cierra por WhatsApp. */}
      <Section tone="veil">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Cuándo"
                title={
                  <>
                    Un horario que
                    <br />
                    <span className="italic text-terra-deep">se adapta</span>
                  </>
                }
                lead="Estas son las franjas habituales, no un calendario cerrado. Si ninguna te sirve, escríbeme y buscamos una que sí."
              />
              <Reveal delay={300} className="mt-10">
                <Button href="/contacto">Coordinar un horario</Button>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <dl>
                {schedule.map((slot, index) => (
                  <div key={`${slot.days}-${slot.time}`}>
                    <Rule delay={index * 70} />
                    <Reveal
                      delay={index * 70 + 60}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5 py-6"
                    >
                      <dt className="font-display text-xl font-light text-bark sm:text-2xl">
                        {slot.days}
                        <span className="ml-3 font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-sage-deep">
                          {slot.note}
                        </span>
                      </dt>
                      <dd className="font-sans text-sm font-medium tracking-wide text-bark-soft">
                        {slot.time}
                      </dd>
                    </Reveal>
                  </div>
                ))}
                <Rule delay={schedule.length * 70} />
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* ══ CIERRE ════════════════════════════════════════════════════════ */}
      <Section tone="bark">
        <Container size="narrow" className="text-center">
          <Eyebrow tone="light" className="justify-center">
            Primer paso
          </Eyebrow>
          <Reveal as="h2" delay={100} className="mt-8 text-display font-light">
            La primera clase
            <br />
            <span className="italic text-terra-light">no compromete a nada</span>
          </Reveal>
          <Reveal as="p" delay={200} className="mx-auto mt-7 max-w-[46ch] text-lead font-light text-sand/80">
            Escríbeme y me cuentas cómo está tu cuerpo, qué te gustaría probar y
            cuándo te vendría bien. Sin formularios y sin compromiso.
          </Reveal>
          <Reveal delay={300} className="mt-11 flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center">
            <Button href="/contacto">Escríbeme</Button>
            <Button href="/sobre-maylen" variant="light">
              Sobre Maylen
            </Button>
          </Reveal>
          <Reveal as="p" delay={400} className="mt-10 font-sans text-xs tracking-wide text-sand-muted">
            {contact.neighbourhood}
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
