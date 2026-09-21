import { notFound } from "next/navigation";

import { StepShell } from "@/features/create-path/components/step-shell";
import { isStepId } from "@/features/create-path/steps";

type StepPageProps = {
  params: Promise<{ stepId: string }>;
};

export default async function StepPage({ params }: StepPageProps) {
  const { stepId } = await params;
  if (!isStepId(stepId)) notFound();

  return <StepShell stepId={stepId} />;
}