import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projetos" className="snap-start scroll-mt-16">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="font-mono text-sm text-primary">
          <span className="text-muted-foreground">$</span> projetos
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
          Projetos entregues
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
