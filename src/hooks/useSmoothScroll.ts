"use client";

import { useCallback } from "react";
import { scrollToSection } from "@/lib/utils";

export function useSmoothScroll() {
  const scrollTo = useCallback((sectionId: string) => {
    scrollToSection(sectionId);
  }, []);

  return { scrollTo };
}
