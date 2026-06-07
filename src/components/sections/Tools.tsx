import { tools } from "@/lib/data";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { ToolIcon } from "@/components/ui/ToolIcon";

export function Tools() {
  return (
    <SectionWrapper id="tools">
      <ScrollRevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <ScrollRevealItem className="col-span-2 sm:col-span-4">
          <SectionHeading
            title="Tools"
            subtitle="Development and design tools in my workflow."
          />
        </ScrollRevealItem>

        {tools.map((tool) => (
          <ScrollRevealItem key={tool.name}>
            <ToolIcon tool={tool} />
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </SectionWrapper>
  );
}
