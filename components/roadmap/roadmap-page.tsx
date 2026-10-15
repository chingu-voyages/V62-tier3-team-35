"use client";

import { useEffect, useState } from "react";
import { Roadmap } from "@/components/roadmap/roadmap";
import type { RoadmapStepProps } from "@/lib/types/roadmap";
import { getRoadmap, type PathResponse } from "@/lib/api/paths";
import { Spinner } from "@/components/ui/spinner";
import { Banner } from "@/components/common/banner";
import RoadmapToolbar from "./roadmap-toolbar";

interface RoadmapPageProps {
  id: string;
}

export function RoadmapPage({ id }: RoadmapPageProps) {
  const [roadmap, setRoadmap] = useState<RoadmapStepProps[]>([]);
  const [hoursPerWeek, setHoursPerWeek] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const hasError = !id || isError;

  useEffect(() => {
    if (!id) return;

    const loadRoadmap = async () => {
      try {
        const result: PathResponse = await getRoadmap(id);

        if (result.data.steps.length === 0) {
          throw new Error("Roadmap is empty");
        }

        setRoadmap(result.data.steps);
        setHoursPerWeek(result.data.hoursPerWeek);
      } catch (error) {
        console.error("Failed to load roadmap:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoadmap();
  }, [id]);

  const handleStepComplete = (stepId: string) => {
    setRoadmap((prevRoadmap) =>
      prevRoadmap.map((step) =>
        step.id === stepId ? { ...step, status: "done" } : step,
      ),
    );
  };

  return (
    <div className="relative flex flex-1 flex-col w-full h-full ">
      <RoadmapToolbar roadmap={roadmap} hoursPerWeek={hoursPerWeek} />
      <div className="relative flex-1 w-full min-h-125 h-full flex items-center justify-center">
        {isLoading && <Spinner />}
        {hasError && (
          <div className="mx-auto max-w-xl px-6">
            <Banner
              variant="destructive"
              title="Unable to load your roadmap"
              description="We couldn't load your roadmap. Please try again."
            />
          </div>
        )}
        {!isLoading && !hasError && (
          <Roadmap roadmap={roadmap} onStepComplete={handleStepComplete} />
        )}
      </div>
    </div>
  );
}

export default RoadmapPage;
