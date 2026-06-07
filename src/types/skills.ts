export type SkillCategory = "frontend" | "backend" | "database";

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: string[];
}

export interface Tool {
  name: string;
  icon: string;
}
