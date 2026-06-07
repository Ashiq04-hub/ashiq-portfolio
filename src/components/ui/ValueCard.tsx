import {
  CodeXml,
  GraduationCap,
  Lightbulb,
  Package,
  TrendingUp,
  Users,
} from "lucide-react";
import type { ValueProposition } from "@/types";
import { Card } from "./Card";

const iconMap = {
  lightbulb: Lightbulb,
  package: Package,
  "code-xml": CodeXml,
  "trending-up": TrendingUp,
  users: Users,
  "graduation-cap": GraduationCap,
};

interface ValueCardProps {
  value: ValueProposition;
}

export function ValueCard({ value }: ValueCardProps) {
  const Icon = iconMap[value.icon as keyof typeof iconMap] ?? Lightbulb;

  return (
    <Card hoverable className="flex flex-col gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary-container bg-background text-tertiary">
        <Icon size={20} />
      </div>
      <h3 className="font-mono text-base font-semibold text-body-text">
        {value.title}
      </h3>
      <p className="text-sm leading-relaxed text-on-surface-variant">
        {value.description}
      </p>
    </Card>
  );
}
