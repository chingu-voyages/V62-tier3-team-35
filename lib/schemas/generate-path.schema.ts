import { z } from "zod";

export const resourceSchema = z.object({
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
  title: z.string(),
  keyTopics: z.string(),
  icon: z.string(),
  description: z.string(),
  estimatedTime: z.number().int().positive(),
  topics: z.array(topicSchema).min(1),
});

export const generatePathResponseSchema = z.object({
  roadmap: z.array(technologySchema),
});

export type GeneratePathResponse = z.infer<typeof generatePathResponseSchema>;
