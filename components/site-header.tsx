"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#contato", label: "Contato" },
];

export function SiteHeader() {
  const isHome = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparente so no topo da home (sobre a foto do Hero); rolou, fica solido.
  const solid = !isHome || scrolled;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        solid ? "border-border bg-background" : "border-transparent"
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-gradient-to-b from-background/45 via-background/15 to-transparent transition-opacity duration-300 ${
          solid ? "opacity-0" : ""
        }`}
      />
      {/* Grid 1fr/auto/1fr: marca na esquerda, links no centro exato da tela. */}
      <div className="grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center px-4 font-mono text-xs font-medium text-foreground sm:px-8 sm:text-sm lg:px-10">
        <Link
          href="/"
          className="hidden justify-self-start py-3 text-primary transition-colors hover:text-foreground lg:inline"
        >
          ~/kindlein
        </Link>
        <nav className="col-start-2 flex items-center gap-1 sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-1.5 py-3 transition-colors hover:text-primary sm:px-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
