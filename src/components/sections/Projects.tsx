import { featuredProjects } from "@/lib/data";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <ScrollRevealGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ScrollRevealItem className="col-span-full">
          <SectionHeading
            title="Projects"
            subtitle="Selected work demonstrating software development and problem-solving."
          />
        </ScrollRevealItem>

        {featuredProjects.map((project) => (
          <ScrollRevealItem key={project.id}>
            <ProjectCard project={project} />
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </SectionWrapper>
  );
}
