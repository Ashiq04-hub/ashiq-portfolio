import Image from "next/image";
import { about } from "@/lib/data";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";

export function About() {
  return (
    <SectionWrapper id="about">
      <ScrollRevealGroup className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-10">
        <ScrollRevealItem className="col-span-full">
          <SectionHeading
            title="About"
            subtitle="Who I am and where I'm headed."
          />
        </ScrollRevealItem>

        <ScrollRevealItem className="md:col-span-4">
          <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-full border-2 border-tertiary">
            <Image
              src="/images/photoedit.png"
              alt={about.avatar.alt}
              fill
              sizes="(max-width: 768px) 280px, 320px"
              className="object-cover object-[center_15%]"
              priority
            />
          </div>
        </ScrollRevealItem>

        <ScrollRevealItem className="md:col-span-8">
          <Card className="flex flex-col gap-6">
            <div>
              <h3 className="font-mono text-base font-semibold text-tertiary">
                Introduction
              </h3>
              <p className="mt-3 text-base leading-relaxed text-on-surface-variant">
                {about.introduction}
              </p>
            </div>
            <div>
              <h3 className="font-mono text-base font-semibold text-tertiary">
                Career Goal
              </h3>
              <p className="mt-3 text-base leading-relaxed text-on-surface-variant">
                {about.careerGoals}
              </p>
            </div>
          </Card>
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </SectionWrapper>
  );
}
