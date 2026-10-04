"use client";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Check, ChevronDown, EllipsisVertical } from "lucide-react";
import { Position, Handle } from '@xyflow/react';
import type { Status } from "@/lib/types/roadmap";

export const statusNodeStyle = cva(
	"px-2 py-1 text-[11px]/2.5 font-medium rounded-full flex gap-2 items-center capitalize w-fit",
	{
		variants: {
			status: {
				"in progress": "bg-(--progress-bg) text-(--progress-color)",
				"upcoming": "bg-(--upcoming-bg) text-muted-foreground",
				"done": "bg-(--done-color) text-white"
			},
		},
		defaultVariants: {
			status: "upcoming"
		}
	}
)

interface StatusNodeProps { status: Status; }
function StatusNode({ status }: StatusNodeProps) {
	if (status === "done") return null;

	return (
		<div className={statusNodeStyle({ status })}>
			<div className="size-1.5 rounded-full bg-current" />
			<span className="sr-only"> Status: </span>
			{status}
		</div>
	)
}

interface CardHeaderNodeProps {
	selected: boolean;
	status: Status;
	icon: LucideIcon;
	label: string;
	description: string;
}
function CardHeaderNode({ selected, status, icon: Icon, label, description }: CardHeaderNodeProps) {
	return (
		<div className="flex gap-2 justify-between">
			<div className="flex items-center gap-2 pb-9">
				<div className={cn(
					"rounded-full size-10 bg-secondary text-secondary-foreground grid place-content-center transition-colors shrink-0",
					selected && "bg-foreground text-background",
					status === "done" && "bg-(--done-color) text-white")}
					aria-hidden="true"
				>
					{status === "done"
						?
						(<Check className="size-5" />)
						:
						(<Icon className="size-5" />)
					}
				</div>

				<div>
					<h4 className="text-foreground font-semibold capitalize"> {label} </h4>
					<p className="text-muted-foreground text-xs">  {description} </p>
				</div>

			</div>
			<EllipsisVertical className="size-4.5" />
		</div>
	)
}

interface CardFooterNodeProps {
	status: Status;
	duration: string;
}
export function CardFooterNode({ status, duration }: CardFooterNodeProps) {
	return (
		<div className="flex justify-between items-center">
			<StatusNode status={status} />
			<p className="text-muted-foreground text-xs/5">
				<span className="sr-only"> Duration: </span>
				{duration}
			</p>
		</div>
	)
}

interface CardNodeProps {
	id: string;
	label: string;
	icon: LucideIcon;
	description: string;
	// TODO: type this better, take the enum somewhere else.
	status: Status;
	duration: string;
	selected: boolean;
}
export default function CardNode({ id, label, icon, description, status, duration, selected }: CardNodeProps) {
	return (
		<div className="[--done-bg:#F0FFC4AB] [--done-color:#42B229] [--progress-bg:#EDF2FF] [--progress-color:#2E6BFF] [--upcoming-bg:#F5F6F3] [--selected-border:#2E6BFF] [--arrow-fg:#788294EB]">

			<div className={cn(
				"text-updater-node rounded-2xl p-3.5 text-card-foreground border-2 transition-colors mt-1.5 w-[250px]",
				status === "done" ? "bg-(--done-bg) border-transparent" : "bg-card",
				selected && "border-(--selected-border)"
			)}

			>
				<CardHeaderNode
					selected={selected}
					status={status}
					icon={icon}
					label={label}
					description={description}
				/>
				{status !== "done" && (
					<CardFooterNode
						status={status}
						duration={duration}
					/>)}
			</div>

			<Handle
				type="source"
				position={Position.Bottom}
				style={{
					background: 'none',
					border: 'none',
					width: '1px',
					height: '1px',
				}}
			/>
			<Handle
				type="target"
				position={Position.Top}
				style={{
					background: 'none',
					border: 'none',
					width: '1em',
					height: '1em',
				}}
			>
				<ChevronDown className="pointer-none absolute top-1/2 left-1/2 -translate-1/2 size-4 text-(--arrow-fg) [[data-nodeid='n1']_&]:hidden" />
			</Handle>
		</div>
	);
}
