import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectCarousel } from "@/components/project-carousel";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50">
      <ProjectCarousel images={project.images} alt={project.name} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-heading text-lg font-semibold">{project.name}</h3>
        <p className="flex-1 text-sm text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="border-primary/30 font-mono text-xs font-normal text-primary"
            >
              {tech}
            </Badge>
          ))}
        </div>
        <Link
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary"
        >
          Ver projeto
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
