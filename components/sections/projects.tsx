import { ProjectCard } from "@/components/project-card";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section
      id="projetos"
      className="flex min-h-[calc(100svh-4rem)] snap-start scroll-mt-16 flex-col justify-center"
    >
      <div className="shell py-16">
        <div className="reveal">
          <p className="font-mono text-sm text-primary">
            <span className="text-muted-foreground">$</span> projetos
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Projetos entregues
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
          {projects.map((project) => (
            <div key={project.name} className="reveal flex">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        <div className="reveal mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-foreground/80">Precisa de algo parecido?</p>
          <WhatsAppCta />
        </div>
      </div>
    </section>
  );
}
