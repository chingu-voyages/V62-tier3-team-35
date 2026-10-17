"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowRight,
  PenLine,
  Trash2,
  FileText,
  Clock3,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { deleteRoadmap, updateRoadmap } from "@/lib/api/paths";
import { ActionMenu } from "./action-menu";
import { TagList } from "../common/tag-list";
import { EditRoadmapDialog, type RoadmapDetails } from "./edit-roadmap-dialog";
import { cn } from "cn";

export type Roadmap = {
  id: string;
  title: string;
  description: string;
  modules: number;
  duration: string;
  progress: number;
  completed: number;
  skills: string[];
  status: "in_progress" | "completed";
};

type RoadmapCardProps = {
  roadmap: Roadmap;
  onUpdated?: (values: RoadmapDetails) => void;
  onDeleted?: (status: Roadmap["status"]) => void;
};

interface RoadmapCardContent {
  roadmap: Roadmap;
  className?: string;
}
function RoadmapCardContent({ roadmap, className }: RoadmapCardContent) {
  return (
    <div className={cn("min-w-0 flex-1", className)}>
      <div className="flex min-w-0 items-start justify-between gap-2">
        <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground text-pretty">
          {roadmap.title}
        </h3>
      </div>
      <p className="mt-1 line-clamp-2 min-h-9 text-sm leading-4.5 text-[#6b7280] max-w-75">
        {roadmap.description}
      </p>

      {/* modules */}
      <section className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#6b7280]">
        <span className="flex items-center gap-1.5">
          <FileText className="h-4 w-4" />
          {roadmap.modules} modules
        </span>
        <span className="flex items-center gap-1.5">
          <Clock3 className="h-4 w-4" />
          {roadmap.duration}
        </span>
      </section>

      {/* progress */}
      <section className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <div className="flex gap-2 items-center">
          <div
            className="relative h-7 w-7 rounded-full"
            style={{
              background: `conic-gradient(#65b82d ${roadmap.progress * 3.6}deg, #e0e3da 0deg)`,
            }}
          >
            <div className="absolute inset-0.75 flex items-center justify-center rounded-full bg-white" />
          </div>
          <span className="text-md font-semibold text-foreground">
            {roadmap.progress}%
          </span>
        </div>
        <span className="text-[13px] text-muted-foreground">
          {roadmap.completed} of {roadmap.modules} modules
        </span>
      </section>
    </div>

  )
}

export function RoadmapCard({
  roadmap,
  onUpdated,
  onDeleted,
}: RoadmapCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function handleSave(values: RoadmapDetails) {
    await updateRoadmap(roadmap.id, values);
    toast.success("Roadmap updated");
    onUpdated?.(values);
  }

  async function handleDelete() {
    try {
      await deleteRoadmap(roadmap.id);
      toast.success("Roadmap deleted");
      onDeleted?.(roadmap.status);
    } catch {
      toast.error("Couldn’t delete the roadmap. Please try again.");
    }
  }

  return (
    <Card className="max-w-100 sm:max-w-124 2xl:max-w-136 group relative overflow-visible rounded-[18px] border-border bg-white shadow-[0_2px_10px_rgba(17,18,17,0.025)] p-0 w-fit">
      <CardContent className="p-4 h-full overflow-hidden">
        <div className="flex w-full min-w-0 items-start gap-5 justify-between sm:justify-start">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-background text-foreground">
            <Pencil className="size-6" strokeWidth={1.8} />
          </div>


          <RoadmapCardContent
            roadmap={roadmap}
            className="sm:block hidden"
          />
          <ActionMenu
            label="Roadmap actions"
            className="-mr-2 -mt-2"
            items={[
              {
                label: "Edit roadmap",
                icon: PenLine,
                onSelect: () => setEditOpen(true),
              },
              {
                label: "Delete roadmap",
                icon: Trash2,
                destructive: true,
                onSelect: () => setDeleteOpen(true),
              },
            ]}
          />

          {/* -------- */}
        </div>


        <RoadmapCardContent
          roadmap={roadmap}
          className="block sm:hidden"
        />

        <div className="sm:pl-5 w-full flex flex-col gap-4 mt-auto">
          {/* tags */}
          <div className="mt-6">
            <TagList tags={roadmap.skills} />
          </div>

          <Button
            asChild
            size="lg"
            variant="primary"
            className="justify-start w-fit"
          >
            <Link href={`/roadmaps/${roadmap.id}`}>
              Continue learning <ArrowRight className="h-4 w-4 ml-auto" />
            </Link>
          </Button>
        </div>
      </CardContent>

      <EditRoadmapDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        roadmap={{ title: roadmap.title, description: roadmap.description }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title="Delete roadmap?"
        description={`“${roadmap.title}” and all of its progress will be permanently deleted. This can’t be undone.`}
        confirmLabel="Delete"
      />
    </Card>
  );
}
