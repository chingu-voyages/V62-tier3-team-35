"use client";

import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { NodeMouseHandler } from '@xyflow/react';
import { NodeData, RoadmapNodeType } from '@/lib/types/roadmap';
import { useCallback, useState } from 'react';
import { RoadmapNode } from './node';
import NodeOverview from './node-overview';
import { initialEdges, initialNodes } from '@/lib/data/roadmap';

const nodeTypes = { roadmapNode: RoadmapNode };

export default function Roadmap() {
	const [showDetails, setShowDetails] = useState<boolean>(false);
	const [nodeData, setNodeData] = useState<NodeData | null>(null);

	const onNodeClick: NodeMouseHandler<RoadmapNodeType> = useCallback((_, node) => {
		setShowDetails(true);
		setNodeData(node.data);
	}, []);

	return (
		<div className="w-full h-screen bg-background relative">
			<div className="w-full h-full">
				<ReactFlow
					nodes={initialNodes}
					edges={initialEdges}
					nodeTypes={nodeTypes}
					onNodeClick={onNodeClick}
				>
					<Background />
					<Controls />
				</ReactFlow>
			</div>

			{showDetails && nodeData && <NodeOverview nodeData={nodeData} />}
		</div >
	);
}
