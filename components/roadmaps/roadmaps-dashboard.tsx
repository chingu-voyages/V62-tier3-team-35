"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { firstStepPath } from "@/components/generate-path/step-config";
import { AppSidebar } from "@/components/common/sidebar";
import { Button } from "@/components/ui/button";
import { RoadmapCard, type Roadmap } from "@/components/roadmaps/roadmap-card";
import type { LearningPath, Step } from "@/lib/generated/prisma/browser";
import { cn } from "cn";
import { FilterTabs, PathFilter } from "./filter-tabs";
import { SortMenu, SortValue } from "./sort-menu";
import { getRoadmaps } from "@/lib/api/paths";
import { Spinner } from "@/components/ui/spinner";
import { Banner } from "@/components/common/banner";

type LearningPathWithSteps = LearningPath & { steps: Step[] };

function formatDuration(path: LearningPathWithSteps): string {
  const totalHours =
    path.steps.reduce(
      (sum: number, step: Step) => sum + step.estimatedTime,
      0,
    ) / 60;
  const weeks = Math.max(
    1,
    Math.round(totalHours / Math.max(path.hoursPerWeek, 1)),
  );

  if (weeks >= 4) return `~${Math.round(weeks / 4.33)} months`;
  if (weeks > 1) return `~${weeks} weeks`;
  return `~${Math.max(1, Math.round(totalHours))}h`;
}

function learningPathToRoadmap(path: LearningPathWithSteps): Roadmap {
  const modules = path.steps.length;
  const completed = path.steps.filter((step: Step) => step.isCompleted).length;

  return {
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
    status:
      path.status === "completed"
        ? "completed"
        : path.status === "draft"
          ? "archived"
          : "progress",
  };
}

export function RoadmapsDashboard() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [filter, setFilter] = useState<PathFilter>("all");
  const [sort, onSortChange] = useState<SortValue>("recent"); // kept for compatibility with SortMenu but not used for filtering
  const [paths, setPaths] = useState<LearningPathWithSteps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getRoadmaps();
        setPaths(response.data);
      } catch (err) {
        if (err instanceof Error) {
          if (err.message.includes("Failed to load")) {
            setError("Unable to load your learning paths. Please try again.");
          } else {
            setError(err.message);
          }
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaths();
  }, []);

  const counts = useMemo(() => {
    const all = paths.length;
    const inProgress = paths.filter((p) => p.status === "active").length;
    const completed = paths.filter((p) => p.status === "completed").length;
    const draft = paths.filter((p) => p.status === "draft").length;
    return { all, "in-progress": inProgress, completed, archived: draft };
  }, [paths]);

  const filteredPaths = useMemo(() => {
    if (filter === "in-progress") {
      return paths.filter((p) => p.status === "active");
    }
    if (filter === "completed") {
      return paths.filter((p) => p.status === "completed");
    }
    if (filter === "archived") {
      return paths.filter((p) => p.status === "draft");
    }
    return paths;
  }, [paths, filter]);

  return (
    <div className="flex bg-[#FAFBF7] min-h-screen">
      <AppSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />

      <main
        className={cn(
          "py-8 pr-8 transition-[padding] duration-300 w-full",
          collapsed ? "pl-35" : "pl-63",
        )}
      >
        <header className="flex items-start justify-between gap-5">
          <div>
            <h1 className="text-[28px] font-semibold tracking-[-0.045em] text-foreground sm:text-[30px]">
              Roadmaps
            </h1>
            <p className="mt-0.5 text-[14px] text-foreground">
              Choose a learning path and start building real skills step by
              step.
            </p>
          </div>
          <Button asChild variant="primary" size="lg" className="ml-auto">
            <Link href={firstStepPath}>
              <Plus /> New path
            </Link>
          </Button>
        </header>
        <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between mt-10">
          <div className="flex items-center gap-3">
            <h2 className="text-[21px] font-semibold tracking-[-0.03em] text-foreground">
              Learning paths
            </h2>
            <span className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground font-medium">
              {filteredPaths.length} roadmaps
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FilterTabs
              value={filter}
              onValueChange={setFilter}
              counts={counts}
            />

            <SortMenu sort={sort} onSortChange={onSortChange} />
          </div>
        </section>
        <section className="mt-10">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Spinner />
            </div>
          )}

          {error && !isLoading && (
            <Banner variant="destructive" title="Error" description={error} />
          )}

          {!isLoading && !error && filteredPaths.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <p className="text-muted-foreground">
                No learning paths found. Start by creating your first path.
              </p>
              <Button asChild variant="primary">
                <Link href={firstStepPath}>
                  <Plus /> New path
                </Link>
              </Button>
            </div>
          )}

          {!isLoading && !error && filteredPaths.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredPaths.map((path) => (
                <RoadmapCard
                  key={path.id}
                  roadmap={learningPathToRoadmap(path)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
