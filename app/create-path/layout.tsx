import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RoadmapShell } from "@/components/form/roadmap-shell";

export const metadata: Metadata = {
  title: "Create a roadmap | Pathway",
  description: "Tell Pathway what you want to learn and build a focused plan.",
};

export default function CreatePathLayout({ children }: { children: ReactNode }) {
  return <RoadmapShell>{children}</RoadmapShell>;
}