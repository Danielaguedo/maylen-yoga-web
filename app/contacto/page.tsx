import type { Metadata } from "next";
import { Container, Eyebrow, IndexNumber, Section, SectionHeading } from "@/components/ui";
import { Reveal, Rule } from "@/components/reveal";
import { PhotoSlot } from "@/components/photo-slot";
import {
  ArrowIcon,
  ClockIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { contact, site, whatsappUrl } from "@/lib/site";
import { schedule } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbele a Maylen Aguedo por WhatsApp, teléfono o correo para reservar una clase de yoga o pilates en Arequipa.",
  alternates: { canonical: "/contacto" },
};

/**
 * Los cuatro caminos, en orden de preferencia real: WhatsApp primero.
 *
 * `numeric` marca los valores que se componen en la tipografía de texto:
 * Cormorant usa cifras elzevirianas y el «1» se lee como una «I», así que un
 * número de teléfono en la display se leía «+5I 999 999 999».
 */
const channels = [
  {
    id: "whatsapp",
    index: "01",
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: contact.phoneDisplay,
    note: "La vía más rápida — normalmente respondo el mismo día.",
    href: whatsappUrl(),
    external: true,
    featured: true,
    numeric: true,
  },
  {
    id: "telefono",
    index: "02",
    icon: PhoneIcon,
    label: "Teléfono",
    value: contact.phoneDisplay,
    note: "Si prefieres hablar. Mejor fuera del horario de clases.",
    href: `tel:${contact.phoneHref}`,
    external: false,
    featured: false,
    numeric: true,
  },
  {
    id: "correo",
    index: "03",
    icon: MailIcon,
    label: "Correo",
    value: contact.email,
    note: "Para consultas largas, empresas o grupos cerrados.",
    href: `mailto:${contact.email}`,
    external: false,
    featured: false,
    numeric: false,
  },
  {
    id: "instagram",
    index: "04",
    icon: InstagramIcon,
    label: "Instagram",
    value: contact.instagramHandle,
    note: "Fotos del estudio, secuencias y avisos de horario.",
    href: contact.instagramUrl,
    external: true,
    featured: false,
    numeric: false,
  },
] as const;

const steps = [
  {
    index: "01",
    title: "Me escribes",
    body: "Cuéntame qué te interesa, si has practicado antes y qué días te vendrían bien. No hace falta más.",
  },
  {
    index: "02",
    title: "Ajustamos",
    body: "Te digo qué grupo encaja o proponemos una sesión privada. Si tienes una lesión o una duda médica, hablamos de eso primero.",
  },
  {
    index: "03",
    title: "Vienes",
    body: "Te paso la dirección exacta y qué traer. Ropa cómoda y poco más: las esterillas están aquí.",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      {/* ══ CABECERA ══════════════════════════════════════════════════════ */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Contacto</Eyebrow>
              <Reveal as="h1" delay={90} className="mt-8 text-display font-light">
                Escríbeme y
                <br />
                <span className="italic text-terra-deep">empezamos</span>
              </Reveal>
            </div>
            <Reveal as="p" delay={200} className="text-lead font-light text-bark-soft lg:col-span-5">
              Todavía no hay sistema de reservas online — y no hace falta. Un mensaje
              basta para coordinar tu primera clase.
            </Reveal>
          </div>
          <Rule delay={280} className="mt-14" />
        </Container>
      </section>

      {/* ══ CANALES ═══════════════════════════════════════════════════════
          En móvil son filas altas (≥76px) de ancho completo: el pulgar no
          tiene que apuntar. WhatsApp va destacado por ser el canal real. */}
      <Section tone="sand" className="!pt-4">
        <Container size="wide">
          <ul className="grid gap-4 lg:grid-cols-2 lg:gap-5">
            {channels.map((channel, index) => {
              const Icon = channel.icon;

              return (
                <li key={channel.id} className={channel.featured ? "lg:col-span-2" : ""}>
                  <Reveal delay={index * 80}>
                    <a
                      href={channel.href}
                      {...(channel.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={`group flex min-h-[5.5rem] items-center gap-5 rounded-[1.5rem] p-6 transition-colors duration-300 ease-out sm:gap-7 sm:p-8 ${
                        channel.featured
                          ? "bg-terra text-white hover:bg-terra-deep"
                          : "border border-sage/35 bg-sand-veil text-bark hover:border-sage/70 hover:bg-sage-veil/60"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 shrink-0 sm:h-7 sm:w-7 ${
                          channel.featured ? "text-white" : "text-sage-deep"
                        }`}
                      />

                      <div className="min-w-0 flex-1">
                        {/* Full-strength white: at 11px, white/75 on terracotta
                            falls to 3.43:1 and misses AA. Hierarchy comes from
                            size and tracking instead of opacity. */}
                        <p
                          className={`font-sans text-[0.66rem] font-medium uppercase tracking-[0.22em] ${
                            channel.featured ? "text-white" : "text-sage-deep"
                          }`}
                        >
                          {channel.label}
                        </p>
                        <p
                          className={`mt-1.5 truncate font-light ${
                            channel.numeric
                              ? "font-sans tabular-nums tracking-tight"
                              : "font-display"
                          } ${channel.featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}
                        >
                          {channel.value}
                        </p>
                        <p
                          className={`mt-2 text-sm leading-relaxed ${
                            channel.featured ? "text-white" : "text-bark-soft"
                          }`}
                        >
                          {channel.note}
                        </p>
                      </div>

                      <ArrowIcon
                        className={`h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1.5 ${
                          channel.featured ? "text-white" : "text-sage"
                        }`}
                      />
                    </a>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* ══ CÓMO FUNCIONA ═════════════════════════════════════════════════ */}
      <Section tone="deep">
        <Container size="wide">
          <SectionHeading
            eyebrow="Cómo funciona"
            title={
              <>
                Tres mensajes
                <br />
                <span className="italic text-terra-deep">y ya estás dentro</span>
              </>
            }
          />

          <ol className="mt-16 grid gap-x-10 gap-y-12 sm:mt-20 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.index}>
                <Rule delay={index * 90} tone="bark" />
                <Reveal delay={index * 90 + 70} className="pt-8">
                  <IndexNumber>{step.index}</IndexNumber>
                  <h3 className="mt-5 text-title font-light">{step.title}</h3>
                  <p className="mt-5 leading-relaxed text-bark-soft">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ══ EL ESTUDIO ════════════════════════════════════════════════════ */}
      <Section tone="sand">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <PhotoSlot
                caption="El estudio de casa: esterillas, planta y luz de ventana — horizontal 4:3"
                ratio="aspect-[4/3]"
                tone="sage"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="mx-auto max-w-lg lg:max-w-none"
              />
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <SectionHeading
                eyebrow="El estudio"
                title={
                  <>
                    Una casa,
                    <br />
                    <span className="italic text-terra-deep">no un gimnasio</span>
                  </>
                }
                lead={`El estudio está en ${contact.neighbourhood}. Comparto la dirección exacta por WhatsApp cuando confirmamos la clase — es mi casa, y prefiero que sea así.`}
              />

              <dl className="mt-12">
                <Rule />
                <Reveal delay={60} className="flex items-start gap-4 py-6">
                  <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-sage" />
                  <div>
                    <dt className="font-sans text-[0.66rem] font-medium uppercase tracking-[0.22em] text-sage-deep">
                      Dónde
                    </dt>
                    <dd className="mt-1.5 text-bark">
                      {contact.neighbourhood} · {site.country}
                    </dd>
                    <dd className="mt-1 text-sm text-bark-soft">
                      También voy a domicilio para sesiones privadas.
                    </dd>
                  </div>
                </Reveal>

                <Rule delay={100} />
                <Reveal delay={160} className="flex items-start gap-4 py-6">
                  <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-sage" />
                  <div>
                    <dt className="font-sans text-[0.66rem] font-medium uppercase tracking-[0.22em] text-sage-deep">
                      Cuándo
                    </dt>
                    <dd className="mt-2 space-y-1 text-sm text-bark">
                      {schedule.map((slot) => (
                        <p key={`${slot.days}-${slot.time}`}>
                          <span className="text-bark-soft">{slot.days}</span> · {slot.time}
                        </p>
                      ))}
                    </dd>
                  </div>
                </Reveal>
                <Rule delay={200} />
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* ══ CIERRE ════════════════════════════════════════════════════════ */}
      <Section tone="bark">
        <Container size="narrow" className="text-center">
          <Eyebrow tone="light" className="justify-center">
            Un último empujón
          </Eyebrow>
          <Reveal as="h2" delay={100} className="mt-8 text-display font-light">
            Da igual desde
            <br />
            <span className="italic text-terra-light">dónde empieces</span>
          </Reveal>
          <Reveal as="p" delay={200} className="mx-auto mt-7 max-w-[44ch] text-lead font-light text-sand/80">
            Todo el mundo tuvo una primera clase en la que no sabía nada. La tuya puede
            ser esta semana.
          </Reveal>
          <Reveal delay={300} className="mt-11 flex justify-center">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-terra px-8 font-sans text-[0.82rem] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-terra-deep"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              Escríbeme por WhatsApp
              <ArrowIcon className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </a>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
