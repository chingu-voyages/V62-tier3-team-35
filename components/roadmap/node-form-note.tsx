"use client"

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { NodeAddNoteProps, } from "@/lib/types/roadmap";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { noteSchema } from "@/lib/schemas/roadmap-notes"
import type { NoteSchemaType } from "@/lib/schemas/roadmap-notes"
import { toast } from "sonner"

export default function NodeAddNote({ inProgressTopic, handleFunction, isEditing, note, noteID, children }: NodeAddNoteProps) {
	const form = useForm<NoteSchemaType>({
		resolver: zodResolver(noteSchema),
		values: {
			title: isEditing ? (note?.title ?? "") : (inProgressTopic || ""),
			content: isEditing ? (note?.content ?? "") : "",
		}
	})
	function onSubmit(data: NoteSchemaType) {
		try {
			if (isEditing && noteID && handleFunction) {
				(handleFunction as (id: string, data: NoteSchemaType) => void)(noteID, data)
			} else if (handleFunction) {
				(handleFunction as (data: NoteSchemaType) => void)(data)
			}
		} catch (err) {
			console.error("Error:", err);
			form.setError("root", {
				message: "An unexpected error occurred. Please try again.",
			});
		}

		toast("You submitted the following values:", {
			description: (
				<pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
			position: "bottom-right",
			classNames: {
				content: "flex flex-col gap-2",
			},
			style: {
				"--border-radius": "calc(var(--radius)  + 4px)",
			} as React.CSSProperties,
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<DialogHeader className="pb-4">
						<DialogTitle className="text-lg">Edit note</DialogTitle>
						<DialogDescription>
							Add your milestone note.
						</DialogDescription>
					</DialogHeader>
					<FieldGroup className="pb-8">
						<Controller
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<Label htmlFor="title" className="text-[#536079]">
										Title
									</Label>
									<Input
										{...field}
										id="title"
										name="title"
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
									<Label htmlFor="content" className="text-[#536079]">
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
						<Button variant="primary" size="lg" type="submit">
							Save note
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
