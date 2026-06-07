import type { NavItem } from "@/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Education", href: "#education", sectionId: "education" },
  { label: "Skills", href: "#skills", sectionId: "skills" },
  { label: "Tools", href: "#tools", sectionId: "tools" },
  { label: "Why Hire Me", href: "#why-hire-me", sectionId: "why-hire-me" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export const SECTION_IDS = NAV_ITEMS.map((item) => item.sectionId);

export const NAVBAR_HEIGHT = 64;

export const ANIMATION_DEFAULTS = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export const RESEND_FROM_EMAIL = "onboarding@resend.dev";
export const RESEND_TO_EMAIL = "ashiqenriquez@gmail.com";
