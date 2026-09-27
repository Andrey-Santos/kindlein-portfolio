import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { SiteGlow } from "@/components/site-glow";
import { SlideScroll } from "@/components/slide-scroll";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "@/lib/site";
import { contact } from "@/lib/data";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  style: ["normal", "italic"],
});


const description =
  "Andrey Kindlein desenvolve sites institucionais, e-commerce e sistemas sob medida — estoque, financeiro, automações — pra pequenas empresas.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Andrey Kindlein — Sites e sistemas sob medida",
  description,
  keywords: [
    "desenvolvimento web",
    "sites sob medida",
    "e-commerce",
    "sistemas para pequenas empresas",
    "Next.js",
    "desenvolvedor web",
  ],
  openGraph: {
    title: "Andrey Kindlein — Sites e sistemas sob medida",
    description,
    url: siteUrl,
    siteName: "Andrey Kindlein",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrey Kindlein — Sites e sistemas sob medida",
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kindlein — Andrey Kindlein",
  description,
  url: siteUrl,
  image: `${siteUrl}/opengraph-image.jpg`,
  email: contact.email,
  telephone: "+55 47 98876-2959",
  founder: { "@type": "Person", name: "Andrey Kindlein" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rio do Sul",
    addressRegion: "SC",
    addressCountry: "BR",
  },
  areaServed: "BR",
  sameAs: [contact.linkedin, contact.github],
  knowsAbout: ["Sites institucionais", "E-commerce", "Sistemas de gestão", "Automações"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${jetbrainsMono.variable} h-full scroll-pt-16 snap-y snap-mandatory antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-background text-foreground">
        <SiteGlow />
        <SlideScroll />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-40 h-40 bg-gradient-to-b from-background/70 via-background/25 to-transparent"
        />
        {children}
        <script
          type="application/ld+json"
          // Dados estruturados pro Google: profissional local em Rio do Sul.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
