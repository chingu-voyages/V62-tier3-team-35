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
import type { RoadmapTechnologyProps } from "@/components/roadmap/roadmap.types";

export function DoneScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { reset } = useFormContext<RoadmapFormValues>();

  const pathId = searchParams.get("pathId");
  const [roadmap, setRoadmap] = useState<RoadmapTechnologyProps[]>([]);
  useEffect(() => {
    if (!pathId) return;

    const loadRoadmap = async () => {
      try {
        const response = await fetch(`/api/paths/${pathId}`);

        if (!response.ok) {
          throw new Error("Failed to load roadmap");
        }

        const result = await response.json();

        console.log("Loaded roadmap:", result);

        const technologies = result.data.steps.map((step: any) => ({
          technology: step.title,
          icon: step.icon ?? "Code2",
          keyTopics: step.keyTopics ?? "",
          estimatedWeeks: Math.ceil(Number(step.estimatedTime) / 10),
          topics: step.topics,
        }));

        setRoadmap(technologies);
      } catch (error) {
        console.error("Failed to load roadmap:", error);
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
      <div className="mt-8 h-150 w-full">
        {roadmap.length > 0 && <Roadmap roadmap={roadmap} />}
      </div>

      <Button variant="primary" size="lg" className="mt-8" onClick={startOver}>
        Create another roadmap
      </Button>
    </section>
  );
}
