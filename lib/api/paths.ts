import type { RoadmapStepProps } from "@/lib/types/roadmap";
import type { PathFilter } from "@/components/roadmaps/filter-tabs";

const STATUS_BY_FILTER: Record<PathFilter, string | null> = {
  all: null,
  "in-progress": "in_progress",
  completed: "completed",
};

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

export async function updateRoadmap(
  pathId: string,
  values: { title: string; description: string },
) {
  const response = await fetch(`/api/paths/${pathId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to update roadmap");
  }

  return response.json();
}

export async function deleteRoadmap(pathId: string) {
  const response = await fetch(`/api/paths/${pathId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete roadmap");
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

export async function getRoadmaps(filter: PathFilter = "all") {
  const params = new URLSearchParams({ sort: "newest" });
  const status = STATUS_BY_FILTER[filter];
  if (status) {
    params.set("status", status);
  }

  const response = await fetch(`/api/paths?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to load roadmaps");
  }

  return response.json();
}
