import type { Metadata } from "next";

import { RoadmapForm } from "@/components/form/roadmap-form";

export const metadata: Metadata = {
  title: "Create a roadmap | Pathway",
  description: "Tell Pathway what you want to learn and build a focused plan.",
};

export default function CreatePathPage() {
  return <RoadmapForm />;
}
