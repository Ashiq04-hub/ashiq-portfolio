"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ANIMATION_DEFAULTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedContainer({
  children,
  className,
  delay = 0,
}: AnimatedContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: ANIMATION_DEFAULTS.duration,
        ease: ANIMATION_DEFAULTS.ease,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
