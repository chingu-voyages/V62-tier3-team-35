import { z } from "zod";

const resourceSchema = z.object({
  title: z.string(),
  type: z.string(),
  description: z.string(),
  url: z.string(),
});

const topicSchema = z.object({
  name: z.string(),
  resources: z.array(resourceSchema).min(1).max(3),
});

const technologySchema = z.object({
  technology: z.string(),
  keyTopics: z.string(),
  description: z.string(),
  estimatedHours: z.number(),
  estimatedWeeks: z.number(),
  topics: z.array(topicSchema).min(1),
});

export const generatePathResponseSchema = z.object({
  roadmap: z.array(technologySchema),
});

export type generatePathResponse = z.infer<typeof generatePathResponseSchema>;
