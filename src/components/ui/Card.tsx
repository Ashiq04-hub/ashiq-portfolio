import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className, hoverable = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded border border-primary-container bg-surface-card p-6",
        hoverable &&
          "transition-colors hover:border-tertiary hover:border-l-4 hover:border-l-tertiary",
        className,
      )}
    >
      {children}
    </div>
  );
}
