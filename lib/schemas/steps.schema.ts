import { z } from "zod";
import { topicSchema } from "./topics.schema";

export const stepSchema = z.object({
  // order: z.int().nonnegative(),
  title: z.string().min(1).max(200),
  description: z.string(),
  icon: z.string(),
  keyTopics: z.string(),
  estimatedTime: z.int().positive(),
  status: z.enum(["upcoming", "in_progress", "done"]).default("upcoming"),
  completedAt: z.coerce.date().nullable().default(null),
  topics: z.array(topicSchema),
});

export const createStepsSchema = z.array(stepSchema);

export const createStepsRequestSchema = z.object({
  learningPathId: z.string().min(1),
  steps: createStepsSchema,
});

export const updateStepSchema = stepSchema.omit({ topics: true }).partial();

export type GeneratedStepInput = z.infer<typeof stepSchema>;
export type UpdateStepInput = z.infer<typeof updateStepSchema>;
