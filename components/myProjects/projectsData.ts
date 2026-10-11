export type ProjectCategory = "all" | "mobile" | "web" | "enterprise_pwa";

export interface ProjectRecord {
  id: string;
  category: "mobile" | "web" | "enterprise_pwa";
  imageUrl: string;
  technologies: string[];
  featured?: boolean;
}

export const PROJECTS_DATA: ProjectRecord[] = [
  {
    id: "worldker",
    category: "mobile",
    imageUrl: "/worldker.png",
    technologies: ["React Native", "Firebase", "i18n", "MySQL", "Git"],
    featured: true,
  },
  {
    id: "arzobispadoWeb",
    category: "web",
    imageUrl: "/arzobispado.webp",
    technologies: ["React", "Next.js", "CSS", "SEO"],
  },
  {
    id: "arzobispadoCrud",
    category: "enterprise_pwa",
    imageUrl: "/crud.webp",
    technologies: ["Node.js", "MySQL", "Express", "React"],
  },
  {
    id: "alcaldia",
    category: "web",
    imageUrl: "/projects/Alcaldia.webp",
    technologies: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "autovidrios",
    category: "enterprise_pwa",
    imageUrl: "/projects/AutoVidrios.webp",
    technologies: ["React", "Node.js"],
  },
  {
    id: "fiado",
    category: "enterprise_pwa",
    imageUrl: "/projects/Fiado.webp",
    technologies: ["PWA", "React", "Node.js"],
  },
  {
    id: "jccrp",
    category: "enterprise_pwa",
    imageUrl: "/projects/Jccrp.webp",
    technologies: ["React", "Node.js"],
  },
  {
    id: "perfecttrainer",
    category: "mobile",
    imageUrl: "/projects/perfecttrainer.webp",
    technologies: ["React Native", "Firebase", "Redux"],
  },
  {
    id: "tourtrack",
    category: "mobile",
    imageUrl: "/projects/TourTrack.webp",
    technologies: ["React Native", "Firebase"],
  },
];
