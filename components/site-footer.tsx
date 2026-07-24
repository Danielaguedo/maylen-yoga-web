import Link from "next/link";
import { ArcMark, InstagramIcon, MailIcon, MapPinIcon, WhatsAppIcon } from "./icons";
import { Container } from "./ui";
import { contact, nav, site, whatsappUrl } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bark text-sand">
      <Container size="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Marca */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <ArcMark className="h-6 w-6 text-sage-light" />
              <span className="font-display text-xl font-normal tracking-tight">
                Maylen Aguedo
              </span>
            </div>
            <p className="mt-5 max-w-[32ch] font-display text-2xl font-light italic leading-snug text-sand/90">
              Respira. Muévete. Vuelve a ti.
            </p>
            <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-sand-muted">
              Yoga acrobático, pilates, vinyasa e iniciación en {site.city}, {site.country}.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página" className="lg:col-span-3">
            <h2 className="font-sans text-[0.66rem] font-medium uppercase tracking-[0.24em] text-sage-light">
              Navegación
            </h2>
            <ul className="mt-4 space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-draw inline-flex min-h-11 items-center font-display text-lg font-light text-sand transition-colors duration-300 hover:text-sage-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <h2 className="font-sans text-[0.66rem] font-medium uppercase tracking-[0.24em] text-sage-light">
              Contacto
            </h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 items-center gap-3 text-sand transition-colors duration-300 hover:text-terra-light"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px] shrink-0 text-sage-light transition-colors duration-300 group-hover:text-terra-light" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex min-h-11 items-center gap-3 break-all text-sand transition-colors duration-300 hover:text-terra-light"
                >
                  <MailIcon className="h-[18px] w-[18px] shrink-0 text-sage-light transition-colors duration-300 group-hover:text-terra-light" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 items-center gap-3 text-sand transition-colors duration-300 hover:text-terra-light"
                >
                  <InstagramIcon className="h-[18px] w-[18px] shrink-0 text-sage-light transition-colors duration-300 group-hover:text-terra-light" />
                  {contact.instagramHandle}
                </a>
              </li>
              <li className="flex min-h-11 items-center gap-3 text-sand-muted">
                <MapPinIcon className="h-[18px] w-[18px] shrink-0 text-sage-light" />
                {contact.neighbourhood}
              </li>
            </ul>
          </div>

          {/* Instagram — cuadrícula reservada para fotos reales */}
          <div className="lg:col-span-2">
            <h2 className="font-sans text-[0.66rem] font-medium uppercase tracking-[0.24em] text-sage-light">
              En Instagram
            </h2>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 grid grid-cols-3 gap-1.5 sm:max-w-[13rem] lg:max-w-none"
              aria-label={`Ver el Instagram de Maylen, ${contact.instagramHandle}`}
            >
              {/* ZONA DE FOTOS: sustituir por las 6 últimas publicaciones.
                  Con forma de arco y con la marca dentro, para que se lean como
                  huecos intencionados y no como imágenes rotas. */}
              {Array.from({ length: 6 }).map((_, index) => (
                <span
                  key={index}
                  data-photo-slot="Miniatura de Instagram — cuadrada 1:1"
                  className="flex aspect-square items-center justify-center rounded-t-full rounded-b-[3px] border border-sand/15 bg-sand/[0.06] transition-colors duration-500 ease-out hover:border-sage-light/50 hover:bg-sage-light/15"
                >
                  <ArcMark className="h-4 w-4 text-sage-light/45" />
                </span>
              ))}
            </a>
            <p className="mt-4 text-xs leading-relaxed text-sand-muted">
              Próximamente: fotos del estudio y de clase.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-sand/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-sand-muted">
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-sand-muted">
            Hecho con calma en {site.city}, {site.country}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
