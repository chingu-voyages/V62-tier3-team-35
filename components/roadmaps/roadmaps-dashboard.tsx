"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { firstStepPath } from "@/components/generate-path/step-config";
import { AppSidebar } from "@/components/common/sidebar";
import { Button } from "@/components/ui/button";
import { RoadmapCard } from "@/components/roadmaps/roadmap-card";
import { cn } from "cn";
import { FilterTabs, PathFilter } from "./filter-tabs";
import { SortMenu, SortValue } from "./sort-menu";
import { getRoadmaps } from "@/lib/api/paths";
import { Spinner } from "@/components/ui/spinner";
import { Banner } from "@/components/common/banner";
import {
  learningPathToRoadmap,
  type LearningPathWithSteps,
} from "./roadmaps-utils";

export function RoadmapsDashboard() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [filter, setFilter] = useState<PathFilter>("all");
  const [sort, onSortChange] = useState<SortValue>("recent"); // kept for compatibility with SortMenu but not used for filtering
  const [paths, setPaths] = useState<LearningPathWithSteps[]>([]);
  const [counts, setCounts] = useState<Record<PathFilter, number>>({
    all: 0,
    "in-progress": 0,
    completed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const cacheRef = useRef<Map<PathFilter, LearningPathWithSteps[]>>(new Map());

  const invalidateCache = useCallback(() => {
    cacheRef.current.clear();
    setReloadKey((key) => key + 1);
  }, []);

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
  }, [filter, reloadKey]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") invalidateCache();
    };

    window.addEventListener("focus", invalidateCache);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("focus", invalidateCache);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [invalidateCache]);

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
        <section className="mt-10">
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
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {paths.map((path) => (
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
