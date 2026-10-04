import type { Node, NodeProps } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";

// Data types

export type Status = "done" | "in progress" | "upcoming";

export interface Overview {
	description: string;
	topics: {
		title: string;
		listTopics: {
			title: string;
			status: Status;
		}[];
	};
}

export interface Resources {
	description: string;
	body: {
		title: string;
		content: {
			title: string;
			status: Status;
		}[];
	};
}

export interface Notes {
	description: string;
	body: {
		title: string;
		content: {
			title: string;
			status: Status;
		}[];
	};
}

export interface Tabs {
	overview: Overview;
	resources: Resources;
	notes: Notes;
}

export interface NodeData {
	[key: string]: unknown;
	label: string;
	description: string;
	status: Status;
	icon: LucideIcon;
	duration: string;
	tabs: Tabs;
}

// Components Props Type

export interface NodeOverviewProps {
	nodeData: NodeData;
}

export interface NodeOverviewBodyProps {
	tabs: Tabs;
}

export interface NodeOverviewHeaderProps {
	label: string;
	description: string;
	icon: LucideIcon;
}

export interface NodeOverviewStatsProps {
	status: Status;
	duration: string;
}

export type RoadmapNodeType = Node<NodeData, "roadmapNode">;

export type RoadmapNodeProps = NodeProps<RoadmapNodeType>;

