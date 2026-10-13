import type { LearningPath, Step } from "@/lib/generated/prisma/browser";
import type { Roadmap } from "./roadmap-card";

export type LearningPathWithSteps = LearningPath & { steps: Step[] };

export function formatDuration(path: LearningPathWithSteps): string {
  const totalHours =
    path.steps.reduce(
      (sum: number, step: Step) => sum + step.estimatedTime,
      0,
    ) / 60;
  const weeks = Math.max(
    1,
    Math.round(totalHours / Math.max(path.hoursPerWeek, 1)),
  );

  if (weeks >= 4) return `~${Math.round(weeks / 4.33)} months`;
  if (weeks > 1) return `~${weeks} weeks`;
  return `~${Math.max(1, Math.round(totalHours))}h`;
}

export function learningPathToRoadmap(path: LearningPathWithSteps): Roadmap {
  const modules = path.steps.length;
  const completed = path.steps.filter((step: Step) => step.isCompleted).length;

  return {
    id: path.id,
    title: path.title ?? path.careerGoal,
    description:
      path.description ??
      path.steps
        .slice(0, 3)
        .map((step: Step) => step.title)
        .join(" · "),
    modules,
    duration: formatDuration(path),
    progress: modules === 0 ? 0 : Math.round((completed / modules) * 100),
    completed,
    skills: path.skills,
    status: path.status === "completed" ? "completed" : "progress",
  };
}
