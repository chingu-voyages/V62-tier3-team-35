import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/errors/app-error";
import { createPathSchema, updatePathSchema } from "@/lib/schemas/paths.schema";

// async function getUserOrThrow(userId: string) {
//   const user = await prisma.user.findUnique({ where: { id: userId } });
//   if (!user) {
//     throw new AppError("User not found", 404);
//   }
//   return user;
// }

async function getPathOrThrow(id: string, userId: string) {
  const path = await prisma.learningPath.findUnique({ where: { id, userId } });
  if (!path) {
    throw new AppError("Path not found", 404);
  }
  return path;
}

export async function createPath(userId: string, input: unknown) {
  const data = createPathSchema.parse(input);
  return prisma.learningPath.create({ data: { ...data, userId } });
}

const PATH_STATUSES = ["in_progress", "completed"] as const;
type PathStatusValue = (typeof PATH_STATUSES)[number];

function isPathStatus(value: string | null | undefined): value is PathStatusValue {
  return value != null && (PATH_STATUSES as readonly string[]).includes(value);
}

export type GetPathsOptions = {
  sort?: string | null;
  status?: string | null;
};

export async function getPathsByUserId(
  userId: string,
  { sort, status }: GetPathsOptions = {},
) {
  return prisma.learningPath.findMany({
    where: {
      userId,
      ...(isPathStatus(status) ? { status } : {}),
    },
    orderBy: { createdAt: sort === "oldest" ? "asc" : "desc" },
    include: { steps: { orderBy: { order: "asc" } } },
  });
}

export async function getPathCountsByUserId(userId: string) {
  const [all, inProgress, completed] = await Promise.all([
    prisma.learningPath.count({ where: { userId } }),
    prisma.learningPath.count({ where: { userId, status: "in_progress" } }),
    prisma.learningPath.count({ where: { userId, status: "completed" } }),
  ]);

  return { all, "in-progress": inProgress, completed };
}

export async function getPathById(id: string, userId: string) {
  const path = await prisma.learningPath.findUnique({
    where: { id, userId },
    include: {
      steps: { orderBy: { order: "asc" }, include: { topics: true } },
    },
  });

  if (!path) {
    throw new AppError("Path not found", 404);
  }

  return path;
}

export async function updatePath(id: string, userId: string, input: unknown) {
  await getPathOrThrow(id, userId);

  const data = updatePathSchema.parse(input);
  return prisma.learningPath.update({ where: { id }, data });
}

export async function deletePath(id: string, userId: string) {
  await getPathOrThrow(id, userId);

  return prisma.learningPath.delete({ where: { id } });
}
