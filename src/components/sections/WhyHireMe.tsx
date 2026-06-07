import { whyHireMe } from "@/lib/data";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { ValueCard } from "@/components/ui/ValueCard";

export function WhyHireMe() {
  return (
    <SectionWrapper id="why-hire-me">
      <ScrollRevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ScrollRevealItem className="col-span-full">
          <SectionHeading
            title="Why Hire Me"
            subtitle="What I bring to a software engineering team."
          />
        </ScrollRevealItem>

        {whyHireMe.map((value) => (
          <ScrollRevealItem key={value.id}>
            <ValueCard value={value} />
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </SectionWrapper>
  );
}
