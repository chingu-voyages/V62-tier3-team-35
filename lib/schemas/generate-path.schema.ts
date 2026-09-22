import { z } from "zod";
import type { DefaultValues } from "react-hook-form";

export const customHoursMin = 1;
export const customHoursMax = 80;

export const roadmapFormSchema = z.object({
  careerGoal: z.string().min(1, "Choose a learning goal"),
  skillLevel: z.string().min(1, "Choose your experience level"),
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
  learningPace: z.string().min(1, "Choose a target pace"),
});

export type RoadmapFormValues = z.infer<typeof roadmapFormSchema>;

export type RoadmapFormKey = keyof RoadmapFormValues;

export const initialForm: DefaultValues<RoadmapFormValues> = {
  careerGoal: "",
  skillLevel: "",
  skills: [],
  hoursPerWeek: undefined,
  learningPace: "",
};