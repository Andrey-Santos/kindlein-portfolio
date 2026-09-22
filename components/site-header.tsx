"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-hidden={!scrolled}
          tabIndex={scrolled ? 0 : -1}
          className={`ml-auto hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:opacity-90 sm:ml-0 sm:inline-flex ${
            scrolled
              ? "opacity-100 translate-y-0"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          Falar no WhatsApp
          <ArrowRight className="size-4" />
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className="ml-auto rounded-md border border-border bg-background/60 p-2 text-foreground backdrop-blur sm:hidden"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur sm:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4 font-mono text-base font-medium text-foreground">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-2 py-3 transition-colors hover:bg-card hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
            >
              Falar no WhatsApp
              <ArrowRight className="size-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
