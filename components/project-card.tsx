import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectCarousel } from "@/components/project-carousel";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  const domain = new URL(project.url).hostname;

  return (
    <div className="group flex w-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50">
      <ProjectCarousel images={project.images} alt={project.name} domain={domain} />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="font-heading text-lg font-semibold">{project.name}</h3>
          {project.own && (
            <span className="font-mono text-xs text-primary">produto próprio</span>
          )}
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
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
          className="mt-1 inline-flex min-h-11 items-center gap-1 self-start text-sm font-medium text-foreground transition-colors hover:text-primary group-hover:text-primary"
        >
          Ver projeto
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
