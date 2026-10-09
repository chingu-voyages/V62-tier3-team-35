"use client";

import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { Edge, NodeMouseHandler, NodeSelectionChange, OnSelectionChangeFunc } from '@xyflow/react';
import { NodeData, RoadmapNodeType } from '@/lib/types/roadmap';
import type { MouseEvent } from 'react';
import { useCallback, useState } from 'react';
import { RoadmapNode } from './node';
import NodeOverview from './node-overview';
import { initialEdges, initialNodes } from '@/lib/data/roadmap';
import { useNodesState } from '@xyflow/react';

const nodeTypes = { roadmapNode: RoadmapNode };

export default function Roadmap() {
	const [showDetails, setShowDetails] = useState<boolean>(false);
	// Active node, is the current active node by id 
	const [activeNodeID, setActiveNodeID] = useState<string | null>(null);
	const [nodeData, setNodeData] = useState<NodeData | null>(null);

	const [nodes, setNodes, onNodesChange] = useNodesState<RoadmapNodeType>(initialNodes)

	const onSelectionChange: OnSelectionChangeFunc<RoadmapNodeType, Edge> = useCallback((all) => {
		// Return the node in 
		console.log("allNodes:", all);
		const onlyNodes = all.nodes;
		if (onlyNodes.length) {
			const currNode = onlyNodes[0];
			console.log("Node:", currNode);
			setShowDetails(true);
			setNodeData(currNode.data);
			setActiveNodeID(currNode.id);
		} else {
			// If the user use the keyboard for shifting away from the selected node
			// With tab,esc ...
			setShowDetails(false);
			setActiveNodeID(null);
			setNodeData(null);
		}
	}, []);

	const onPaneClick = useCallback(() => {
		setShowDetails(false);
		setActiveNodeID(null);
		setNodeData(null);
	}, []);


	return (
		<div className="w-full h-screen bg-background relative">
			<div className="w-full h-full">
				<ReactFlow
					nodes={nodes}
					edges={initialEdges}
					nodeTypes={nodeTypes}
					nodesDraggable={false}
					nodesConnectable={false}
					onSelectionChange={onSelectionChange}
					onNodesChange={onNodesChange}
					onPaneClick={onPaneClick}
				>
					<Background />
				</ReactFlow>
			</div>

			{showDetails && nodeData && <NodeOverview nodeData={nodeData} setNodes={setNodes} nodes={nodes} activeNodeID={activeNodeID} />}
		</div>
	);
}
