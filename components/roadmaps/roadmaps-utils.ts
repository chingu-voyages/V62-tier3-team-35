import type { LearningPath, Step } from "@/lib/generated/prisma/browser";
import type { Roadmap } from "./roadmap-card";

export type LearningPathWithSteps = LearningPath & { steps: Step[] };

export function formatDuration(path: LearningPathWithSteps): string {
  const totalWeeks = path.steps.reduce(
    (sum: number, step: Step) => sum + step.estimatedTime,
    0,
  );

  if (totalWeeks >= 4) {
    const months = Math.max(1, Math.round(totalWeeks / 4.33));
    return `~${months} ${months === 1 ? "month" : "months"}`;
  }
  if (totalWeeks > 1) return `~${totalWeeks} weeks`;
  return "~1 week";
}

export function learningPathToRoadmap(path: LearningPathWithSteps): Roadmap {
  const modules = path.steps.length;
  const completed = path.steps.filter((step: Step) => step.status === "done").length;

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
