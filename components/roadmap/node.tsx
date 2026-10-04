import CardNode from "./card-node";
import type { RoadmapNodeProps } from "@/lib/types/roadmap";

export function RoadmapNode(props: RoadmapNodeProps) {
  const { label, icon, description, status, duration } = props.data;
  return (
    <CardNode
      id={props.id}
      label={label}
      icon={icon}
      description={description}
      status={status}
      duration={duration}
      selected={props.selected}
    />
  )
}
