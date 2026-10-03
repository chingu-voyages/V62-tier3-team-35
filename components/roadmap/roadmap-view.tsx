"use client";

import { useEffect } from "react";
import {
  ReactFlow,
  useNodesInitialized,
  useNodesState,
  useReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import { TechnologyNode } from "./technology-node";

const nodeTypes = {
  technology: TechnologyNode,
};

type RoadmapViewProps = {
  initialNodes: Node[];
  edges: Edge[];
};

export function RoadmapView({ initialNodes, edges }: RoadmapViewProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const nodesInitialized = useNodesInitialized();
  const { fitView, getViewport, setViewport } = useReactFlow();

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
    const fitRoadmap = async () => {
      await fitView({
        padding: 0.2,
        minZoom: 0.4,
        maxZoom: 1,
      });

      const viewport = getViewport();

      // Keep the roadmap aligned to the top after fitting the view.
      setViewport({
        ...viewport,
        y: 0,
      });
    };

    fitRoadmap();
  }, [nodesInitialized, fitView, getViewport, setViewport]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      nodeTypes={nodeTypes}
      proOptions={{ hideAttribution: true }}
    />
  );
}
