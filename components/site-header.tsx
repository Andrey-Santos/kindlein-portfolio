import Link from "next/link";

const navItems = [
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#contato", label: "Contato" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-transparent">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background/45 via-background/15 to-transparent"
      />
      {/* Grid 1fr/auto/1fr: marca na esquerda, links no centro exato da tela. */}
      <div className="grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center px-4 font-mono text-xs font-medium text-foreground sm:px-8 sm:text-sm lg:px-10">
        <Link
          href="#top"
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
