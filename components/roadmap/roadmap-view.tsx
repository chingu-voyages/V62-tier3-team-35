"use client";

import { useEffect } from "react";
import {
  ReactFlow,
  useNodesInitialized,
  useNodesState,
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

  useEffect(() => {
    if (!nodesInitialized) return;

    const gap = 30;

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

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      nodeTypes={nodeTypes}
    />
  );
}
