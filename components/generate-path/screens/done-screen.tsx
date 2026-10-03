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
import type { RoadmapStepProps } from "@/components/roadmap/roadmap.types";
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

  useEffect(() => {
    if (!pathId) {
      setIsLoading(false);
      setIsError(true);
      return;
    }

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
    <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="mt-8 h-150 w-full flex items-center justify-center">
        {isLoading && <Spinner />}
        {isError && (
          <Banner
            variant="destructive"
            title="Unable to load your roadmap"
            description="We couldn't load your roadmap. Please try again."
          />
        )}
        {!isLoading && !isError && <Roadmap roadmap={roadmap} />}
      </div>

      <Button variant="primary" size="lg" className="mt-8" onClick={startOver}>
        Create another roadmap
      </Button>
    </section>
  );
}
