"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useEffect, type ReactNode } from "react";

import {
  initialForm,
  roadmapFormSchema,
  type RoadmapFormValues,
} from "@/lib/schemas/generate-path.schema";
import { readDraft, saveDraft } from "@/lib/generate-path/draft-storage";

export function GeneratePathFormProvider({ children }: { children: ReactNode }) {
  const methods = useForm<RoadmapFormValues>({
    resolver: zodResolver(roadmapFormSchema),
    defaultValues: initialForm,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    const draft = readDraft();
    if (draft) methods.reset({ ...initialForm, ...draft });
  }, [methods]);

  const values = useWatch({ control: methods.control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveDraft(values as RoadmapFormValues);
    }, 400);
    return () => clearTimeout(timeout);
  }, [values]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}