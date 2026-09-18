"use client";

import { ChoiceStepBody } from "@/components/form/step/choice-step-body";
import { SkillsStep } from "@/components/form/step/skills-step";
import { TimeCommitmentStep } from "@/components/form/step/time-commitment-step";
import { getStepConfig, type FormStep } from "@/components/form/step-config";

type StepFieldsProps = {
  step: FormStep;
};

export function StepFields({ step }: StepFieldsProps) {
  const config = getStepConfig(step);

  if (config.body === "skills") {
    return <SkillsStep />;
  }

  if (config.customHours) {
    return <TimeCommitmentStep />;
  }

  return <ChoiceStepBody step={step} />;
}