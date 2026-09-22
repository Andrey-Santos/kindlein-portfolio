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
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <nav className="hidden gap-8 font-mono text-sm font-medium text-foreground sm:flex">
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
          href={`https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-hidden={!scrolled}
          tabIndex={scrolled ? 0 : -1}
          className={`ml-auto inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:opacity-90 sm:ml-0 ${
            scrolled
              ? "opacity-100 translate-y-0"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          Falar no WhatsApp
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </header>
  );
}
