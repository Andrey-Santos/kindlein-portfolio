import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { ProjectShowcase } from "@/components/project-showcase";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Andrey Kindlein`,
    description: project.about,
    openGraph: { images: [project.cover] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const domain = new URL(project.url).hostname;

  return (
    <>
      <SiteHeader />
      <main className="shell flex-1 pb-24 pt-8 sm:pt-10">
        <ProjectShowcase
          name={project.name}
          domain={domain}
          screens={project.screens}
          cover={project.cover}
          header={
            <>
              <Link
                href="/#projetos"
                className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
                todos os projetos
              </Link>
              <h1 className="mt-6 text-balance font-heading text-4xl font-bold tracking-tight">
                {project.name}
              </h1>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {project.kind}
                {project.own && " · produto próprio"}
              </p>
              {project.concept && (
                <p className="mt-3 inline-block rounded-full border border-border px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-foreground/80">
                  Projeto conceito · não publicado
                </p>
              )}
              <p className="mt-5 text-pretty leading-relaxed text-foreground/80">{project.description}</p>
            </>
          }
          aside={
            <div className="flex flex-col items-start gap-4">
              <WhatsAppCta featured>Quero algo parecido</WhatsAppCta>
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                ver ao vivo: {domain}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          }
          body={
            <>
              <h2 className="font-heading text-2xl font-semibold tracking-tight">Sobre o projeto</h2>
              <p className="mt-4 max-w-prose text-pretty leading-relaxed text-foreground/80">{project.about}</p>
              <p className="mt-6 font-mono text-xs text-muted-foreground">
                Feito com {project.stack.join(" · ")}
              </p>
            </>
          }
          next={
            <Link
              href={`/projetos/${next.slug}`}
              className="group flex items-center justify-between gap-4 border-t border-border pt-5"
            >
              <span>
                <span className="block font-mono text-xs text-muted-foreground">próximo projeto</span>
                <span className="mt-1 block font-heading text-lg font-semibold transition-colors group-hover:text-primary">
                  {next.name}
                </span>
              </span>
              <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
      </main>
      <SiteFooter />
    </>
  );
}
