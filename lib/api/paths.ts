import type { RoadmapStepProps } from "@/lib/types/roadmap";

export type PathResponse = {
  success: boolean;
  data: {
    steps: RoadmapStepProps[];
    hoursPerWeek: number;
  };
};

export async function generateRoadmap(values: unknown) {
  const response = await fetch(`/api/paths`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to generate roadmap");
  }

  return response.json();
}

export async function getRoadmap(pathId: string) {
  const response = await fetch(`/api/paths/${pathId}`);

  if (!response.ok) {
    throw new Error("Failed to load roadmap");
  }

  return response.json();
}
