import { notFound } from "next/navigation";

import { StepShell } from "@/components/form/step-shell";
import { isFormStep } from "@/components/form/step-config";

type StepLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ step: string }>;
};

export default async function StepLayout({
  children,
  params,
}: StepLayoutProps) {
  const { step } = await params;
  const stepNumber = Number(step);

  if (!isFormStep(stepNumber)) {
    notFound();
  }

  return <StepShell step={stepNumber}>{children}</StepShell>;
}