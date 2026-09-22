import type { Metadata } from "next";
import type { ReactNode } from "react";

import { WizardShell } from "@/components/generate-path/wizard-shell";

export const metadata: Metadata = {
  title: "Create a roadmap | Pathway",
  description: "Tell Pathway what you want to learn and build a focused plan.",
};

export default function GeneratePathLayout({ children }: { children: ReactNode }) {
  return <WizardShell>{children}</WizardShell>;
}