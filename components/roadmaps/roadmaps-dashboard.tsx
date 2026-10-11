"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useState } from "react";

import { firstStepPath } from "@/components/generate-path/step-config";
import { AppSidebar } from "@/components/common/sidebar";
import { Button } from "@/components/ui/button";
import { RoadmapCard } from "@/components/roadmaps/roadmap-card";
import { roadmaps } from "@/components/roadmaps/roadmaps-data";
import { cn } from "cn";
import { FilterTabs, PathFilter } from "./filter-tabs";
import { SortMenu, SortValue } from "./sort-menu";

export function RoadmapsDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [filter, setFilter] = useState<PathFilter>("in-progress");
  const [sort, onSortChange] = useState<SortValue>("recent");

  return (
    <div className="flex bg-[#FAFBF7] min-h-screen">
      <AppSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />

      <main
        className={cn(
          "py-8 pr-8 transition-[padding] duration-300",
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
              {roadmaps.length} roadmaps
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FilterTabs
              value={filter}
              onValueChange={setFilter}
              counts={{ all: 8, "in-progress": 3, completed: 4, archived: 1 }}
            />

            <SortMenu sort={sort} onSortChange={onSortChange} />
          </div>
        </section>
        <section className="mt-10">
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {roadmaps.map((roadmap, i) => (
              <RoadmapCard key={i} roadmap={roadmap} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
