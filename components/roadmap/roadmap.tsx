"use client";

import { ReactFlowProvider, type Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { ResourceItem, RoadmapNodeType, RoadmapProps, RoadmapStepProps, Status } from "@/lib/types/roadmap"
import { RoadmapView } from "./roadmap-view";

export function createNodesFromDb(steps: RoadmapStepProps[]): RoadmapNodeType[] {
  const firstIncompleteStepIdx = steps.findIndex((s) => !s.isCompleted);
  const activeStepIdx = firstIncompleteStepIdx !== -1 ? firstIncompleteStepIdx : 0;

  return steps.map((step, stepIndex) => {
    let stepStatus: Status = "upcoming";
    if (step.isCompleted || step.status === "done") {
      stepStatus = "done";
    } else if (stepIndex === activeStepIdx) {
      stepStatus = "in progress";
    }

    const firstIncompleteTopicIdx = step.topics.findIndex((t) => !t.isCompleted);
    const activeTopicIdx = firstIncompleteTopicIdx !== -1 ? firstIncompleteTopicIdx : 0;

    const topics = step.topics.map((t, topicIndex) => {
      let topicStatus: Status = "upcoming";
      if (stepStatus === "done" || t.isCompleted || t.status === "done") {
        topicStatus = "done";
      } else if (stepStatus === "in progress" && topicIndex === activeTopicIdx) {
        topicStatus = "in progress";
      }

      return {
        id: t.id,
        name: t.name,
        status: topicStatus,
        isCompleted: topicStatus === "done",
      };
    });

    const resources = step.topics.flatMap((t) =>
      Array.isArray(t.resources) ? (t.resources as ResourceItem[]) : []
    );

    return {
      id: step.id,
      type: "roadmapNode" as const,
      position: { x: 0, y: 0 },
      data: {
        id: step.id,
        title: step.title,
        description: step.description,
        keyTopics: step.keyTopics,
        estimatedTime: `${step.estimatedTime} weeks`,
        status: stepStatus,
        icon: step.icon || "Code2",
        isCompleted: stepStatus === "done",
        overview: {
          title: "Topics",
          description: step.description,
          topics,
        },
        resources: {
          title: "Resources",
          description: "Learning resources for this step",
          items: resources,
        },
        notes: {
          title: "Notes",
          description: "Personal notes for this step",
          items: step.notes ?? [],
        },
      },
    };
  });
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
        color: "var(--muted-foreground)",
      },
    };
  });
}

export function Roadmap({ roadmap }: RoadmapProps) {
  if (!roadmap || roadmap.length === 0) return null;

  const nodes = createNodesFromDb(roadmap);
  const edges = createEdges(roadmap);

  return (
    <div className="h-full w-full relative">
      <ReactFlowProvider>
        <RoadmapView initialNodes={nodes} edges={edges} />
      </ReactFlowProvider>
    </div>
  );
}

export default Roadmap;
