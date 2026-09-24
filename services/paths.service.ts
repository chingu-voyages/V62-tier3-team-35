import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/errors/app-error";
import {
  createPathSchema,
  updatePathSchema,
} from "@/schemas/paths.schema";

async function getUserOrThrow(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
}

async function getPathOrThrow(id: string) {
  const path = await prisma.learningPath.findUnique({ where: { id } });
  if (!path) {
    throw new AppError("Path not found", 404);
  }
  return path;
}

export async function createPath(userId: string | null, input: unknown) {
  if (!userId) {
    throw new AppError("Missing userId", 400);
  }

  await getUserOrThrow(userId);

  const data = createPathSchema.parse(input);
  return prisma.learningPath.create({ data: { ...data, userId } });
}

export async function getPathsByUserId(userId: string | null) {
  if (!userId) {
    throw new AppError("Missing userId", 400);
  }

  await getUserOrThrow(userId);

  return prisma.learningPath.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      steps: {
        orderBy: { order: "asc" },
      },
    },
  });
}

export async function getPathById(id: string) {
  if (!id) {
    throw new AppError("Missing path id", 400);
  }

  const path = await prisma.learningPath.findUnique({
    where: { id },
    include: {
      steps: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!path) {
    throw new AppError("Path not found", 404);
  }

  return path;
}

export async function updatePath(id: string, input: unknown) {
  if (!id) {
    throw new AppError("Missing path id", 400);
  }

  await getPathOrThrow(id);

  const data = updatePathSchema.parse(input);
  return prisma.learningPath.update({ where: { id }, data });
}

export async function deletePath(id: string) {
  if (!id) {
    throw new AppError("Missing path id", 400);
  }

  await getPathOrThrow(id);

  return prisma.learningPath.delete({ where: { id } });
}