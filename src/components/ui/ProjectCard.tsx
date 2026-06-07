import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "./BrandIcons";
import type { Project } from "@/types";
import { Card } from "./Card";
import { Chip } from "./Chip";
import { StatusBadge } from "./StatusBadge";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const githubHref = project.githubUrl || "#";
  const liveHref = project.liveUrl || "#";
  const isExternalLink = (href: string) => href !== "#";

  const linkButtonClass =
    "inline-flex items-center gap-1.5 rounded border border-primary-container bg-transparent px-3 py-1.5 font-mono text-xs font-medium text-primary transition-colors hover:border-tertiary hover:text-tertiary";

  return (
    <Card hoverable className="flex h-full flex-col gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded border border-outline-variant">
        <Image
          src={project.screenshot.src}
          alt={project.screenshot.alt}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-mono text-lg font-bold text-body-text">
            {project.name}
          </h3>
          <div className="mt-2 h-0.5 w-6 bg-tertiary" />
        </div>
        <StatusBadge status={project.status} />
      </div>

      <p className="text-sm leading-relaxed text-on-surface-variant">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <Chip
            key={tech}
            label={tech}
            variant={tech.includes("SQL") || tech.includes("MySQL") ? "teal" : "blue"}
          />
        ))}
      </div>

      <p className="text-sm text-muted-text">
        <span className="font-mono text-xs font-medium text-tertiary">
          Challenge:{" "}
        </span>
        {project.keyChallenge}
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        <a
          href={githubHref}
          className={linkButtonClass}
          {...(isExternalLink(githubHref)
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <GitHubIcon width={14} height={14} />
          GitHub
        </a>
        <a
          href={liveHref}
          className={linkButtonClass}
          {...(isExternalLink(liveHref)
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <ExternalLink size={14} />
          Live Demo
        </a>
      </div>
    </Card>
  );
}
