import { Trophy, BadgeCheck } from "lucide-react";
import { achievements } from "@/lib/data";
import type { Achievement } from "@/types";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";

function AchievementCard({ item }: { item: Achievement }) {
  const isAward = item.type === "award";

  return (
    <Card className="flex h-full flex-col gap-4">
      {/* Icon */}
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
          isAward
            ? "border-tertiary text-tertiary"
            : "border-primary text-primary"
        } bg-background`}
      >
        {isAward ? <Trophy size={20} /> : <BadgeCheck size={20} />}
      </div>

      {/* Title + year row */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-mono text-base font-semibold text-body-text leading-snug">
          {item.title}
        </h3>
        <span className="shrink-0 font-mono text-xs text-muted-text">
          {item.year}
        </span>
      </div>

      {/* Organization */}
      <p
        className={`font-mono text-sm font-medium ${
          isAward ? "text-tertiary" : "text-primary"
        }`}
      >
        {item.organization}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed text-on-surface-variant">
        {item.description}
      </p>
    </Card>
  );
}

export function Achievements() {
  return (
    <SectionWrapper id="achievements">
      <ScrollRevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ScrollRevealItem className="col-span-full">
          <SectionHeading
            title="Achievements & Certificates"
            subtitle="Recognition and certifications earned."
          />
        </ScrollRevealItem>

        {achievements.map((item) => (
          <ScrollRevealItem key={`${item.type}-${item.title}`}>
            <AchievementCard item={item} />
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </SectionWrapper>
  );
}
