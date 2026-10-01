"use client";

import { ReactFlowProvider, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RoadmapProps, RoadmapTechnologyProps } from "./roadmap.types";
import { RoadmapView } from "./roadmap-view";

function createNodes(roadmap: RoadmapTechnologyProps[]): Node[] {
  return roadmap.map((item, index) => ({
    id: String(index + 1),
    type: "technology",
    position: {
      x: 0,
      y: 0,
    },
    data: {
      technology: item.technology,
      icon: item.icon,
      keyTopics: item.keyTopics,
      estimatedWeeks: item.estimatedWeeks,
    },
  }));
}

function createEdges(roadmap: RoadmapTechnologyProps[]): Edge[] {
  return roadmap.slice(0, -1).map((_, index) => ({
    id: `${index + 1}-${index + 2}`,
    source: String(index + 1),
    target: String(index + 2),
    style: {
      stroke: "var(--muted-foreground)",
      strokeWidth: 2,
    },
    markerEnd: {
      type: "arrow" as const,
    },
  }));
}

export function Roadmap({ roadmap }: RoadmapProps) {
  const nodes = createNodes(roadmap);
  const edges = createEdges(roadmap);

  return (
    <div className="h-full w-full">
      <ReactFlowProvider>
        <RoadmapView initialNodes={nodes} edges={edges} />
      </ReactFlowProvider>
    </div>
  );
}
