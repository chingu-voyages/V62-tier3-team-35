"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { NodeAddNoteProps } from "@/lib/types/roadmap";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "@/lib/schemas/roadmap-notes";
import type { NoteSchemaType } from "@/lib/schemas/roadmap-notes";
import { useState } from "react";

export default function NodeAddNote({
  handleFunction,
  isEditing,
  note,
  noteID,
  children,
}: NodeAddNoteProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<NoteSchemaType>({
    resolver: zodResolver(noteSchema),
    values: {
      title: isEditing ? (note?.title ?? "") : "",
      content: isEditing ? (note?.content ?? "") : "",
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset();
    }
  };

  async function onSubmit(data: NoteSchemaType) {
    try {
      if (isEditing && noteID && handleFunction) {
        await (
          handleFunction as (
            id: string,
            data: NoteSchemaType,
          ) => Promise<void> | void
        )(noteID, data);
      } else if (handleFunction) {
        await (
          handleFunction as (data: NoteSchemaType) => Promise<void> | void
        )(data);
      }
      form.reset();
      setOpen(false);
    } catch (err) {
      console.error("Error saving note:", err);
      form.setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader className="pb-4">
            <DialogTitle className="text-lg">
              {isEditing ? "Edit note" : "Add note"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update your milestone note."
                : "Add a personal note for this milestone."}
            </DialogDescription>
          </DialogHeader>

          {form.formState.errors.root && (
            <p className="text-destructive text-sm pb-2">
              {form.formState.errors.root.message}
            </p>
          )}

          <FieldGroup className="pb-8">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="title" className="text-muted-foreground">
                    Title
                  </Label>
                  <Input
                    {...field}
                    id="title"
                    name="title"
                    placeholder="Type your title here"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="content" className="text-muted-foreground">
                    Note
                  </Label>
                  <Textarea
                    {...field}
                    id="content"
                    name="content"
                    placeholder="Type your note here."
                    aria-invalid={fieldState.invalid}
                    className="resize-none h-30"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" size="lg" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Save changes"
                  : "Save note"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
