import type { Roadmap } from "./roadmap-card";

export const roadmaps: Roadmap[] = [
  {
    title: "Frontend Developer",
    description:
      "Learn modern web development and build real projects step by step.",
    modules: 10,
    duration: "6 months",
    progress: 30,
    completed: 3,
    skills: [
      "Research",
      "Design Systems",
      "Prototyping",
      "frontend",
      "javascript",
    ],
    status: "progress",
  },
  {
    title: "UI/UX Designer",
    description:
      "Design thoughtful experiences through research and iteration.",
    modules: 8,
    duration: "4 months",
    progress: 50,
    completed: 4,
    skills: ["Research", "Wireframes", "User flows"],
    status: "progress",
  },
  {
    title: "Data Analyst",
    description:
      "Turn useful data into clear decisions with SQL, statistics, and dashboards.",
    modules: 12,
    duration: "5 months",
    progress: 15,
    completed: 2,
    skills: ["SQL", "Statistics", "Dashboards"],
    status: "progress",
  },
];
