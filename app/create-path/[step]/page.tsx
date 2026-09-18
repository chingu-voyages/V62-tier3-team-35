import { notFound } from "next/navigation";

import { StepFields } from "@/components/form/step";
import { isFormStep } from "@/components/form/step-config";

type StepPageProps = {
  params: Promise<{ step: string }>;
};

export default async function StepPage({ params }: StepPageProps) {
  const { step } = await params;
  const stepNumber = Number(step);

  if (!isFormStep(stepNumber)) {
    notFound();
  }

  return <StepFields step={stepNumber} />;
}