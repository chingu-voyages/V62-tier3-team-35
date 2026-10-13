"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  //   DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

export type RoadmapDetails = {
  title: string;
  description: string;
};

type EditRoadmapDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roadmap: RoadmapDetails;
  onSave: (values: RoadmapDetails) => Promise<void> | void;
};

export function EditRoadmapDialog({
  open,
  onOpenChange,
  roadmap,
  onSave,
}: EditRoadmapDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 rounded-3xl p-8 sm:max-w-145 [&>button]:right-8 [&>button]:top-8">
        <DialogHeader className="gap-1.5 text-left">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Edit roadmap
          </DialogTitle>
          <DialogDescription className="text-[15px]">
            Update the details for this learning path.
          </DialogDescription>
        </DialogHeader>

        {/* Mounts only while open, so the fields reset to `roadmap` each time */}
        <EditRoadmapForm
          roadmap={roadmap}
          onSave={onSave}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
}

function EditRoadmapForm({
  roadmap,
  onSave,
  onOpenChange,
}: {
  roadmap: RoadmapDetails;
  onSave: (values: RoadmapDetails) => Promise<void> | void;
  onOpenChange: (open: boolean) => void;
}) {
  const [title, setTitle] = useState(roadmap.title);
  const [description, setDescription] = useState(roadmap.description);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmedName = title.trim();
  const isValid = trimmedName.length > 0;

  return (
    <form
      className="mt-8"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!isValid || isSaving) return;
        setIsSaving(true);
        setError(null);
        try {
          await onSave({ title: trimmedName, description: description.trim() });
          onOpenChange(false);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Couldn’t save changes. Please try again.",
          );
          setIsSaving(false);
        }
      }}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="roadmap-title" className="text-xs font-medium">
            Roadmap title
          </Label>
          <Input
            id="roadmap-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11 rounded-lg bg-card px-4 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="roadmap-description" className="text-xs font-medium">
            Description
          </Label>
          <Textarea
            id="roadmap-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-23 resize-none rounded-lg bg-card px-4 py-3 text-sm"
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <DialogFooter className="mt-10 gap-3 sm:justify-end">
        {/* <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="h-12 rounded-full bg-card px-6 text-[15px] font-medium"
          >
            Cancel
          </Button>
        </DialogClose> */}
        <Button
          type="submit"
          disabled={!isValid || isSaving}
          className="h-10.5 rounded-full bg-foreground px-4 text-sm font-medium text-white hover:bg-foreground/90 cursor-pointer"
        >
          {isSaving ? (
            <>
              <Spinner className="size-4 border-white/40 border-r-white" />
              Saving…
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
