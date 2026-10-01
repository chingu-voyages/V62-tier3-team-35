"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { RoadmapTechnologyProps } from "./roadmap.types";
import { EllipsisVertical, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

export function TechnologyNode({
  data,
}: NodeProps & { data: RoadmapTechnologyProps }) {
  const Icon =
    (Icons[data.icon as keyof typeof Icons] as LucideIcon | undefined) ??
    Icons.Code2;

  return (
    <div className="w-72 p-3.5 rounded-xl border bg-card">
      <Handle type="target" position={Position.Top} className="invisible" />

      <div className="flex justify-between items-start gap-2 mb-7">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-muted">
          <Icon className="size-4" />
        </div>
        <div>
          <h3 className="font-semibold">{data.technology}</h3>
          <p className="mt-2 text-xs text-muted-foreground">{data.keyTopics}</p>
        </div>
        <button>
          <EllipsisVertical className="shrink-0 size-4" />
        </button>
      </div>

      <div className="flex justify-between items-end gap-2 text-[11px] text-muted-foreground">
        <div className="flex gap-2 items-center">
          <span className="block size-1.5 rounded-full bg-muted-foreground" />
          <p>Upcoming</p>
        </div>

        <p>{data.estimatedWeeks} weeks</p>
      </div>
      <Handle type="source" position={Position.Bottom} className="invisible" />
    </div>
  );
}
