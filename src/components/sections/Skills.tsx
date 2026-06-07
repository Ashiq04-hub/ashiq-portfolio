import { skillGroups } from "@/lib/data";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <ScrollRevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <ScrollRevealItem className="col-span-full">
          <SectionHeading
            title="Skills"
            subtitle="Technologies I work with across the stack."
          />
        </ScrollRevealItem>

        {skillGroups.map((group) => (
          <ScrollRevealItem key={group.category}>
            <Card className="h-full">
              <h3 className="font-mono text-base font-semibold text-body-text">
                {group.label}
              </h3>
              <div className="mt-2 h-0.5 w-6 bg-tertiary" />
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    variant={group.category === "database" ? "teal" : "blue"}
                  />
                ))}
              </div>
            </Card>
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </SectionWrapper>
  );
}
