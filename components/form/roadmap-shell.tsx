"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { RoadmapFrame } from "@/components/form/layout/roadmap-frame";
import { RoadmapFormProvider } from "@/components/form/roadmap-form-provider";

export function RoadmapShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const closeForm = () => router.push("/");

  return (
    <RoadmapFormProvider>
      <RoadmapFrame onClose={closeForm} onSaveExit={closeForm}>
        {children}
      </RoadmapFrame>
    </RoadmapFormProvider>
  );
}