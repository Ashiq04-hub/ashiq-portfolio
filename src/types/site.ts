export type SocialPlatform = "github" | "linkedin" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
}

export interface SiteInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  resumePath: string;
  socialLinks: SocialLink[];
}

export interface About {
  introduction: string;
  careerGoals: string;
  avatar: {
    src: string;
    alt: string;
  };
}

export interface Education {
  university: string;
  degree: string;
  period: string;
  highlights: string[];
}

export interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

export interface ValueProposition {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type AchievementType = "award" | "certificate";

export interface Achievement {
  title: string;
  organization: string;
  description: string;
  year: string;
  type: AchievementType;
}
