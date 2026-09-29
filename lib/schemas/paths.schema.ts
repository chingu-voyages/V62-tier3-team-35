import { z } from "zod";
import type { DefaultValues } from "react-hook-form";

export const customHoursMin = 1;
export const customHoursMax = 80;

const skillLevelValues = ["beginner", "intermediate", "advanced"] as const;
const learningPaceValues = ["recommended", "accelerated", "relaxed"] as const;
const pathStatusValues = ["draft", "active", "completed"] as const;

const skillLevelSchema = z.enum(skillLevelValues, {
  error: "Choose your experience level",
});
const learningPaceSchema = z.enum(learningPaceValues, {
  error: "Choose a target pace",
});
const pathStatusSchema = z.enum(pathStatusValues);

export const createPathSchema = z.object({
  careerGoal: z.string().min(1, "Choose a learning goal").max(300),
  skillLevel: skillLevelSchema,
  skills: z.array(z.string()),
  hoursPerWeek: z
    .number("Choose a weekly time commitment")
    .int(`Enter a whole number from ${customHoursMin} to ${customHoursMax}`)
    .min(
      customHoursMin,
      `Enter a whole number from ${customHoursMin} to ${customHoursMax}`,
    )
    .max(
      customHoursMax,
      `Enter a whole number from ${customHoursMin} to ${customHoursMax}`,
    ),
  learningPace: learningPaceSchema,
});

export const updatePathSchema = createPathSchema
  .partial()
  .extend({ status: pathStatusSchema.optional() });

export type CreatePathInput = z.infer<typeof createPathSchema>;
export type UpdatePathInput = z.infer<typeof updatePathSchema>;

export type RoadmapFormValues = z.infer<typeof createPathSchema>;

export type RoadmapFormKey = keyof RoadmapFormValues;

export const initialForm: DefaultValues<RoadmapFormValues> = {
  careerGoal: "",
  skillLevel: undefined,
  skills: [],
  hoursPerWeek: undefined,
  learningPace: undefined,
};