import type { RoadmapStepProps } from "@/components/roadmap/roadmap.types";

export type PathResponse = {
  success: boolean;
  data: {
    steps: RoadmapStepProps[];
  };
};

export async function generateRoadmap(userId: string, values: unknown) {
  const response = await fetch(`/api/paths?userId=${userId}`, {
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
