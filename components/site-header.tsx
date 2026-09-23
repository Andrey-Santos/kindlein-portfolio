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
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-center gap-1 px-4 font-mono text-xs font-medium text-foreground sm:gap-6 sm:px-12 sm:text-sm md:px-16 lg:px-24">
        <Link
          href="#top"
          className="mr-4 hidden py-3 text-primary transition-colors hover:text-foreground lg:inline"
        >
          ~/kindlein
        </Link>
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
    </header>
  );
}
