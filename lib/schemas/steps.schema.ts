import { z } from "zod";

export const stepSchema = z.object({
  order: z.int().nonnegative(),
  title: z.string().min(1).max(200),
  description: z.string(),
  estimatedTime: z.string(),
  isCompleted: z.boolean().default(false),
  completedAt: z.coerce.date().nullable().default(null),
});

export const createStepsSchema = z.array(stepSchema);

export const createStepsRequestSchema = z.object({
  learningPathId: z.string().min(1),
  steps: createStepsSchema,
});

export const updateStepSchema = stepSchema.partial();

export type GeneratedStepInput = z.infer<typeof stepSchema>;
export type UpdateStepInput = z.infer<typeof updateStepSchema>;
