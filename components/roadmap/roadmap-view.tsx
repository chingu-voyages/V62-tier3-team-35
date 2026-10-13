"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Background,
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
};

export function RoadmapView({ initialNodes, edges }: RoadmapViewProps) {
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
    <div
      className="relative w-full h-full"
      style={{ height: "calc(100svh - var(--navbar-height))" }}
    >
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
      >
        <Background />
      </ReactFlow>

      {selectedNode && (
        <NodeOverview
          nodeData={selectedNode.data}
          setNodes={setNodes}
          nodes={nodes}
          activeNodeID={selectedNode.id}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
          setSelectedNodeId={setSelectedNodeId}
        />
      )}
    </div>
  );
}

export default RoadmapView;
