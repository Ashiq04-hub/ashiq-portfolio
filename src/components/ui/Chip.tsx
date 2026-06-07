import { cn } from "@/lib/utils";

type ChipVariant = "blue" | "teal";

interface ChipProps {
  label: string;
  variant?: ChipVariant;
  className?: string;
}

const variantStyles: Record<ChipVariant, string> = {
  blue: "border-primary text-primary",
  teal: "border-tertiary text-tertiary",
};

export function Chip({ label, variant = "blue", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-block rounded border bg-background px-2.5 py-1 font-mono text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
