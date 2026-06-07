import { education } from "@/lib/data";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";

export function Education() {
  return (
    <SectionWrapper id="education">
      <ScrollRevealGroup>
        <ScrollRevealItem>
          <SectionHeading
            title="Education"
            subtitle="Academic foundation in computer science."
          />
        </ScrollRevealItem>

        <ScrollRevealItem>
          <Card className="max-w-3xl">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-mono text-lg font-bold text-body-text">
                  {education.degree}
                </h3>
                <p className="mt-1 text-base text-primary">
                  {education.university}
                </p>
              </div>
              <span className="font-mono text-sm text-tertiary">
                {education.period}
              </span>
            </div>

            <ul className="mt-6 flex flex-col gap-3">
              {education.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-sm leading-relaxed text-on-surface-variant"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 bg-tertiary" />
                  {highlight}
                </li>
              ))}
            </ul>
          </Card>
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </SectionWrapper>
  );
}
