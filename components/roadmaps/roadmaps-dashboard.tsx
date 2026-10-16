"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { firstStepPath } from "@/components/generate-path/step-config";
import { DashboardShell } from "@/components/common/dashboard-shell";
import { Button } from "@/components/ui/button";
import { RoadmapCard, type Roadmap } from "@/components/roadmaps/roadmap-card";
import { FilterTabs, PathFilter } from "./filter-tabs";
import { SortMenu, SortValue } from "./sort-menu";
import { getRoadmaps } from "@/lib/api/paths";
import { Spinner } from "@/components/ui/spinner";
import { Banner } from "@/components/common/banner";
import {
  learningPathToRoadmap,
  type LearningPathWithSteps,
} from "./roadmaps-utils";
import type { RoadmapDetails } from "./edit-roadmap-dialog";

export function RoadmapsDashboard() {
  const router = useRouter();
  const [filter, setFilter] = useState<PathFilter>("all");
  const [sort, onSortChange] = useState<SortValue>("recent"); // kept for compatibility with SortMenu but not used for filtering
  const [paths, setPaths] = useState<LearningPathWithSteps[]>([]);
  const [counts, setCounts] = useState<Record<PathFilter, number>>({
    all: 0,
    in_progress: 0,
    completed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Map<PathFilter, LearningPathWithSteps[]>>(new Map());
  const filterRef = useRef<PathFilter>(filter);

  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  const handlePathUpdated = useCallback(
    (id: string, values: RoadmapDetails) => {
      setPaths((prev) =>
        prev.map((path) =>
          path.id === id
            ? { ...path, title: values.title, description: values.description }
            : path,
        ),
      );
      cacheRef.current.clear();
    },
    [],
  );

  const handlePathDeleted = useCallback(
    (id: string, status: Roadmap["status"]) => {
      setPaths((prev) => prev.filter((path) => path.id !== id));
      setCounts((prev) => ({
        all: Math.max(0, prev.all - 1),
        in_progress: Math.max(
          0,
          prev.in_progress - (status === "in_progress" ? 1 : 0),
        ),
        completed: Math.max(
          0,
          prev.completed - (status === "completed" ? 1 : 0),
        ),
      }));
      cacheRef.current.clear();
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;

    const fetchPaths = async () => {
      const cached = cacheRef.current.get(filter);
      if (cached) {
        setPaths(cached);
        setError(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await getRoadmaps(filter);
        if (cancelled) return;
        cacheRef.current.set(filter, response.data);
        setPaths(response.data);
        if (response.counts) {
          setCounts(response.counts);
        }
      } catch (err) {
        if (cancelled) return;
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
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchPaths();

    return () => {
      cancelled = true;
    };
  }, [filter]);

  const revalidate = useCallback(async () => {
    const requestedFilter = filter;
    try {
      const response = await getRoadmaps(requestedFilter);
      if (filterRef.current !== requestedFilter) return;
      cacheRef.current.set(requestedFilter, response.data);
      setPaths(response.data);
      if (response.counts) {
        setCounts(response.counts);
      }
      setError(null);
    } catch {
      // Keep showing the current data if a background refresh fails.
    }
  }, [filter]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") revalidate();
    };

    window.addEventListener("focus", revalidate);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("focus", revalidate);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [revalidate]);

  return (
    <DashboardShell className="flex h-screen w-full flex-col py-8 pr-8">
      <header className="flex shrink-0 items-start justify-between gap-5">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.045em] text-foreground sm:text-[30px]">
            Roadmaps
          </h1>
          <p className="mt-0.5 text-[14px] text-foreground">
            Choose a learning path and start building real skills step by step.
          </p>
        </div>
        <Button asChild variant="primary" size="lg" className="ml-auto">
          <Link href={firstStepPath}>
            <Plus /> New path
          </Link>
        </Button>
      </header>
      <section className="mt-10 flex shrink-0 flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-[21px] font-semibold tracking-[-0.03em] text-foreground">
            Learning paths
          </h2>
          <span className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground font-medium">
            {paths.length} roadmaps
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
      <section className="mt-10 min-h-0 flex-1 overflow-y-auto">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Spinner />
          </div>
        )}

        {error && !isLoading && (
          <Banner variant="destructive" title="Error" description={error} />
        )}

        {!isLoading && !error && paths.length === 0 && (
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

        {!isLoading && !error && paths.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 px-1">
            {paths.map((path) => (
              <RoadmapCard
                key={path.id}
                roadmap={learningPathToRoadmap(path)}
                onUpdated={(values) => handlePathUpdated(path.id, values)}
                onDeleted={(status) => handlePathDeleted(path.id, status)}
              />
            ))}
          </div>
        )}
      </section>
    </DashboardShell>
  );
}
