import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-16 py-16 md:py-20", className)}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-20">
        {children}
      </div>
    </section>
  );
}
