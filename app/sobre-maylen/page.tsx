import type { Metadata } from "next";
import { Container, Eyebrow, IndexNumber, Section, SectionHeading, Button } from "@/components/ui";
import { Reveal, Rule } from "@/components/reveal";
import { PhotoSlot } from "@/components/photo-slot";
import { ArcMark } from "@/components/icons";
import { principles, training } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre Maylen",
  description:
    "La historia, la formación y la filosofía de enseñanza de Maylen Aguedo, instructora de yoga y pilates en Arequipa, Perú.",
  alternates: { canonical: "/sobre-maylen" },
};

export default function AboutPage() {
  return (
    <>
      {/* ══ CABECERA ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-44">
        <div
          aria-hidden
          className="veil pointer-events-none absolute -left-1/3 top-24 -z-10 h-[32rem] w-[32rem] bg-sand-deep sm:h-[38rem] sm:w-[38rem] lg:-left-48 lg:h-[46rem] lg:w-[46rem]"
        />

        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5 lg:order-2">
              <PhotoSlot
                caption="Retrato de Maylen — medio cuerpo, sonrisa natural, fondo del estudio desenfocado"
                ratio="aspect-[4/5]"
                tone="terra"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="mx-auto max-w-md lg:max-w-none"
              />
            </div>

            <div className="lg:col-span-6 lg:order-1">
              <Eyebrow>Sobre mí</Eyebrow>
              <Reveal as="h1" delay={90} className="mt-8 text-display font-light">
                Maylen
                <br />
                <span className="italic text-terra-deep">Aguedo</span>
              </Reveal>
              <Reveal
                as="p"
                delay={190}
                className="mt-8 max-w-[46ch] text-lead font-light text-bark-soft"
              >
                Instructora de yoga y pilates en {site.city}. Llevo casi una década
                practicando y varios años enseñando en un estudio que es, literalmente,
                mi casa.
              </Reveal>
              <Rule delay={280} className="mt-11 max-w-32" />
            </div>
          </div>
        </Container>
      </section>

      {/* ══ HISTORIA ══════════════════════════════════════════════════════
          Texto placeholder en el tono de la marca — Maylen puede reescribirlo
          entero en lib/content.ts sin tocar el diseño. */}
      <Section tone="sand">
        <Container size="narrow">
          <Eyebrow>La historia</Eyebrow>

          <Reveal as="p" delay={90} className="mt-9 text-lead font-light leading-[1.75] text-bark">
            Empecé por la espalda. Trabajaba sentada muchas horas y llegué a una clase
            de yoga buscando, sinceramente, que se me quitara un dolor. Me quedé por
            otra cosa: por la hora al día en la que nadie me pedía nada.
          </Reveal>

          <Reveal as="p" delay={160} className="mt-7 leading-[1.85] text-bark-soft">
            Lo que vino después fue lento y nada espectacular. Practiqué mucho antes de
            enseñar nada. Me formé en hatha y vinyasa, después en pilates —que me dio el
            vocabulario que me faltaba para hablar del centro y de la postura— y por
            último en acroyoga, que me devolvió algo que no esperaba encontrar en una
            esterilla: jugar. Aprender a sostener a alguien y a dejarme sostener cambió
            mi forma de enseñar más que cualquier certificación.
          </Reveal>

          <Reveal as="p" delay={230} className="mt-7 leading-[1.85] text-bark-soft">
            Hoy doy clase en {site.city}, en un estudio pequeño que armé en casa.
            Cabemos seis y eso me gusta: puedo verte, puedo corregirte por tu nombre y
            puedo cambiar la secuencia entera si el grupo llegó cansado. También doy
            sesiones privadas, sobre todo a personas que vienen de una lesión o que
            prefieren empezar sin público.
          </Reveal>

          <Reveal
            as="blockquote"
            delay={300}
            className="mt-14 border-l border-sage/50 pl-7 font-display text-2xl font-light italic leading-[1.5] text-bark sm:text-[1.75rem]"
          >
            Enseño para que la clase te sirva el martes por la tarde, cuando cargues las
            bolsas o te agaches a atarte los zapatos. Lo demás es decoración.
          </Reveal>
        </Container>
      </Section>

      {/* ══ FILOSOFÍA ═════════════════════════════════════════════════════ */}
      <Section tone="veil">
        <Container size="wide">
          <SectionHeading
            eyebrow="Cómo enseño"
            title={
              <>
                Tres cosas que
                <br />
                <span className="italic text-terra-deep">no negocio</span>
              </>
            }
          />

          <ul className="mt-16 grid gap-x-10 gap-y-12 sm:mt-20 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <li key={principle.index}>
                <Rule delay={index * 90} />
                <Reveal delay={index * 90 + 70} className="pt-8">
                  <IndexNumber>{principle.index}</IndexNumber>
                  <h3 className="mt-5 text-title font-light">{principle.title}</h3>
                  <p className="mt-5 leading-relaxed text-bark-soft">{principle.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ══ FORMACIÓN ═════════════════════════════════════════════════════ */}
      <Section tone="sand">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Trayectoria"
                title={
                  <>
                    Formación
                    <br />
                    <span className="italic text-terra-deep">y camino</span>
                  </>
                }
                lead="Nada de esto llegó de golpe. Éstos son los años que hay detrás de la clase de hoy."
              />
              <div className="mt-12 hidden lg:block">
                <PhotoSlot
                  caption="Detalle: manos de Maylen ajustando una postura — horizontal 4:3"
                  ratio="aspect-[4/3]"
                  tone="sand"
                  sizes="30vw"
                />
              </div>
            </div>

            <ol className="lg:col-span-7 lg:col-start-6">
              {training.map((item, index) => (
                <li key={item.year}>
                  <Rule delay={index * 70} />
                  <Reveal
                    delay={index * 70 + 60}
                    className="flex flex-col gap-1.5 py-7 sm:flex-row sm:gap-10"
                  >
                    <span className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-terra-deep sm:w-16 sm:shrink-0 sm:pt-2">
                      {item.year}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-light text-bark sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-bark-soft">
                        {item.detail}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
              <li>
                <Rule delay={training.length * 70} />
              </li>
            </ol>
          </div>
        </Container>
      </Section>

      {/* ══ CIERRE ════════════════════════════════════════════════════════ */}
      <Section tone="bark">
        <Container size="narrow" className="text-center">
          <Reveal className="flex justify-center">
            <ArcMark className="h-9 w-9 text-sage-light" />
          </Reveal>
          <Reveal as="h2" delay={110} className="mt-9 text-display font-light">
            ¿Nos conocemos
            <br />
            <span className="italic text-terra-light">en una clase?</span>
          </Reveal>
          <Reveal as="p" delay={210} className="mx-auto mt-7 max-w-[44ch] text-lead font-light text-sand/80">
            Escríbeme sin compromiso. Me cuentas dónde estás y vemos juntas por dónde
            empezar.
          </Reveal>
          <Reveal delay={300} className="mt-11 flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center">
            <Button href="/contacto">Hablemos</Button>
            <Button href="/clases" variant="light">
              Ver las clases
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
