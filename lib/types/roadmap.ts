import type { Node, NodeProps } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";

// Data types

export type Status = "done" | "in progress" | "upcoming";

export interface Topic {
	id?: string;
	title: string;
	status: Status;
}

export interface ResourceItem {
	title: string;
	url?: string;
	type?: string;
	status?: Status;
}

export interface NoteItem {
	title: string;
	content?: string;
	status?: Status;
}

export interface NodeOverviewTab {
	description: string;
	title: string;
	topics: Topic[];
}

export interface NodeResourcesTab {
	description: string;
	title?: string;
	items: ResourceItem[];
}

export interface NodeNotesTab {
	description: string;
	title?: string;
	items: NoteItem[];
}

export interface NodeData {
	[key: string]: unknown;
	label: string;
	description: string;
	status: Status;
	icon: LucideIcon;
	duration: string;
	overview: NodeOverviewTab;
	resources?: NodeResourcesTab;
	notes?: NodeNotesTab;
}

// Components Props Type

export interface NodeOverviewProps {
	nodeData: NodeData;
	[key: string]: unknown;
}

export interface NodeOverviewTabs {
	overview: NodeOverviewTab;
	resources?: NodeResourcesTab;
	notes?: NodeNotesTab;
}

export interface NodeOverviewBodyProps {
	tabs: NodeOverviewTabs;
	activeTopic: number;
	handleActiveTopic: (idx: number) => void;
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

export interface NodeOverviewFooterProps {
	handleCompleteTopic: () => void;
}

export type RoadmapNodeType = Node<NodeData, "roadmapNode">;

export type RoadmapNodeProps = NodeProps<RoadmapNodeType>;
