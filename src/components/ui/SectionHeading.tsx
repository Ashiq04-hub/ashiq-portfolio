import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10", className)}>
      <h2 className="font-mono text-2xl font-bold text-body-text md:text-[32px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-text md:text-lg">
          {subtitle}
        </p>
      )}
      <div className="mt-4 h-0.5 w-6 bg-tertiary" />
    </div>
  );
}
