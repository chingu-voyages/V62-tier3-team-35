import { z } from "zod";
import { resourceSchema } from "./generate-path.schema";

export const topicSchema = z.object({
  name: z.string(),
  resources: z.array(resourceSchema),
  status: z.enum(["upcoming", "in_progress", "done"]).default("upcoming"),
  completedAt: z.coerce.date().nullable().default(null),
});
