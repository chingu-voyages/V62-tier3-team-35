import { notFound } from "next/navigation";

import { StepShell } from "@/components/generate-path/step-shell";
import { isStepId } from "@/components/generate-path/step-config";

type StepPageProps = {
  params: Promise<{ stepId: string }>;
};

export default async function StepPage({ params }: StepPageProps) {
  const { stepId } = await params;
  if (!isStepId(stepId)) notFound();

  return <StepShell stepId={stepId} />;
}