"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { noteSchema, type NoteSchemaType } from "@/lib/schemas/roadmap-notes";

export async function addNote(stepId: string, input: NoteSchemaType) {
	const userId = await getCurrentUserId();
	const data = noteSchema.parse(input);

	const note = await prisma.note.create({
		data: {
			stepId,
			userId,
			title: data.title,
			content: data.content,
		},
	});

	return {
		id: note.id,
		title: note.title,
		content: note.content ?? "",
		createdAt: note.createdAt.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}),
	};
}


export async function editNote(id: string, note: NoteSchemaType) {
	const userId = await getCurrentUserId();
	const existing = await prisma.note.findFirst({
		where: { id, userId },
	});
	if (!existing) {
		throw new Error("Note not found or unauthorized");
	}

	const editedNote = await prisma.note.update({
		where: { id },
		data: {
			title: note.title,
			content: note.content ?? "",
		},
	});

	return {
		id: editedNote.id,
		title: editedNote.title,
		content: editedNote.content ?? "",
		createdAt: editedNote.createdAt.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}),
	};
}


export async function deleteNote(id: string) {
	const userId = await getCurrentUserId();
	const existing = await prisma.note.findFirst({
		where: { id, userId },
	});
	if (!existing) {
		throw new Error("Note not found or unauthorized");
	}

	return await prisma.note.delete({ where: { id } });
}
