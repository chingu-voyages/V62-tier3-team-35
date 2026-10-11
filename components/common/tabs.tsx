"use client";

import { cn } from "cn";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type RoadmapTabItem = {
  value: string;
  label: string;
  count?: number;
};

type RoadmapTabsProps = {
  items: RoadmapTabItem[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
};

export function RoadmapTabs({
  items,
  value,
  onValueChange,
  className,
}: RoadmapTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList variant="line" className={cn("gap-1.5", className)}>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value} className="h-8 gap-1.5 px-2">
            {item.label}
            {typeof item.count !== "undefined" && (
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-foreground/10 px-1.5 py-0.5 text-[11px] font-semibold text-foreground tabular-nums">
                {item.count}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}