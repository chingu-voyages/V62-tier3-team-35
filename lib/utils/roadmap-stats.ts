import type { RoadmapStepProps, RoadmapStats } from "@/lib/types/roadmap";

export function getRoadmapStats(roadmap: RoadmapStepProps[]): RoadmapStats {
  const totalSteps = roadmap.length;

  const { completedSteps, totalEstimatedTime } = roadmap.reduce(
    (acc, step) => {
      if (step.status === "done") {
        acc.completedSteps += 1;
      }

      acc.totalEstimatedTime += Number(step.estimatedTime || 0);

      return acc;
    },
    { completedSteps: 0, totalEstimatedTime: 0 },
  );

  const progress =
    totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const totalEstimatedMonths = Math.round(totalEstimatedTime / 4.345);

  return {
    totalSteps,
    completedSteps,
    progress,
    totalEstimatedMonths,
  };
}
