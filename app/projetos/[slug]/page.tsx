import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
          header={
            <>
              <Link
                href="/#projetos"
                className="inline-flex min-h-11 items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-4" />
                todos os projetos
              </Link>
              <p className="mt-6 font-mono text-sm text-primary">
                <span className="text-muted-foreground">$</span> projetos/{project.slug}
              </p>
              <h1 className="mt-3 text-balance font-heading text-4xl font-bold tracking-tight">
                {project.name}
              </h1>
              {project.own && (
                <p className="mt-2 font-mono text-xs text-primary">produto próprio · em produção</p>
              )}
              {project.concept && (
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  projeto conceito · não foi publicado pelo cliente
                </p>
              )}
            </>
          }
          meta={
            <>
              <p className="text-pretty leading-relaxed text-foreground/80">{project.about}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="border-border font-mono text-xs font-normal text-muted-foreground"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-sm text-foreground transition-colors hover:text-primary"
              >
                {domain}
                <ArrowUpRight className="size-4" />
              </Link>
            </>
          }
          cta={<WhatsAppCta>Quero algo parecido</WhatsAppCta>}
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
