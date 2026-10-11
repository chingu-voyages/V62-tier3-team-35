"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";

import { firstStepPath } from "@/components/generate-path/step-config";
import { Button } from "@/components/ui/button";
import {
  initialForm,
  type RoadmapFormValues,
} from "@/lib/schemas/paths.schema";
import { Roadmap } from "@/components/roadmap/roadmap";
import type { RoadmapStepProps } from "@/lib/types/roadmap";
import { getRoadmap, type PathResponse } from "@/lib/api/paths";
import { Spinner } from "@/components/ui/spinner";
import { Banner } from "@/components/common/banner";

export function DoneScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { reset } = useFormContext<RoadmapFormValues>();

  const pathId = searchParams.get("pathId");
  const [roadmap, setRoadmap] = useState<RoadmapStepProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const hasError = !pathId || isError;

  useEffect(() => {
    if (!pathId) return;

    const loadRoadmap = async () => {
      try {
        const result: PathResponse = await getRoadmap(pathId);

        if (result.data.steps.length === 0) {
          throw new Error("Roadmap is empty");
        }

        setRoadmap(result.data.steps);
      } catch (error) {
        console.error("Failed to load roadmap:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoadmap();
  }, [pathId]);

  const startOver = () => {
    reset(initialForm);
    router.push(firstStepPath);
  };

  return (
    <div className="flex flex-1 flex-col w-full h-full relative">
      <div className="flex-1 w-full min-h-[500px] h-full relative flex items-center justify-center">
        {isLoading && pathId && <Spinner />}
        {hasError && (
          <div className="mx-auto max-w-xl px-6">
            <Banner
              variant="destructive"
              title="Unable to load your roadmap"
              description="We couldn't load your roadmap. Please try again."
            />
          </div>
        )}
        {!isLoading && !hasError && <Roadmap roadmap={roadmap} />}
      </div>

      <div className="p-4 border-t bg-background/80 backdrop-blur-sm flex justify-center shrink-0">
        <Button variant="primary" size="lg" onClick={startOver}>
          Create another roadmap
        </Button>
      </div>
    </div>
  );
}
