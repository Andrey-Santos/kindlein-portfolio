import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { SiteGlow } from "@/components/site-glow";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://kindlein.business";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${jetbrainsMono.variable} h-full snap-y snap-proximity antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-background text-foreground">
        <SiteGlow />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-40 h-40 bg-gradient-to-b from-background/70 via-background/25 to-transparent"
        />
        {children}
      </body>
    </html>
  );
}
