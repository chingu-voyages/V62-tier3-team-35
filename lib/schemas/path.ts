import { z } from "zod";

import {
  customHoursMax,
  customHoursMin,
  isTimeCommitmentValid,
} from "@/lib/form/time-commitment";

export const roadmapFormSchema = z.object({
  careerGoal: z.string().min(1, "Choose a learning goal"),
  skillLevel: z.string().min(1, "Choose your experience level"),
  skills: z.array(z.string()),
  timeCommitment: z.string().superRefine((value, ctx) => {
    if (value.trim() === "") {
      ctx.addIssue({
        code: "custom",
        message: "Choose a weekly time commitment",
      });
      return;
    }

    if (!isTimeCommitmentValid(value)) {
      ctx.addIssue({
        code: "custom",
        message: `Enter a whole number from ${customHoursMin} to ${customHoursMax}`,
      });
    }
  }),
  learningPace: z.string().min(1, "Choose a target pace"),
});

export type RoadmapFormValues = z.infer<typeof roadmapFormSchema>;

export type RoadmapFormKey = keyof RoadmapFormValues;

export const initialForm: RoadmapFormValues = {
  careerGoal: "frontend",
  skillLevel: "",
  skills: [],
  timeCommitment: "",
  learningPace: "",
};