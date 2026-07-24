import type { Metadata } from "next";
import { Container, Eyebrow, IndexNumber, Section, SectionHeading, Button } from "@/components/ui";
import { Reveal, Rule } from "@/components/reveal";
import { PhotoSlot } from "@/components/photo-slot";
import { ArcMark } from "@/components/icons";
import { classes, formats, rates } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clases",
  description:
    "Yoga acrobático, pilates, vinyasa e iniciación en Arequipa. Clases grupales de máximo 6 personas en estudio propio y sesiones privadas uno a uno.",
  alternates: { canonical: "/clases" },
};

const tones = ["sage", "terra", "dusk", "sand"] as const;

export default function ClassesPage() {
  return (
    <>
      {/* ══ CABECERA ══════════════════════════════════════════════════════ */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Las clases</Eyebrow>
              <Reveal as="h1" delay={90} className="mt-8 text-display font-light">
                Cuatro prácticas,
                <br />
                <span className="italic text-terra-deep">un mismo cuidado</span>
              </Reveal>
            </div>
            <Reveal
              as="p"
              delay={200}
              className="text-lead font-light text-bark-soft lg:col-span-5"
            >
              Todas se dan en {site.city}: en grupos reducidos en el estudio de casa o
              en sesiones privadas. Elige por lo que te llame, no por lo que creas que
              puedes hacer.
            </Reveal>
          </div>
          <Rule delay={280} className="mt-14" />
        </Container>
      </section>

      {/* ══ DETALLE DE CADA CLASE ═════════════════════════════════════════
          Filas alternadas: en móvil siempre foto → texto; en escritorio se
          intercalan para que la vista baje en zigzag. */}
      <Section tone="sand" className="!pt-4">
        <Container size="wide">
          <div className="space-y-24 sm:space-y-32 lg:space-y-44">
            {classes.map((klass, index) => {
              const flipped = index % 2 === 1;

              return (
                <article
                  key={klass.id}
                  id={klass.id}
                  style={{ scrollMarginTop: "6rem" }}
                  className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16"
                >
                  <div
                    className={`lg:col-span-5 ${flipped ? "lg:order-2 lg:col-start-8" : ""}`}
                  >
                    <PhotoSlot
                      caption={klass.photo}
                      ratio={klass.aspect}
                      tone={tones[index]}
                      delay={60}
                      className="mx-auto max-w-md lg:max-w-none"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>

                  <div className={`lg:col-span-6 ${flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                    <Reveal className="flex items-center gap-4">
                      <IndexNumber>{klass.index}</IndexNumber>
                      <span aria-hidden className="h-px w-10 bg-sage/50" />
                      <span className="font-sans text-[0.66rem] font-medium uppercase tracking-[0.22em] text-sage-deep">
                        {klass.duration}
                      </span>
                    </Reveal>

                    <Reveal as="h2" delay={80} className="mt-5 text-title font-light">
                      {klass.name}
                    </Reveal>

                    <Reveal
                      as="p"
                      delay={140}
                      className="mt-3 font-display text-xl font-light italic text-terra-deep sm:text-2xl"
                    >
                      {klass.tagline}
                    </Reveal>

                    <Reveal as="p" delay={200} className="mt-7 max-w-[52ch] leading-relaxed text-bark-soft">
                      {klass.description}
                    </Reveal>

                    <ul className="mt-9 space-y-0">
                      {klass.highlights.map((point, pointIndex) => (
                        <li key={point}>
                          <Rule delay={260 + pointIndex * 60} />
                          <Reveal
                            delay={300 + pointIndex * 60}
                            className="flex items-center gap-3.5 py-3.5"
                          >
                            <ArcMark className="h-4 w-4 shrink-0 text-sage" />
                            <span className="text-sm text-bark">{point}</span>
                          </Reveal>
                        </li>
                      ))}
                      <li>
                        <Rule delay={260 + klass.highlights.length * 60} />
                      </li>
                    </ul>

                    <Reveal delay={480} className="mt-7">
                      <p className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.2em] text-bark-soft">
                        Nivel · {klass.level}
                      </p>
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ══ GRUPAL vs PRIVADA ═════════════════════════════════════════════ */}
      <Section tone="deep">
        <Container size="wide">
          <SectionHeading
            eyebrow="Cómo practicar"
            title={
              <>
                En grupo pequeño
                <br />
                <span className="italic text-terra-deep">o sólo para ti</span>
              </>
            }
            lead="La misma profesora y el mismo cuidado; cambia la compañía y el ritmo."
            align="center"
            className="mx-auto"
          />

          <div className="mt-16 grid gap-6 sm:mt-20 lg:grid-cols-2 lg:gap-8">
            {formats.map((format, index) => (
              <Reveal
                key={format.id}
                delay={index * 110}
                as="article"
                className="flex flex-col rounded-[1.75rem] border border-sage/35 bg-sand-veil p-8 sm:p-10"
              >
                <p className="font-sans text-[0.66rem] font-medium uppercase tracking-[0.22em] text-sage-deep">
                  {format.subtitle}
                </p>
                <h3 className="mt-4 text-title font-light">{format.name}</h3>
                <p className="mt-5 leading-relaxed text-bark-soft">{format.description}</p>

                <ul className="mt-8 flex-1 space-y-3.5">
                  {format.points.map((point) => (
                    <li key={point} className="flex items-start gap-3.5">
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terra"
                      />
                      <span className="text-sm leading-relaxed text-bark">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex items-baseline gap-2.5 border-t border-sage/35 pt-7">
                  <span className="font-display text-3xl font-light lining-nums text-bark">
                    {format.price}
                  </span>
                  <span className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em] text-bark-soft">
                    {format.priceNote}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ══ TARIFAS ═══════════════════════════════════════════════════════ */}
      <Section tone="sand">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Tarifas"
                title={
                  <>
                    Precios
                    <br />
                    <span className="italic text-terra-deep">claros</span>
                  </>
                }
                lead="Sin matrícula, sin permanencia y sin cuotas mensuales. Se paga por lo que se practica."
              />
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <dl>
                {rates.map((rate, index) => (
                  <div key={rate.label}>
                    <Rule delay={index * 70} />
                    <Reveal
                      delay={index * 70 + 60}
                      className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-6"
                    >
                      <div>
                        <dt className="font-display text-xl font-light text-bark sm:text-2xl">
                          {rate.label}
                        </dt>
                        <p className="mt-1 font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em] text-sage-deep">
                          {rate.detail}
                        </p>
                      </div>
                      <dd className="font-display text-2xl font-light lining-nums text-terra-deep">
                        {rate.price}
                      </dd>
                    </Reveal>
                  </div>
                ))}
                <Rule delay={rates.length * 70} />
              </dl>

              <Reveal delay={rates.length * 70 + 100} className="mt-8">
                <p className="max-w-[54ch] text-sm leading-relaxed text-bark-soft">
                  Las clases a domicilio pueden tener un costo adicional según la zona
                  de {site.city}. Si el precio es un obstáculo, escríbeme igual: casi
                  siempre encontramos la manera.
                </p>
              </Reveal>

              <Reveal delay={rates.length * 70 + 180} className="mt-10">
                <Button href="/contacto">Reservar un lugar</Button>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
