"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FILTERS = [
  { value: "all", label: "All Paths" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
] as const;

export type PathFilter = (typeof FILTERS)[number]["value"];

type PathFilterTabsProps = {
  value: PathFilter;
  onValueChange: (value: PathFilter) => void;
  counts: Record<PathFilter, number>;
};

export function FilterTabs({
  value,
  onValueChange,
  counts,
}: PathFilterTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onValueChange(v as PathFilter)}
      className="h-11"
    >
      <TabsList className="rounded-full border bg-card p-0 group-data-horizontal/tabs:h-11">
        {FILTERS.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="group h-11 flex-none gap-2 rounded-full border-0 px-5 text-xs text-[#475467] shadow-none transition-colors not-data-[state=active]:hover:bg-secondary data-[state=active]:bg-foreground data-[state=active]:text-white data-[state=active]:shadow-none cursor-pointer"
          >
            {label}
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-secondary px-1.5 text-xs font-semibold text-card-foreground group-data-[state=active]:bg-transparent group-data-[state=active]:text-white">
              {counts[value]}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
