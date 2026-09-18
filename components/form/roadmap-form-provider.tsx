"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type { ReactNode } from "react";

import {
  initialForm,
  roadmapFormSchema,
  type RoadmapFormValues,
} from "@/lib/schemas/path";

export function RoadmapFormProvider({ children }: { children: ReactNode }) {
  const methods = useForm<RoadmapFormValues>({
    resolver: zodResolver(roadmapFormSchema),
    defaultValues: initialForm,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}