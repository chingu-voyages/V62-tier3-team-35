"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { noteSchema, type NoteSchemaType } from "@/lib/schemas/roadmap-notes";
import type { Topic } from "@/lib/generated/prisma/browser";

export async function addNote(stepId: string, input: NoteSchemaType) {
  const userId = await getCurrentUserId();
  const data = noteSchema.parse(input);

  const step = await prisma.step.findFirst({
    where: { id: stepId, learningPath: { userId } },
  });
  if (!step) {
    throw new Error("Step not found or unauthorized");
  }

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

export async function completeTopic(topicId: string, stepId: string) {
  const userId = await getCurrentUserId();

  const step = await prisma.step.findFirst({
    where: { id: stepId, learningPath: { userId } },
    include: { topics: true },
  });
  if (!step) {
    throw new Error("Step not found or unauthorized");
  }

  const topicExists = step.topics.some((t: Topic) => t.id === topicId);
  if (!topicExists) {
    throw new Error("Topic not found in this step");
  }

  await prisma.topic.update({
    where: { id: topicId },
    data: {
      status: "done",
      completedAt: new Date(),
    },
  });

  const allTopicsDone = step.topics.every(
    (t: Topic) => t.id === topicId || t.status === "done",
  );

  if (allTopicsDone) {
    await prisma.step.update({
      where: { id: stepId },
      data: {
        status: "done",
        completedAt: new Date(),
      },
    });

    // Check if other steps are done,
    // only if this one is done.
    const remainingSteps = await prisma.step.count({
      where: {
        learningPathId: step.learningPathId,
        id: { not: stepId },
        status: { not: "done" },
      },
    });

    if (remainingSteps === 0) {
      await prisma.learningPath.update({
        where: { id: step.learningPathId },
        data: {
          status: "completed",
        },
      });
    }
  }

  return { success: true, allDone: allTopicsDone };
}
