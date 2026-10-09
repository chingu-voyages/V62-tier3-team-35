"use client";

import { ReactFlowProvider, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RoadmapProps, RoadmapStepProps } from "./roadmap.types";
import { RoadmapView } from "./roadmap-view";
import { initialNodes as mockNodes, initialEdges as mockEdges } from "@/lib/data/roadmap";

// Convert roadmap steps into React Flow nodes.
function createNodes(roadmap: RoadmapStepProps[]): Node[] {
  return roadmap.map((item, index) => ({
    id: item.id || String(index + 1),
    type: "technology",
    position: {
      x: 0,
      y: 0,
    },
    data: {
      ...item,
      label: item.title,
      description: item.description || item.keyTopics,
      duration: `${item.estimatedTime} weeks`,
      status: item.status ?? (item.isCompleted ? "done" : index === 0 ? "in progress" : "upcoming"),
    },
  }));
}

// Create connections between roadmap nodes.
function createEdges(roadmap: RoadmapStepProps[]): Edge[] {
  return roadmap.slice(0, -1).map((item, index) => {
    const currentId = item.id || String(index + 1);
    const nextId = roadmap[index + 1].id || String(index + 2);
    return {
      id: `${currentId}-${nextId}`,
      source: currentId,
      target: nextId,
      style: {
        stroke: "var(--muted-foreground)",
        strokeWidth: 2,
      },
      markerEnd: {
        type: "arrow" as const,
      },
    };
  });
}

export function Roadmap({ roadmap }: RoadmapProps) {
  const effectiveRoadmap = roadmap && roadmap.length > 0 ? roadmap : undefined;
  const nodes = effectiveRoadmap ? createNodes(effectiveRoadmap) : (mockNodes as unknown as Node[]);
  const edges = effectiveRoadmap ? createEdges(effectiveRoadmap) : mockEdges;

  return (
    <div className="h-full w-full relative">
      <ReactFlowProvider>
        <RoadmapView initialNodes={nodes} edges={edges} />
      </ReactFlowProvider>
    </div>
  );
}

export default Roadmap;
