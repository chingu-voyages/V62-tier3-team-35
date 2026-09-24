import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/errors/app-error";
import {
  createStepsRequestSchema,
  updateStepSchema,
} from "@/schemas/steps.schema";

export async function createSteps(input: unknown) {
  const { learningPathId, steps } = createStepsRequestSchema.parse(input);

  const learningPath = await prisma.learningPath.findUnique({
    where: { id: learningPathId },
  });
  if (!learningPath) {
    throw new AppError("Path not found", 404);
  }

  await prisma.step.createMany({
    data: steps.map((step) => ({
      learningPathId,
      ...step,
    })),
  });

  return prisma.step.findMany({
    where: { learningPathId },
    orderBy: { order: "asc" },
  });
}

export async function updateStep(id: string, input: unknown) {
  if (!id) {
    throw new AppError("Missing step id", 400);
  }

  const step = await prisma.step.findUnique({ where: { id } });
  if (!step) {
    throw new AppError("Step not found", 404);
  }

  const data = updateStepSchema.parse(input);
  return prisma.step.update({ where: { id }, data });
}