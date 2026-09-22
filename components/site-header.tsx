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
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
          : "border-transparent bg-transparent"
      }`}
    >
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
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:ml-0"
        >
          Falar no WhatsApp
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </header>
  );
}
