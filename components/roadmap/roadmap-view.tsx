"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ReactFlow,
  useNodesInitialized,
  useNodesState,
  useReactFlow,
  type Edge,
  type OnSelectionChangeFunc,
} from "@xyflow/react";
import { RoadmapNode } from "./node";
import NodeOverview from "./node-overview";
import type { RoadmapNodeType } from "@/lib/types/roadmap";

const nodeTypes = {
  roadmapNode: RoadmapNode,
};

type RoadmapViewProps = {
  initialNodes: RoadmapNodeType[];
  edges: Edge[];
  onStepComplete?: (stepId: string) => void;
};

export function RoadmapView({
  initialNodes,
  edges,
  onStepComplete,
}: RoadmapViewProps) {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<RoadmapNodeType>(initialNodes);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const nodesInitialized = useNodesInitialized();
  const { fitView, getViewport, setViewport } = useReactFlow();
  const [activeTopic, setActiveTopic] = useState<number>(0);

  useEffect(() => {
    if (!nodesInitialized) return;

    const gap = 30;

    // Position roadmap nodes vertically with a fixed gap between them.
    setNodes((currentNodes) => {
      let y = 0;

      return currentNodes.map((node) => {
        const updatedNode = {
          ...node,
          position: {
            ...node.position,
            y,
          },
        };

        y += (node.measured?.height ?? 0) + gap;

        return updatedNode;
      });
    });
  }, [nodesInitialized, setNodes]);

  useEffect(() => {
    if (!nodesInitialized) return;

    // Fit all roadmap nodes into the available viewport.
    const frame = requestAnimationFrame(async () => {
      await fitView({
        padding: {
          top: 0.24,
          bottom: 0.2,
          left: 0.2,
          right: 0.2,
        },
        minZoom: 0.8,
        maxZoom: 1.2,
      });

      const navbarHeight =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--navbar-height",
          ),
        ) || 0;

      // Keep the roadmap aligned to the top and nudge it left after fitting.
      const viewport = getViewport();
      setViewport({
        ...viewport,
        x: viewport.x - 120,
        y: navbarHeight + 90,
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [nodesInitialized, fitView, getViewport, setViewport]);

  const onSelectionChange: OnSelectionChangeFunc<RoadmapNodeType, Edge> =
    useCallback((all) => {
      const onlyNodes = all.nodes;
      if (onlyNodes.length > 0) {
        const selectedNode = onlyNodes[0];
        setSelectedNodeId(selectedNode.id);
        const listTopics = selectedNode.data.overview.topics;
        const inProgressIdx = listTopics.findIndex(
          (topic) => topic.status === "in_progress",
        );
        const upcomingIdx = listTopics.findIndex(
          (topic) => topic.status === "upcoming",
        );
        const topic =
          inProgressIdx !== -1
            ? inProgressIdx
            : upcomingIdx !== -1
              ? upcomingIdx
              : 0;
        setActiveTopic(topic);
      } else {
        setSelectedNodeId(null);
        setActiveTopic(0);
      }
    }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  return (
    <div className="relative w-full h-svh">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        onSelectionChange={onSelectionChange}
        onPaneClick={onPaneClick}
        nodesDraggable={false}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
      />

      {selectedNode && (
        <NodeOverview
          nodeData={selectedNode.data}
          setNodes={setNodes}
          nodes={nodes}
          activeNodeID={selectedNode.id}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
          setSelectedNodeId={setSelectedNodeId}
          onStepComplete={onStepComplete}
        />
      )}
    </div>
  );
}

export default RoadmapView;
