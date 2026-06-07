"use client";

import { useEffect, useState } from "react";
import { NAVBAR_HEIGHT } from "@/lib/constants";

export function useScrollSpy(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActiveSection(visible[0].target.id);
      }
    };

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(handleIntersect, {
        rootMargin: `-${NAVBAR_HEIGHT}px 0px -50% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      });

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
