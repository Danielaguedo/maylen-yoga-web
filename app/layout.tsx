import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

/* Display: alto contraste, elegante, con cursiva para los acentos. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Cuerpo: humanista, cálida, muy legible en pantallas pequeñas. */
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Yoga y pilates en ${site.city}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "yoga Arequipa",
    "yoga acrobático Arequipa",
    "acroyoga Arequipa",
    "pilates Arequipa",
    "vinyasa Arequipa",
    "yoga para principiantes",
    "clases privadas de yoga",
    "Maylen Aguedo",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Yoga y pilates en ${site.city}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Yoga y pilates en ${site.city}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
  colorScheme: "light",
  /* Sin `maximumScale`: el zoom nunca se bloquea. */
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-PE"
      className={`${cormorant.variable} ${workSans.variable} h-full antialiased`}
    >
      <head>
        {/* Si el JS falla o está desactivado, el contenido se muestra igual. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;clip-path:none!important;transform:none!important}[data-rule]{transform:scaleX(1)!important}[data-arch-inner]{transform:scale(1)!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-sand">
        <a
          href="#contenido"
          className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-terra focus:px-5 focus:py-3 focus:font-sans focus:text-sm focus:font-medium focus:uppercase focus:tracking-[0.16em] focus:text-white"
        >
          Saltar al contenido
        </a>

        <SiteHeader />

        <main id="contenido" className="flex-1">
          {children}
        </main>

        <SiteFooter />

        {/* Datos estructurados: ayuda a que Maylen aparezca en búsquedas locales. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HealthAndBeautyBusiness",
              name: site.name,
              description: site.description,
              url: site.url,
              address: {
                "@type": "PostalAddress",
                addressLocality: site.city,
                addressCountry: "PE",
              },
              areaServed: site.city,
              knowsAbout: ["Acroyoga", "Pilates", "Vinyasa Yoga", "Yoga para principiantes"],
            }),
          }}
        />
      </body>
    </html>
  );
}
