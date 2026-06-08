import type {
  About,
  Achievement,
  Education,
  Project,
  SiteInfo,
  SkillGroup,
  Tool,
  ValueProposition,
} from "@/types";

export const siteInfo: SiteInfo = {
  name: "Ashiq Alsinawi",
  title: "Aspiring Software Engineer",
  tagline:
    "Building scalable software solutions through clean code and continuous learning.",
  email: "ashiqenriquez@gmail.com",
  resumePath: "/resume.pdf",
  socialLinks: [
    {
      platform: "github",
      url: "https://github.com/Ashiq04-hub",
      label: "GitHub",
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/ashiq-alsinawi",
      label: "LinkedIn",
    },
    {
      platform: "email",
      url: "mailto:ashiqenriquez@gmail.com",
      label: "Email",
    },
  ],
};

export const about: About = {
  introduction:
    "Computer Science student passionate about software development, problem-solving, and modern web technologies.",
  careerGoals:
    "To become a full-stack software engineer and contribute to impactful technology products.",
  avatar: {
    src: "/images/ashiq.png",
    alt: "Ashiq Alsinawi — Aspiring Software Engineer",
  },
};

export const education: Education = {
  university: "Arellano University",
  degree: "Bachelor of Science in Computer Science",
  period: "2022 – 2027 (Expected)",
  highlights: [
    "Studying core computer science fundamentals including data structures, algorithms, and software engineering",
    "Developing practical projects across desktop, web, and database technologies",
    "Building a strong foundation in full-stack development and system design",
    "Applying academic knowledge to real-world software solutions",
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    category: "frontend",
    label: "Frontend",
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "backend",
    label: "Backend",
    skills: ["Node.js", "PHP", "Python", "Java", "C#"],
  },
  {
    category: "database",
    label: "Database",
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
  },
];

export const tools: Tool[] = [
  { name: "VS Code", icon: "code" },
  { name: "Cursor", icon: "mouse-pointer" },
  { name: "GitHub", icon: "github" },
  { name: "Figma", icon: "figma" },
  { name: "Canva", icon: "palette" },
  { name: "Photoshop", icon: "image" },
  { name: "OpenAI", icon: "bot" },
  { name: "Perplexity", icon: "search" },
];

export const whyHireMe: ValueProposition[] = [
  {
    id: "problem-solving",
    title: "Problem Solving",
    description:
      "I approach technical challenges methodically, breaking complex problems into manageable components and delivering reliable solutions.",
    icon: "lightbulb",
  },
  {
    id: "product-development",
    title: "Product Development",
    description:
      "I build software with the end user in mind, translating requirements into functional products that solve real-world needs.",
    icon: "package",
  },
  {
    id: "clean-code",
    title: "Clean Code",
    description:
      "I write maintainable, well-structured code following best practices to ensure long-term scalability and readability.",
    icon: "code-xml",
  },
  {
    id: "process-improvement",
    title: "Process Improvement",
    description:
      "I identify inefficiencies in workflows and systems, implementing improvements that reduce manual effort and increase accuracy.",
    icon: "trending-up",
  },
  {
    id: "team-collaboration",
    title: "Team Collaboration",
    description:
      "I communicate clearly, share knowledge openly, and work effectively with others to achieve shared project goals.",
    icon: "users",
  },
  {
    id: "continuous-learning",
    title: "Continuous Learning",
    description:
      "I stay current with modern technologies and development practices, constantly expanding my skills to deliver better results.",
    icon: "graduation-cap",
  },
];

export const projects: Project[] = [
  {
    id: "library-management",
    name: "Public Library Management System",
    description:
      "A library management system designed to automate book borrowing, returns, penalty calculation, and user management for educational institutions.",
    features: [
      "Book Borrowing System",
      "Return Book Processing",
      "Automatic Penalty Calculation",
      "Due Date Tracking",
      "Borrow History Reports",
      "User Management",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "CSS"],
    status: "Completed",
    keyChallenge:
      "Developed an automated penalty calculation system that computes overdue fines based on the number of days beyond the due date.",
    githubUrl: null,
    liveUrl: null,
    screenshot: {
      src: "/images/projects/library-management.svg",
      alt: "Public Library Management System project screenshot",
    },
    featured: true,
  },
  {
    id: "weather-forecasting",
    name: "Weather Forecasting Application",
    description:
      "A weather forecasting application that provides real-time weather information, temperature monitoring, and forecast predictions for different locations. The system helps users plan their activities by delivering accurate and up-to-date weather conditions.",
    features: [
      "Real-Time Weather Updates",
      "Temperature Monitoring",
      "7-Day Weather Forecast",
      "Location-Based Weather Search",
      "Humidity and Wind Speed Tracking",
      "Weather Condition Icons",
      "Responsive User Interface",
    ],
    techStack: ["HTML", "CSS", "Python", "MongoDB"],
    status: "Completed",
    keyChallenge:
      "Implemented API integration to retrieve and display live weather data while ensuring a smooth and user-friendly experience.",
    githubUrl: null,
    liveUrl: null,
    screenshot: {
      src: "/images/projects/weather-forecasting.svg",
      alt: "Weather Forecasting Application project screenshot",
    },
    featured: true,
  },
  {
    id: "online-voting",
    name: "Online Voting System",
    description:
      "A secure online voting platform designed to streamline election processes and provide efficient vote management. The system allows users to cast votes electronically while maintaining transparency and accuracy.",
    features: [
      "User Authentication",
      "Secure Voting Process",
      "Candidate Management",
      "Election Management",
      "Vote Counting Automation",
      "Real-Time Results Dashboard",
      "Administrative Control Panel",
    ],
    techStack: ["React", "Node.js", "MySQL", "CSS"],
    status: "Completed",
    keyChallenge:
      "Developed a reliable voting workflow that prevents duplicate voting and ensures accurate vote counting.",
    githubUrl: null,
    liveUrl: null,
    screenshot: {
      src: "/images/projects/online-voting.svg",
      alt: "Online Voting System project screenshot",
    },
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const achievements: Achievement[] = [
  {
    title: "Dean's Lister",
    organization: "Arellano University",
    description:
      "Awarded Dean's List recognition for 4 consecutive years for academic excellence.",
    year: "2022 - 2026",
    type: "award",
  },
  {
    title: "Cloud Computing Fundamentals",
    organization: "IBM SkillsBuild",
    description:
      "Completed IBM SkillsBuild learning path on Cloud Computing Fundamentals.",
    year: "2024",
    type: "certificate",
  },
  {
    title: "Digital Literacy",
    organization: "IBM SkillsBuild",
    description:
      "Completed IBM SkillsBuild certification in Digital Literacy.",
    year: "2024",
    type: "certificate",
  },
  {
    title: "Information Technology Fundamentals",
    organization: "IBM SkillsBuild",
    description:
      "Completed IBM SkillsBuild certification in Information Technology Fundamentals.",
    year: "2024",
    type: "certificate",
  },
  {
    title: "User Experience Design Fundamentals",
    organization: "IBM SkillsBuild",
    description:
      "Completed IBM SkillsBuild certification in User Experience Design Fundamentals.",
    year: "2024",
    type: "certificate",
  },
];
