import {
  roadmapFormSchema,
  type RoadmapFormValues,
} from "@/lib/schemas/generate-path.schema";

const DRAFT_KEY = "pathway:generate-path-draft";

export function readDraft(): Partial<RoadmapFormValues> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = roadmapFormSchema.partial().safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function saveDraft(values: RoadmapFormValues) {
  if (typeof window === "undefined") return;
  const draft = JSON.parse(JSON.stringify(values)) as Partial<RoadmapFormValues>;
  for (const key of Object.keys(draft) as (keyof RoadmapFormValues)[]) {
    const value = draft[key];
    if (
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete draft[key];
    }
  }
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DRAFT_KEY);
}