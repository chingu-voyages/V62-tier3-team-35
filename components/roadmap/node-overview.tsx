import { cn } from "@/lib/utils";
import { statusNodeStyle } from "./card-node";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type {
  NodeOverviewStatsProps,
  NodeOverviewBodyProps,
  NodeOverviewHeaderProps,
  NodeOverviewProps,
  NodeOverviewTabs,
  NodeOverviewFooterProps,
  Status,
  NoteItem,
} from "@/lib/types/roadmap";
import {
  CircleCheck,
  Clock2,
  Ellipsis,
  MessageSquareText,
  Play,
  Check,
  Plus,
} from "lucide-react";
import { StepIcon } from "@/lib/utils/icons";
import NodeAddNote from "@/components/roadmap/node-form-note";
import { addNote, completeTopic, deleteNote, editNote } from "./action";
import { NoteSchemaType } from "@/lib/schemas/roadmap-notes";

import { PencilIcon, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownNoteProps {
  handleEditNote: (id: string, note: NoteSchemaType) => Promise<void> | void;
  handleDeleteNote: (id: string) => Promise<void> | void;
  noteID: string;
  note: NoteItem;
  children: React.ReactNode;
}

export function DropdownNote({
  handleEditNote,
  handleDeleteNote,
  noteID,
  note,
  children,
}: DropdownNoteProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <NodeAddNote
            handleFunction={handleEditNote}
            isEditing={true}
            note={note}
            noteID={noteID}
          >
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <PencilIcon />
              Edit
            </DropdownMenuItem>
          </NodeAddNote>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => handleDeleteNote(noteID)}
          >
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NodeOverviewHeader({
  icon,
  title,
  keyTopics,
}: NodeOverviewHeaderProps) {
  return (
    <header className="flex gap-4 pb-3 w-full">
      <div className="grid place-content-center size-14 bg-foreground rounded-full text-background shrink-0">
        <StepIcon icon={icon} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-xl sm:text-2xl font-semibold pb-0.5"> {title} </h3>
        <p className="text-(--accent-text) text-sm"> {keyTopics} </p>
      </div>
    </header>
  );
}

function NodeOverviewBody({
  tabs,
  activeTopic,
  handleActiveTopic,
  handleAddNote,
  handleDeleteNote,
  handleEditNote,
}: NodeOverviewBodyProps) {
  const tabsOverview = Object.keys(tabs);
  return (
    <Tabs defaultValue="overview" className="w-full gap-6 pb-8 sm:pb-12">
      <TabsList variant="line" className="border-b w-full">
        {tabsOverview.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="capitalize justify-start"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="overview">
        <p className="text-muted-foreground pb-7">
          {tabs.overview.description}
        </p>
        <div className="flex justify-between w-full items-center pb-5">
          <h3 className="font-semibold">
            {tabs.overview.title} ({tabs.overview.topics.length})
          </h3>
          <span className="text-sm text-muted-foreground">
            {tabs.overview.topics.filter((el) => el.status === "done").length}/
            {tabs.overview.topics.length}
          </span>
        </div>

        <ul>
          {tabs.overview.topics.map((el, idx) => (
            <li
              key={el.id}
              className={`${idx == activeTopic ? "text-foreground" : "text-muted-foreground"} flex gap-4 pb-1 items-center`}
              tabIndex={idx}
              onClick={() => handleActiveTopic(idx)}
            >
              {el.status === "done" ? (
                <div className="rounded-full size-7 bg-(--done-color) grid place-content-center">
                  <Check className="size-4 text-white" />
                </div>
              ) : (
                <div
                  className={`rounded-full size-7 ${idx == activeTopic ? "border-[#4666FF] border-10" : "border-3"}`}
                />
              )}

              {el.name}
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="resources">
        <header className="pb-4">
          <h3 className="text-xl font-semibold"> {tabs.resources.title} </h3>
          <p className="text-sm text-muted-foreground">
            {tabs.resources.description}
          </p>
        </header>

        <ul className="flex flex-col gap-3 max-h-60 overflow-y-auto">
          {tabs.resources.items.map((item, idx) => (
            <li
              key={idx}
              className="border rounded-xl shadow-xs hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <a
                href={item.url}
                className="p-3 flex gap-3.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="size-11 rounded-full bg-muted text-foreground font-semibold grid place-content-center text-sm">
                  {item.title.slice(0, 2)}
                </div>
                <div>
                  <h4 className="font-semibold pb-2"> {item.title}</h4>
                  <p className="text-muted-foreground capitalize">
                    {" "}
                    {item.type}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="notes">
        {tabs.notes.items.length <= 0 ? (
          <div className="flex flex-col justify-center items-center gap-4.5">
            <div className="size-11 rounded-full bg-muted grid place-content-center">
              <MessageSquareText />
            </div>
            <h3 className="text-xl font-semibold"> No notes yet </h3>
            <p className="text-muted-foreground text-center">
              Keep thoughts, questions, and key takeaways for this milestone in
              one place.
            </p>
            <NodeAddNote handleFunction={handleAddNote}>
              <Button variant="primary" size="lg">
                Add your first note
              </Button>
            </NodeAddNote>
          </div>
        ) : (
          <div>
            <header className="flex justify-between items-center w-full pb-4 ">
              <div>
                <h3 className="font-semibold text-xl"> Your notes </h3>
                <p className="text-(--para-fg) text-[13px]">
                  {" "}
                  {tabs.notes.items.length} notes{" "}
                </p>
              </div>
              <NodeAddNote handleFunction={handleAddNote}>
                <Button variant="primary" size="lg">
                  <Plus />
                  New note
                </Button>
              </NodeAddNote>
            </header>

            {tabs.notes.items.map((item) => (
              <div
                className="border bg-card rounded-xl px-4 pt-3 pb-1.5 mb-3 shadow-xs"
                key={item.id}
              >
                <div className="w-full flex items-center justify-between">
                  <h4 className="text-foreground text-base/7"> {item.title}</h4>
                  <DropdownNote
                    handleDeleteNote={handleDeleteNote}
                    handleEditNote={handleEditNote}
                    noteID={item.id}
                    note={item}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Ellipsis className="text-(--para-fg)" />
                    </Button>
                  </DropdownNote>
                </div>
                <p className="pb-3 text-[13px] text-(--para-fg)">
                  {" "}
                  {item.content}
                </p>
                <p className="pb-3 text-[13px] text-(--para-fg)">
                  {" "}
                  {item.createdAt}
                </p>
              </div>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

function NodeOverviewStats({ status, estimatedTime }: NodeOverviewStatsProps) {
  return (
    <div className="pb-7 flex gap-2">
      <div className={cn(statusNodeStyle({ status }), "text-sm px-3")}>
        <div className="size-1.5 rounded-full bg-current" />
        <span className="sr-only"> Status: </span>
        {status}
      </div>

      <div
        className={cn(statusNodeStyle({ status: "upcoming" }), "text-sm px-3")}
      >
        <Clock2 className="size-4" />
        <span className="sr-only">Duration: </span>
        {estimatedTime ?? "1 week"}
      </div>
    </div>
  );
}

function NodeOverviewFooter({
  handleCompleteTopic,
  handleAddNote,
  isCompleted = false,
}: NodeOverviewFooterProps) {
  return (
    <div className="flex flex-col gap-3">
      <Button variant="primary" size="lg" className="w-full">
        <Play />
        Continue Learning
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="w-full"
        onClick={() => handleCompleteTopic()}
        disabled={isCompleted}
      >
        <CircleCheck />
        {isCompleted ? "Topic completed" : "Mark as complete"}
      </Button>

      <NodeAddNote handleFunction={handleAddNote}>
        <Button variant="secondary" size="lg" className="w-full">
          <MessageSquareText />
          Add a note
        </Button>
      </NodeAddNote>
    </div>
  );
}

export default function NodeOverview({
  nodeData,
  setNodes,
  nodes,
  activeNodeID,
  activeTopic,
  setActiveTopic,
  setSelectedNodeId,
}: NodeOverviewProps) {
  const listTopics = nodeData.overview.topics;

  const tabs: NodeOverviewTabs = {
    overview: nodeData.overview,
    resources: nodeData.resources,
    notes: nodeData.notes,
  };

  function handleCompleteTopic() {
    const topicToComplete = listTopics[activeTopic];
    if (topicToComplete && topicToComplete.status !== "done") {
      const nextTopicIdx = listTopics.findIndex(
        (t, i) => i > activeTopic && t.status !== "done",
      );

      const updatedTopics = listTopics.map((topic, i) => {
        if (i === activeTopic) {
          return { ...topic, status: "done" as Status, isCompleted: true };
        } else if (i === nextTopicIdx) {
          return { ...topic, status: "in progress" as Status };
        }
        return topic;
      });

      if (nextTopicIdx !== -1) {
        setActiveTopic(nextTopicIdx);
      }

      const allDone = updatedTopics.every((t) => t.status === "done");

      if (setNodes && nodes && activeNodeID) {
        const currentIndex = nodes.findIndex((n) => n.id === activeNodeID);
        const nextIndex =
          allDone && currentIndex !== -1
            ? nodes.findIndex(
                (n, idx) => idx > currentIndex && !n.data.isCompleted,
              )
            : -1;

        const newNodes = nodes.map((node, idx) => {
          if (node.id === activeNodeID) {
            return {
              ...node,
              selected: allDone ? false : node.selected,
              data: {
                ...node.data,
                status: allDone ? ("done" as Status) : node.data.status,
                isCompleted: allDone ? true : node.data.isCompleted,
                overview: {
                  ...node.data.overview,
                  topics: updatedTopics,
                },
              },
            };
          }

          if (idx === nextIndex) {
            return {
              ...node,
              selected: true,
              data: {
                ...node.data,
                status:
                  node.data.status === "upcoming"
                    ? ("in progress" as Status)
                    : node.data.status,
              },
            };
          }
          return node;
        });

        setNodes(newNodes);

        if (allDone && nextIndex !== -1 && setSelectedNodeId) {
          const nextNode = nodes[nextIndex];
          setSelectedNodeId(nextNode.id);
          const nextTopics = nextNode.data.overview.topics;
          const nextInProg = nextTopics.findIndex(
            (t) => t.status === "in progress",
          );
          const nextUpcom = nextTopics.findIndex(
            (t) => t.status === "upcoming",
          );
          setActiveTopic(
            nextInProg !== -1 ? nextInProg : nextUpcom !== -1 ? nextUpcom : 0,
          );
        }

        // Persist topic and step completion to the database
        completeTopic(topicToComplete.id, activeNodeID).catch((err) => {
          console.error("Failed to complete topic in database:", err);
        });
      }
    }
  }

  function handleActiveTopic(idx: number) {
    if (listTopics[idx]?.status !== "done") {
      setActiveTopic(idx);
    }
  }

  async function handleAddNote(data: NoteSchemaType) {
    if (!setNodes || !nodes || !activeNodeID) return;

    const savedNote = await addNote(activeNodeID, data);

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === activeNodeID) {
          return {
            ...node,
            data: {
              ...node.data,
              notes: {
                ...node.data.notes,
                items: [savedNote, ...(node.data.notes?.items ?? [])],
              },
            },
          };
        }
        return node;
      }),
    );
  }

  async function handleDeleteNote(id: string) {
    if (!setNodes || !nodes || !activeNodeID) return;

    await deleteNote(id);

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === activeNodeID) {
          return {
            ...node,
            data: {
              ...node.data,
              notes: {
                ...node.data.notes,
                items: node.data.notes.items.filter((note) => note.id !== id),
              },
            },
          };
        }
        return node;
      }),
    );
  }

  async function handleEditNote(id: string, note: NoteSchemaType) {
    if (!setNodes || !nodes || !activeNodeID) return;

    const editedNote = await editNote(id, note);

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === activeNodeID) {
          return {
            ...node,
            data: {
              ...node.data,
              notes: {
                ...node.data.notes,
                items: node.data.notes.items.map((item) =>
                  item.id === id ? { ...item, ...editedNote } : item,
                ),
              },
            },
          };
        }
        return node;
      }),
    );
  }

  return (
    <div className="fixed sm:absolute inset-x-0 bottom-0 sm:bottom-auto sm:top-4 sm:right-6 sm:inset-x-auto z-40 max-h-[85svh] sm:max-h-[calc(100svh-var(--navbar-height))] w-full sm:w-[420px] bg-card p-4 sm:p-6 rounded-t-2xl sm:rounded-2xl text-card-foreground shadow-2xl sm:shadow-lg border sm:border border-border flex flex-col overflow-y-auto [--accent-text:#6570C7] [--done-color:#42B229] [--progress-bg:#EDF2FF] [--progress-color:#2E6BFF] [--upcoming-bg:#F5F6F3] [--para-fg:#536079]">
      <NodeOverviewHeader
        icon={nodeData.icon}
        title={nodeData.title}
        keyTopics={nodeData.keyTopics}
      />
      <NodeOverviewStats
        status={nodeData.status}
        estimatedTime={nodeData.estimatedTime}
      />
      <NodeOverviewBody
        tabs={tabs}
        activeTopic={activeTopic}
        handleActiveTopic={handleActiveTopic}
        handleAddNote={handleAddNote}
        handleDeleteNote={handleDeleteNote}
        handleEditNote={handleEditNote}
      />
      <NodeOverviewFooter
        handleCompleteTopic={handleCompleteTopic}
        handleAddNote={handleAddNote}
        isCompleted={listTopics[activeTopic]?.status === "done"}
      />
    </div>
  );
}
