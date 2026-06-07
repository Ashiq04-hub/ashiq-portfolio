export type ProjectStatus = "Completed" | "In Progress" | "Planning";

export interface Project {
  id: string;
  name: string;
  description: string;
  features: string[];
  techStack: string[];
  status: ProjectStatus;
  keyChallenge: string;
  githubUrl: string | null;
  liveUrl: string | null;
  screenshot: {
    src: string;
    alt: string;
  };
  featured: boolean;
}
