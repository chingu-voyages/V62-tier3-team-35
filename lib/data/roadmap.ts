import { CodeXml, GitBranch, ToyBrick } from 'lucide-react';
import type { Overview, Resources, Notes } from "@/lib/types/roadmap";

const overview: Overview = {
	description: "Learn the core concepts of JavaScript, the language of the web. Build a strong foundation (ES6+) and practice with real examples.",
	topics: {
		title: "Topics",
		listTopics: [
			{
				title: "Variables and data types",
				status: "done",
			},
			{
				title: "Functions and scope",
				status: "done",
			},
			{
				title: "DOM manipulation",
				status: "in progress",
			},
			{
				title: "ES6+ features",
				status: "upcoming",
			},
			{
				title: "Asynchronous JavaScript",
				status: "upcoming",
			},
			{
				title: "Error handling",
				status: "upcoming",
			},
		]
	}

}

const resources: Resources = {
	description: "Here it's all the resources for you",
	body: {
		title: "Best resources for you",
		content: [
			{
				title: "Variables and data types",
				status: "done",
			},
			{
				title: "Functions and scope",
				status: "done",
			},
			{
				title: "DOM manipulation",
				status: "in progress",
			},
			{
				title: "ES6+ features",
				status: "upcoming",
			},
			{
				title: "Asynchronous JavaScript",
				status: "upcoming",
			},
			{
				title: "Error handling",
				status: "upcoming",
			},
		]
	}
}

const notes: Notes = {
	description: "Your notes",
	body: {
		title: "Your notes",
		content: [
			{
				title: "Variables and data types",
				status: "done",
			},
			{
				title: "Functions and scope",
				status: "done",
			},
			{
				title: "DOM manipulation",
				status: "in progress",
			},
			{
				title: "ES6+ features",
				status: "upcoming",
			},
			{
				title: "Asynchronous JavaScript",
				status: "upcoming",
			},
			{
				title: "Error handling",
				status: "upcoming",
			},
		]
	}
}

export const initialNodes = [
	{
		id: 'n1',
		position: { x: 0, y: 0 },
		data: {
			label: 'Foundation',
			description: "HTML, CSS, responsive design",
			status: "done",
			icon: ToyBrick,
			duration: "3 weeks",
			tabs: {
				overview,
				resources,
				notes,
			},
		},
		type: 'roadmapNode',
	},
	{
		id: 'n2',
		position: { x: 0, y: 180 },
		data: {
			label: 'Javascript core',
			icon: CodeXml,
			description: "ES6+, DOM, Events",
			status: "in progress",
			duration: "3 weeks",
			tabs: {
				overview,
				resources,
				notes,
			},
		},
		type: 'roadmapNode',
	},
	{
		id: 'n3',
		position: { x: 0, y: 360 },
		data: {
			label: 'Git & GitHub',
			description: "Version control, PRs",
			status: "upcoming",
			icon: GitBranch,
			duration: "1 week",
			tabs: {
				overview,
				resources,
				notes,
			},
		},
		type: 'roadmapNode',
	}
];

export const initialEdges = [
	{
		id: 'n1-n2',
		source: 'n1',
		target: 'n2',
	},
	{
		id: 'n2-n3',
		source: 'n2',
		target: 'n3',
	},
];
