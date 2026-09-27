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
  const [active, setActive] = useState<string | null>(isHome ? null : "/#projetos");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (!isHome) return;
      // Secao atual = a ultima cujo topo ja passou de 40% da tela.
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const item of navItems) {
        const el = document.getElementById(item.href.slice(2));
        if (el && el.getBoundingClientRect().top <= line) current = item.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Transparente so no topo da home (sobre a foto do Hero); rolou, fica solido.
  // Tom mais escuro que o fundo da pagina, senao o "solido" parece transparente.
  const solid = !isHome || scrolled;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        solid ? "border-white/10 bg-[#08090c]/90 backdrop-blur-md" : "border-transparent"
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
              aria-current={active === item.href ? "location" : undefined}
              className={`relative px-1.5 py-3 transition-colors hover:text-primary sm:px-0 ${
                active === item.href ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-1.5 bottom-1.5 h-px bg-primary transition-opacity sm:inset-x-0 ${
                  active === item.href ? "opacity-100" : "opacity-0"
                }`}
              />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
