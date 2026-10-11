import { CodeXml, GitBranch, ToyBrick } from "lucide-react";
import type {
  NodeOverviewTab,
  NodeResourcesTab,
  NodeNotesTab,
  RoadmapNodeType,
} from "@/lib/types/roadmap";

// Foundation Tab Content
const foundationOverview: NodeOverviewTab = {
  description:
    "Learn the core concepts of JavaScript, the language of the web. Build a strong foundation (ES6+) and practice with real examples.",
  title: "Topics",
  topics: [
    {
      id: "ft-1",
      name: "Variables and data types",
      status: "done",
      isCompleted: true,
    },
    {
      id: "ft-2",
      name: "Functions and scope",
      status: "done",
      isCompleted: true,
    },
    { id: "ft-3", name: "DOM manipulation", status: "done", isCompleted: true },
    { id: "ft-4", name: "ES6+ features", status: "done", isCompleted: true },
    {
      id: "ft-5",
      name: "Asynchronous JavaScript",
      status: "done",
      isCompleted: true,
    },
    { id: "ft-6", name: "Error handling", status: "done", isCompleted: true },
  ],
};

const foundationResources: NodeResourcesTab = {
  title: "Recommended resources",
  description: "Curated references for HTML, CSS, and responsive design.",
  items: [
    {
      title: "MDN Web Docs - JavaScript Basics",
      type: "documentation",
      url: "https://developer.mozilla.org",
      description: "Learn HTML, CSS, and basic JavaScript on MDN Web Docs.",
    },
    {
      title: "JavaScript.info - The Modern Tutorial",
      type: "tutorial",
      url: "https://javascript.info",
      description: "The modern JavaScript tutorial with clear examples.",
    },
    {
      title: "Eloquent JavaScript - Program Structure",
      type: "book",
      url: "https://eloquentjavascript.net",
      description:
        "A modern introduction to programming and JavaScript fundamentals.",
    },
    {
      title: "DOM Enlightenment - Traversing & Events",
      type: "documentation",
      url: "https://domenlightenment.com",
      description: "In-depth reference for script-driven DOM manipulation.",
    },
  ],
};

const foundationNotes: NodeNotesTab = {
  title: "Your notes",
  description: "3 notes - saved automatically",
  items: [
    {
      id: "fn-1",
      title: "Execution Context & Hoisting rules",
      content:
        "Remember that function declarations are hoisted completely, but let and const stay in the Temporal Dead Zone until initialized.",
      createdAt: "Oct 6, 2026",
    },
    {
      id: "fn-2",
      title: "Arrow functions vs standard functions (lexical this)",
      content:
        "Arrow functions don't bind their own this, arguments, super, or new.target. They retain the this value of the enclosing lexical scope.",
      createdAt: "Oct 7, 2026",
    },
    {
      id: "fn-3",
      title: "Event delegation pattern on dynamic lists",
      content:
        "Attach a single listener to the parent element and check event.target instead of registering hundreds of listeners on child nodes.",
      createdAt: "Oct 8, 2026",
    },
  ],
};

// Javascript Core Tab Content
const javascriptCoreOverview: NodeOverviewTab = {
  description:
    "Master modern JavaScript fundamentals, ES6+ syntax, DOM manipulation, and asynchronous programming.",
  title: "Topics",
  topics: [
    {
      id: "jt-1",
      name: "Variables, Data Types & Operators",
      status: "in progress",
      isCompleted: false,
    },
    {
      id: "jt-2",
      name: "Functions, Scope & Closures",
      status: "upcoming",
      isCompleted: false,
    },
    {
      id: "jt-3",
      name: "Arrays & Objects Manipulation",
      status: "upcoming",
      isCompleted: false,
    },
    {
      id: "jt-4",
      name: "DOM Traversal & Event Handling",
      status: "upcoming",
      isCompleted: false,
    },
    {
      id: "jt-5",
      name: "Asynchronous JS, Promises & Fetch",
      status: "upcoming",
      isCompleted: false,
    },
    {
      id: "jt-6",
      name: "ES6+ Modules & Modern Tooling",
      status: "upcoming",
      isCompleted: false,
    },
  ],
};

const javascriptCoreResources: NodeResourcesTab = {
  title: "Recommended resources",
  description: "Curated references for Javascript core.",
  items: [
    {
      title: "You Don't Know JS - Scope & Closures",
      type: "book",
      url: "https://github.com/getify/You-Dont-Know-JS",
      description:
        "Deep dive into JavaScript lexical scope, hoisting, and closures.",
    },
    {
      title: "JavaScript Event Loop Explained",
      type: "video",
      url: "https://youtube.com",
      description:
        "Visual walkthrough of call stack, web APIs, and task queues.",
    },
    {
      title: "Fetch API & Async/Await Guide",
      type: "tutorial",
      url: "https://developer.mozilla.org",
      description:
        "Practical examples of asynchronous requests and error handling.",
    },
  ],
};

const javascriptCoreNotes: NodeNotesTab = {
  title: "Your notes",
  description: "2 notes - saved automatically",
  items: [
    {
      id: "jn-1",
      title: "Promises microtask queue priority",
      content:
        "Microtasks (resolved Promise callbacks, queueMicrotask) run before macrotasks (setTimeout, requestAnimationFrame).",
      createdAt: "Oct 8, 2026",
    },
    {
      id: "jn-2",
      title: "Closure memory leaks precautions",
      content:
        "Be careful not to retain large outer scope variables or DOM nodes inside closures when storing them in long-lived handlers.",
      createdAt: "Oct 9, 2026",
    },
  ],
};

// Git & GitHub Tab Content
const gitGithubOverview: NodeOverviewTab = {
  description:
    "Learn version control with Git and collaboration with GitHub. Master branching, pull requests, and professional team workflows.",
  title: "Topics",
  topics: [
    {
      id: "gt-1",
      name: "Git Architecture & Core Concepts",
      status: "in progress",
      isCompleted: false,
    },
    {
      id: "gt-2",
      name: "Repository Initialization & Configuration",
      status: "upcoming",
      isCompleted: false,
    },
    {
      id: "gt-3",
      name: "Staging, Commits & History Inspection",
      status: "upcoming",
      isCompleted: false,
    },
    {
      id: "gt-4",
      name: "Branching Strategies & Fast-Forward Merging",
      status: "upcoming",
      isCompleted: false,
    },
    {
      id: "gt-5",
      name: "Resolving Merge Conflicts & Rebasing",
      status: "upcoming",
      isCompleted: false,
    },
    {
      id: "gt-6",
      name: "GitHub Remotes, Pull Requests & Code Reviews",
      status: "upcoming",
      isCompleted: false,
    },
  ],
};

const gitGithubResources: NodeResourcesTab = {
  title: "Recommended resources",
  description: "Curated references for Git & GitHub.",
  items: [
    {
      title: "Pro Git Book - Version Control Fundamentals",
      type: "book",
      url: "https://git-scm.com/book",
      description:
        "Complete official guide to Git commands and internal architecture.",
    },
    {
      title: "GitHub Flow Official Guide",
      type: "documentation",
      url: "https://docs.github.com",
      description:
        "Best practices for branching, pull requests, and code reviews.",
    },
    {
      title: "Interactive Git Branching Playground",
      type: "interactive",
      url: "https://learngitbranching.js.org",
      description:
        "Hands-on browser-based visual sandbox for mastering git trees.",
    },
  ],
};

const gitGithubNotes: NodeNotesTab = {
  title: "Your notes",
  description: "2 notes - saved automatically",
  items: [
    {
      id: "gn-1",
      title: "Git commit messages best practices (Conventional Commits)",
      content:
        "Use conventional prefixes (feat, fix, docs, chore) and write commit subjects in the imperative present tense.",
      createdAt: "Oct 7, 2026",
    },
    {
      id: "gn-2",
      title: "Rebase vs Merge workflows in team environments",
      content:
        "Rebase feature branches onto dev before opening pull requests to keep history linear; never rebase shared branches.",
      createdAt: "Oct 9, 2026",
    },
  ],
};

export const initialNodes: RoadmapNodeType[] = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: {
      id: "n1",
      title: "Foundation",
      description: "HTML, CSS, responsive design",
      keyTopics: "HTML, CSS, Responsive design",
      status: "done",
      isCompleted: true,
      icon: ToyBrick,
      estimatedTime: "3 weeks",
      overview: foundationOverview,
      resources: foundationResources,
      notes: foundationNotes,
    },
    type: "roadmapNode",
  },
  {
    id: "n2",
    position: { x: 0, y: 180 },
    data: {
      id: "n2",
      title: "Javascript core",
      icon: CodeXml,
      description: "ES6+, DOM, Events",
      keyTopics: "ES6+, DOM, Events",
      status: "in progress",
      isCompleted: false,
      estimatedTime: "3 weeks",
      overview: javascriptCoreOverview,
      resources: javascriptCoreResources,
      notes: javascriptCoreNotes,
    },
    type: "roadmapNode",
  },
  {
    id: "n3",
    position: { x: 0, y: 360 },
    data: {
      id: "n3",
      title: "Git & GitHub",
      description: "Version control, PRs",
      keyTopics: "Version control, PRs",
      status: "upcoming",
      isCompleted: false,
      icon: GitBranch,
      estimatedTime: "1 week",
      overview: gitGithubOverview,
      resources: gitGithubResources,
      notes: gitGithubNotes,
    },
    type: "roadmapNode",
  },
];

export const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
  },
  {
    id: "n2-n3",
    source: "n2",
    target: "n3",
  },
];
