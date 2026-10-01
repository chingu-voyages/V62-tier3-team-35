import { z } from "zod";
import { resourceSchema } from "./generate-path.schema";

export const topicSchema = z.object({
  name: z.string(),
  resources: z.array(resourceSchema),
  isCompleted: z.boolean().default(false),
  completedAt: z.coerce.date().nullable().default(null),
});
