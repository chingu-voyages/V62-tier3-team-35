import { CodeXml, GitBranch, ToyBrick } from 'lucide-react';
import type { NodeOverviewTab, NodeResourcesTab, NodeNotesTab, RoadmapNodeType } from "@/lib/types/roadmap";

// Foundation Tab Content
const foundationOverview: NodeOverviewTab = {
	description: "Learn the core concepts of JavaScript, the language of the web. Build a strong foundation (ES6+) and practice with real examples.",
	title: "Topics",
	topics: [
		{ title: "Variables and data types", status: "done" },
		{ title: "Functions and scope", status: "done" },
		{ title: "DOM manipulation", status: "in progress" },
		{ title: "ES6+ features", status: "upcoming" },
		{ title: "Asynchronous JavaScript", status: "upcoming" },
		{ title: "Error handling", status: "upcoming" },
	],
};

const foundationResources: NodeResourcesTab = {
	description: "Here it's all the resources for you",
	title: "Best resources for you",
	items: [
		{ title: "MDN Web Docs - JavaScript Basics", status: "done" },
		{ title: "JavaScript.info - The Modern Tutorial", status: "done" },
		{ title: "Eloquent JavaScript - Program Structure", status: "in progress" },
		{ title: "DOM Enlightenment - Traversing & Events", status: "upcoming" },
	],
};

const foundationNotes: NodeNotesTab = {
	description: "Your notes",
	title: "Your notes",
	items: [
		{ title: "Execution Context & Hoisting rules", status: "done" },
		{ title: "Arrow functions vs standard functions (lexical this)", status: "done" },
		{ title: "Event delegation pattern on dynamic lists", status: "in progress" },
	],
};

// Javascript Core Tab Content
const javascriptCoreOverview: NodeOverviewTab = {
	description: "Master modern JavaScript fundamentals, ES6+ syntax, DOM manipulation, and asynchronous programming.",
	title: "Topics",
	topics: [
		{ title: "Variables, Data Types & Operators", status: "in progress" },
		{ title: "Functions, Scope & Closures", status: "upcoming" },
		{ title: "Arrays & Objects Manipulation", status: "upcoming" },
		{ title: "DOM Traversal & Event Handling", status: "upcoming" },
		{ title: "Asynchronous JS, Promises & Fetch", status: "upcoming" },
		{ title: "ES6+ Modules & Modern Tooling", status: "upcoming" },
	],
};

const javascriptCoreResources: NodeResourcesTab = {
	description: "Curated documentation, interactive playgrounds, and video tutorials for JavaScript.",
	title: "Best resources for you",
	items: [
		{ title: "You Don't Know JS - Scope & Closures", status: "in progress" },
		{ title: "JavaScript Event Loop Explained", status: "upcoming" },
		{ title: "Fetch API & Async/Await Guide", status: "upcoming" },
	],
};

const javascriptCoreNotes: NodeNotesTab = {
	description: "Key takeaways on JS execution context, event loop, and DOM APIs.",
	title: "Your notes",
	items: [
		{ title: "Promises microtask queue priority", status: "in progress" },
		{ title: "Closure memory leaks precautions", status: "upcoming" },
	],
};

// Git & GitHub Tab Content
const gitGithubOverview: NodeOverviewTab = {
	description: "Learn version control with Git and collaboration with GitHub. Master branching, pull requests, and professional team workflows.",
	title: "Topics",
	topics: [
		{ title: "Git Architecture & Core Concepts", status: "done" },
		{ title: "Repository Initialization & Configuration", status: "done" },
		{ title: "Staging, Commits & History Inspection", status: "done" },
		{ title: "Branching Strategies & Fast-Forward Merging", status: "done" },
		{ title: "Resolving Merge Conflicts & Rebasing", status: "done" },
		{ title: "GitHub Remotes, Pull Requests & Code Reviews", status: "done" },
	],
};

const gitGithubResources: NodeResourcesTab = {
	description: "Official Git documentation, GitHub guides, and interactive cheat sheets.",
	title: "Best resources for you",
	items: [
		{ title: "Pro Git Book - Version Control Fundamentals", status: "done" },
		{ title: "GitHub Flow Official Guide", status: "done" },
		{ title: "Interactive Git Branching Playground", status: "done" },
	],
};

const gitGithubNotes: NodeNotesTab = {
	description: "Essential Git commands, commit hygiene, and team collaboration workflows.",
	title: "Your notes",
	items: [
		{ title: "Git commit messages best practices (Conventional Commits)", status: "done" },
		{ title: "Rebase vs Merge workflows in team environments", status: "done" },
	],
};

export const initialNodes: RoadmapNodeType[] = [
	{
		id: 'n1',
		position: { x: 0, y: 0 },
		data: {
			label: 'Foundation',
			description: "HTML, CSS, responsive design",
			status: "done",
			icon: ToyBrick,
			duration: "3 weeks",
			overview: foundationOverview,
			resources: foundationResources,
			notes: foundationNotes,
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
			overview: javascriptCoreOverview,
			resources: javascriptCoreResources,
			notes: javascriptCoreNotes,
		},
		type: 'roadmapNode',
	},
	{
		id: 'n3',
		position: { x: 0, y: 360 },
		data: {
			label: 'Git & GitHub',
			description: "Version control, PRs",
			status: "done",
			icon: GitBranch,
			duration: "1 week",
			overview: gitGithubOverview,
			resources: gitGithubResources,
			notes: gitGithubNotes,
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
