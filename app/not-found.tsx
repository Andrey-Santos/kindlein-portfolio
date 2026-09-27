import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="shell flex flex-1 flex-col justify-center py-24">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">$</span> cd ./essa-pagina
        </p>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          bash: cd: ./essa-pagina: arquivo ou diretório não encontrado
        </p>
        <h1 className="mt-10 font-heading text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
          404
        </h1>
        <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-foreground/80">
          Essa página não existe (ou mudou de lugar). O resto do portfólio
          continua no mesmo endereço.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-primary/60 hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Voltar pro início
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
