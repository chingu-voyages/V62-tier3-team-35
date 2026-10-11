import CardNode from "./card-node";
import type { RoadmapNodeProps } from "@/lib/types/roadmap";

export function RoadmapNode(props: RoadmapNodeProps) {
  const { title, icon, description, status, estimatedTime } = props.data;
  return (
    <CardNode
      title={title}
      icon={icon}
      description={description}
      status={status}
      estimatedTime={estimatedTime}
      selected={Boolean(props.selected)}
    />
  );
}

export default RoadmapNode;
