"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contact } from "@/lib/data";

const navItems = [
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#contato", label: "Contato" },
];

const whatsappMessage = encodeURIComponent(
  "Olá! Vi seu portfólio e quero conversar sobre um projeto."
);
const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-transparent">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background/45 via-background/15 to-transparent"
      />
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <nav className="flex gap-3 font-mono text-xs font-medium text-foreground sm:gap-8 sm:text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex shrink-0 translate-y-0 items-center gap-2 rounded-full border border-primary/40 bg-card px-3 py-2 text-xs font-medium text-primary opacity-100 transition-all duration-300 hover:bg-primary/10 sm:px-4 sm:text-sm ${
            scrolled
              ? "sm:opacity-100 sm:translate-y-0"
              : "sm:pointer-events-none sm:-translate-y-2 sm:opacity-0"
          }`}
        >
          <span className="hidden sm:inline">Falar no WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </header>
  );
}
