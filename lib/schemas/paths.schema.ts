import { z } from "zod";
import {
  LearningPace,
  PathStatus,
  SkillLevel,
} from "@/lib/generated/prisma/client";

const skillLevelSchema = z.enum(
  Object.values(SkillLevel) as [SkillLevel, ...SkillLevel[]],
);
const learningPaceSchema = z.enum(
  Object.values(LearningPace) as [LearningPace, ...LearningPace[]],
);
const pathStatusSchema = z.enum(
  Object.values(PathStatus) as [PathStatus, ...PathStatus[]],
);

export const createPathSchema = z.object({
  careerGoal: z.string().min(1).max(300),
  skillLevel: skillLevelSchema,
  skills: z.array(z.string()),
  hoursPerWeek: z.int().positive(),
  learningPace: learningPaceSchema,
});

export const updatePathSchema = createPathSchema
  .partial()
  .extend({ status: pathStatusSchema.optional() });

export type CreatePathInput = z.infer<typeof createPathSchema>;
export type UpdatePathInput = z.infer<typeof updatePathSchema>;