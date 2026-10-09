import { cn } from "@/lib/utils";
import { statusNodeStyle } from "./card-node";
import { Button } from '@/components/ui/button';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs"

import type { NodeOverviewStatsProps, NodeOverviewBodyProps, NodeOverviewHeaderProps, NodeOverviewProps } from "@/lib/types/roadmap";
import { useState } from "react";
import { CircleCheck, Clock2, Ellipsis, MessageSquareText, Play, Check } from 'lucide-react';

function NodeOverviewHeader({ icon: Icon, label, description }: NodeOverviewHeaderProps) {
	return (
		<header className='flex gap-5 pb-3'>

			<div className='grid place-content-center size-14 bg-foreground rounded-full text-background'>
				<Icon />
			</div>

			<div className=''>
				<h3 className='text-2xl font-semibold'>
					{label}
				</h3>
				<p className="text-(--accent-text) text-sm">
					{description}
				</p>
			</div>

			<Button
				variant="outline"
				size="icon-lg"
				className='rounded-full ml-auto'
			>
				<Ellipsis className='size-5' />
			</Button>
		</header>

	)
}

function NodeOverviewBody({ tabs, activeTopic, handleActiveTopic }: NodeOverviewBodyProps) {
	const tabsOverview = Object.keys(tabs);
	return (
		<Tabs defaultValue="overview" className="w-[400px] gap-6 pb-12">
			<TabsList variant="line" className='border-b w-full max-w-[400px]'>
				{tabsOverview.map((tab) => (
					<TabsTrigger key={tab} value={tab} className='capitalize justify-start'>{tab}</TabsTrigger>
				))}
			</TabsList>

			<TabsContent value="overview">
				<p className='text-muted-foreground pb-7'> {tabs.overview.description} </p>

				<div className='flex justify-between w-full items-center pb-5'>
					<h3 className="font-semibold"> {tabs.overview.title} ({tabs.overview.topics.length})</h3>
					<span className='text-sm text-muted-foreground'>
						{tabs.overview.topics.filter((el) => el.status === "done").length}/{tabs.overview.topics.length}
					</span>

				</div>

				<ul>
					{tabs.overview.topics.map((el, idx) => (
						<li
							key={el.title}
							className={`${idx == activeTopic ? "text-foreground" : "text-muted-foreground"} flex gap-4 pb-1 items-center`}
							tabIndex={idx}
							onClick={() => handleActiveTopic(idx)}
						>
							{el.status === "done" ?
								(
									<div className="rounded-full size-7 bg-(--done-color) grid place-content-center">
										<Check className="size-4 text-white" />
									</div>
								)
								:
								(
									<div className={`rounded-full size-7 ${idx == activeTopic ? "border-[#4666FF] border-10" : "border-3"}`} />
								)
							}

							{el.title}
						</li>
					))}
				</ul>
			</TabsContent>


			<TabsContent value="resources">
				<p className='text-muted-foreground'> {tabs.resources?.description} </p>
			</TabsContent>

			<TabsContent value="notes">
				<p className='text-muted-foreground'> {tabs.notes?.description} </p>
			</TabsContent>

		</Tabs>
	)
}


function NodeOverviewStats({ status, duration }: NodeOverviewStatsProps) {
	return (
		<div className='pb-7 flex gap-2'>
			<div className={cn(statusNodeStyle({ status }), "text-sm px-3")}>
				<div className="size-1.5 rounded-full bg-current" />
				<span className="sr-only"> Status: </span>
				{status}
			</div>

			<div className={cn(statusNodeStyle({ status: "upcoming" }), "text-sm px-3")}>
				<Clock2 className='size-4' />
				<span className="sr-only">Duration: </span>
				{duration ?? "1 week"}
			</div>
		</div>
	)
}

function NodeOverviewFooter({ handleCompleteTopic }) {
	return (
		<div className='flex flex-col gap-3'>
			<Button variant="primary" size="lg" className='w-full'>
				<Play />
				Continue Learning
			</Button>

			<Button variant="secondary" size="lg" className='w-full'
				onClick={() => handleCompleteTopic()}
			>
				<CircleCheck />
				Mark as complete
			</Button>

			<Button variant="secondary" size="lg" className='w-full'>
				<MessageSquareText />
				Add a note
			</Button>
		</div>
	)
}

export default function NodeOverview({ nodeData, setNodes, nodes, activeNodeID }: NodeOverviewProps) {
	// Find the first el with the status in progress
	const listTopics = nodeData.overview.topics;
	// const listTopics = nodeData.tabs.overview.topics.listTopics;
	const inProgressIdx = listTopics.findIndex((topic) => topic.status === "in progress");
	// Choose active topic, by index 0 (first) by deafult.
	const [activeTopic, setActiveTopic] = useState<number>(inProgressIdx);
	// Change the state of the current activeTopic to "in progress | up coming"  to "done"
	// const [completeTopic, setCompleteTopic] = useState<number>();

	const tabs = { overview: nodeData.overview, notes: nodeData.notes, resources: nodeData.resources };

	function handleCompleteTopic() {
		if (listTopics[activeTopic].status != "done") {
			let newNodes = nodes.map((node) => {
				if (node.id === activeNodeID) {
					// node.data.tabs.overview.topics.listTopics[activeTopic].status = "done";
				}
				return node;
			})
			setNodes(newNodes)
		}
	}

	function handleActiveTopic(idx: number) {
		if (listTopics[idx].status !== "done") {
			setActiveTopic(idx);
		}
	}

	return (
		<div className='absolute top-0 right-0 bg-card p-6 rounded-2xl text-card-foreground shadow-lg [--accent-text:#6570C7] [--done-color:#42B229] [--progress-bg:#EDF2FF] [--progress-color:#2E6BFF] [--upcoming-bg:#F5F6F3]'>
			<NodeOverviewHeader
				icon={nodeData.icon}
				label={nodeData.label}
				description={nodeData.description}
			/>
			<NodeOverviewStats
				status={nodeData.status}
				duration={nodeData.duration}
			/>
			<NodeOverviewBody
				tabs={tabs}
				activeTopic={activeTopic}
				handleActiveTopic={handleActiveTopic}
			/>
			<NodeOverviewFooter
				handleCompleteTopic={handleCompleteTopic}
			/>
		</div>
	)
}
