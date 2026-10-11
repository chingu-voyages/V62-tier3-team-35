import type { Node, NodeProps } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import { NoteSchemaType } from "../schemas/roadmap-notes";

export type Status = "done" | "in progress" | "upcoming";

export interface Topic {
  id: string;
  name: string;
  status: Status;
  isCompleted: boolean;
}

export interface ResourceItem {
  title: string;
  type: string;
  url: string;
  description: string;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface NodeOverviewTab {
  description: string;
  title: string;
  topics: Topic[];
}

export interface NodeResourcesTab {
  description: string;
  title: string;
  items: ResourceItem[];
}

export interface NodeNotesTab {
  description: string;
  title: string;
  items: NoteItem[];
}

export interface NodeData {
  [key: string]: unknown;
  id: string;
  title: string;
  description: string;
  keyTopics: string;
  status: Status;
  icon: LucideIcon | string;
  estimatedTime: string;
  isCompleted: boolean;
  overview: NodeOverviewTab;
  resources: NodeResourcesTab;
  notes: NodeNotesTab;
}

export interface DbTopic {
  id: string;
  name: string;
  status: string;
  isCompleted: boolean;
  resources?: unknown;
}

export interface DbStep {
  id: string;
  title: string;
  description: string;
  keyTopics: string;
  icon?: string | null;
  estimatedTime: number | string;
  status: string;
  isCompleted: boolean;
  topics: DbTopic[];
  notes?: NoteItem[];
}

// Canonical Aliases & Prop Types
export type StepData = NodeData;
export type RoadmapStepProps = DbStep;
export type RoadmapTopicProps = Topic;
export type RoadmapResourceProps = ResourceItem;
export type RoadmapNoteProps = NoteItem;

export type RoadmapProps = {
  roadmap?: DbStep[];
};

export type RoadmapNodeType = Node<NodeData, "roadmapNode">;
export type RoadmapNodeProps = NodeProps<RoadmapNodeType>;

export interface NodeOverviewTabs {
  overview: NodeOverviewTab;
  resources: NodeResourcesTab;
  notes: NodeNotesTab;
}

export interface NodeOverviewProps {
  nodeData: NodeData;
  setNodes?: (
    nodes: RoadmapNodeType[] | ((prev: RoadmapNodeType[]) => RoadmapNodeType[]),
  ) => void;
  nodes?: RoadmapNodeType[];
  activeNodeID?: string | null;
  [key: string]: unknown;
}

export interface NodeOverviewBodyProps {
  tabs: NodeOverviewTabs;
  activeTopic: number;
  activeTopicName: string;
  handleActiveTopic: (idx: number) => void;
  handleAddNote: (data: NoteSchemaType) => void;
  handleDeleteNote: (id: string) => void;
  handleEditNote: (id: string, note: NoteSchemaType) => void;
}

export type NoteFormHandler =
  | ((data: NoteSchemaType) => Promise<void> | void)
  | ((id: string, data: NoteSchemaType) => Promise<void> | void);

export interface NodeAddNoteProps {
  inProgressTopic?: string;
  handleFunction: NoteFormHandler;
  isEditing?: boolean;
  note?: NoteItem;
  noteID?: string;
  children?: React.ReactNode;
}

export interface NodeOverviewFooterProps {
  handleCompleteTopic: () => void;
  activeTopicName: string;
  handleAddNote: (data: NoteSchemaType) => void;
}

export interface NodeOverviewHeaderProps {
  icon: LucideIcon | string;
  title: string;
  keyTopics: string;
}

export interface NodeOverviewStatsProps {
  status: Status;
  estimatedTime: string;
}
