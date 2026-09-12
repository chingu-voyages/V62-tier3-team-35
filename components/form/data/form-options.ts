import {
  BarChart3,
  Braces,
  Code2,
  Gauge,
  Layers3,
  Leaf,
  Palette,
  PencilLine,
  Rocket,
  Server,
  Sprout,
  Target,
  Zap,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type FormOption = {
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const goalChoices: FormOption[] = [
  {
    value: "frontend",
    title: "Frontend Developer",
    description: "Build modern web applications",
    icon: Code2,
  },
  {
    value: "backend",
    title: "Backend Developer",
    description: "Work with servers, databases and APIs",
    icon: Server,
  },
  {
    value: "fullstack",
    title: "Full Stack Developer",
    description: "Combine frontend and backend",
    icon: Layers3,
  },
  {
    value: "data",
    title: "Data Scientist",
    description: "Analyze data and build ML models",
    icon: BarChart3,
  },
  {
    value: "design",
    title: "UI/UX Designer",
    description: "Design user experiences and interfaces",
    icon: Palette,
  },
  {
    value: "custom",
    title: "Custom goal",
    description: "Describe what you want to learn",
    icon: PencilLine,
  },
];

export const levelChoices: FormOption[] = [
  {
    value: "beginner",
    title: "Beginner",
    description: "I am learning the fundamentals",
    icon: Sprout,
  },
  {
    value: "intermediate",
    title: "Intermediate",
    description: "I can build simple projects",
    icon: Braces,
  },
  {
    value: "advanced",
    title: "Advanced",
    description: "I can build real applications",
    icon: Rocket,
  },
];

export const timeChoices: FormOption[] = [
  {
    value: "light",
    title: "1–3 hours per week",
    description: "A light learning pace",
    icon: Leaf,
  },
  {
    value: "balanced",
    title: "4–7 hours per week",
    description: "A balanced learning pace",
    icon: Gauge,
  },
  {
    value: "focused",
    title: "8–15 hours per week",
    description: "A focused learning pace",
    icon: Target,
  },
  {
    value: "intensive",
    title: "16+ hours per week",
    description: "An intensive learning pace",
    icon: Zap,
  },
  {
    value: "custom",
    title: "Custom",
    description: "Set your own weekly hours",
    icon: PencilLine,
  },
];

export const targetChoices: FormOption[] = [
  {
    value: "recommended",
    title: "Recommended",
    description: "A balanced roadmap",
    icon: Target,
  },
  {
    value: "accelerated",
    title: "Accelerated",
    description: "Finish in less time",
    icon: Zap,
  },
  {
    value: "relaxed",
    title: "Relaxed",
    description: "Leave more room each week",
    icon: Leaf,
  },
];

export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Git",
  "Testing",
];

export const skillGroups = [
  {
    title: "Core knowledge",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Frameworks & libraries",
    skills: ["React", "Next.js", "Vue.js", "Svelte"],
  },
  {
    title: "Tools & workflow",
    skills: ["Git", "GitHub", "Vite", "Testing"],
  },
];

export function getChoiceTitle(choices: FormOption[], value: string) {
  return choices.find((choice) => choice.value === value)?.title ?? value;
}
