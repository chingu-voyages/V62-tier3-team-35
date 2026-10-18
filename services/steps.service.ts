import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/errors/app-error";
import {
  createStepsRequestSchema,
  updateStepSchema,
} from "@/lib/schemas/steps.schema";

export async function createSteps(input: unknown) {
  const { learningPathId, steps } = createStepsRequestSchema.parse(input);

  const learningPath = await prisma.learningPath.findUnique({
    where: { id: learningPathId },
  });
  if (!learningPath) {
    throw new AppError("Path not found", 404);
  }

  // await prisma.step.createMany({
  //   data: steps.map((step) => ({
  //     learningPathId,
  //     ...step,
  //   })),
  // });

  // return prisma.step.findMany({
  //   where: { learningPathId },
  //   orderBy: { order: "asc" },
  // });

  const createdSteps = await prisma.$transaction(
    steps.map((step, i) =>
      prisma.step.create({
        data: {
          learningPathId,
          order: i,
          title: step.title,
          description: step.description,
          icon: step.icon,
          keyTopics: step.keyTopics,
          estimatedTime: step.estimatedTime,
          status: step.status,
          completedAt: step.completedAt,
          topics: {
            create: step.topics.map((topic) => ({
              name: topic.name,
              resources: topic.resources,
              status: topic.status,
              completedAt: topic.completedAt,
            })),
          },
        },
        include: {
          topics: true,
        },
      }),
    ),
  );

  return createdSteps;
}

export async function updateStep(id: string, userId: string, input: unknown) {
  const step = await prisma.step.findUnique({
    where: { id, learningPath: { userId } },
  });
  if (!step) {
    throw new AppError("Step not found", 404);
  }

  const data = updateStepSchema.parse(input);
  return prisma.step.update({ where: { id }, data });
}
