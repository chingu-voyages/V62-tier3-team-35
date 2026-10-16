"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock1, Share2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RoadmapStepProps } from "@/lib/types/roadmap";
import { getRoadmapStats } from "@/lib/utils/roadmap-stats";
import ShareRoadmapDialog from "./share-roadmap-dialog";

interface RoadmapToolbarProps {
  roadmap: RoadmapStepProps[];
  hoursPerWeek: number;
}

export default function RoadmapToolbar({
  roadmap,
  hoursPerWeek,
}: RoadmapToolbarProps) {
  const { totalSteps, completedSteps, progress, totalEstimatedMonths } =
    getRoadmapStats(roadmap);

  const summaryItems = [
    { label: `${progress}%`, Icon: Target },
    { label: `${completedSteps} / ${totalSteps} completed` },
    { label: `~ ${totalEstimatedMonths} months`, Icon: Clock1 },
    { label: `${hoursPerWeek}h / week`, Icon: Calendar },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const isDesktopScreen = window.matchMedia("(min-width: 1024px)");
    let interval: ReturnType<typeof setInterval> | undefined;

    const updateInterval = () => {
      if (interval) clearInterval(interval);

      if (isDesktopScreen.matches) return;

      interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % 4);
      }, 8000);
    };

    updateInterval();
    isDesktopScreen.addEventListener("change", updateInterval);

    return () => {
      if (interval) clearInterval(interval);
      isDesktopScreen.removeEventListener("change", updateInterval);
    };
  }, []);

  const tabletPairStart = Math.floor(activeSlide / 2) * 2;

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div className="relative mx-auto flex w-full items-start justify-center gap-2">
        <div className="flex h-9 min-w-0 w-fit max-w-[calc(100%-4.5rem)] items-center overflow-hidden rounded-full border border-border bg-card px-1.5 sm:h-11 sm:max-w-[60%] sm:px-6">
          {summaryItems.map(({ label, Icon }, index) => (
            <div
              key={label}
              className={`${index === activeSlide ? "flex" : "hidden"} ${
                index >= tabletPairStart && index < tabletPairStart + 2
                  ? "sm:flex"
                  : "sm:hidden"
              } lg:flex items-center`}
            >
              <div className="flex items-center gap-1.5 px-2.5">
                {Icon && (
                  <Icon className="size-5 shrink-0" aria-hidden="true" />
                )}
                <span className="whitespace-nowrap text-xs font-semibold">
                  {label}
                </span>
              </div>
              {index < summaryItems.length - 1 && (
                <span
                  className={`hidden h-5 w-px shrink-0 bg-border ${
                    index === tabletPairStart ? "sm:block" : "sm:hidden"
                  } lg:block`}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
        <ShareRoadmapDialog>
          <Button
            variant="secondary"
            size="lg"
            className="absolute right-0 top-0 size-9 gap-1 px-2 sm:size-auto sm:gap-2 sm:h-11 sm:px-3"
            aria-label="Download roadmap as SVG"
          >
            <Share2 aria-hidden="true" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </ShareRoadmapDialog>
      </div>
    </div>
  );
}
