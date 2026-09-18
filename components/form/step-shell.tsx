"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import { BackButton } from "@/components/form/layout/back-button";
import { StepProgress } from "@/components/form/layout/step-progress";
import {
  getStepConfig,
  getStepValidationFields,
  type FormStep,
} from "@/components/form/step-config";
import type { RoadmapFormValues } from "@/lib/schemas/path";
import { Button } from "@/components/ui/button";

type StepShellProps = {
  step: FormStep;
  children: ReactNode;
};

export function StepShell({ step, children }: StepShellProps) {
  const router = useRouter();
  const { getValues, trigger } = useFormContext<RoadmapFormValues>();
  const config = getStepConfig(step);
  const isLastStep = step === 5;
  

  const goForward = async () => {

    const valid = await trigger(getStepValidationFields(step));
    if (!valid) return;

    router.push(
      isLastStep ? "/create-path/review" : `/create-path/${step + 1}`,
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("roadmap form values", getValues());

    void goForward();
  };

  return (
    <form
      className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <div className="flex justify-center">
        <StepProgress step={step} />
      </div>
      <div className="mx-auto mt-8 w-full text-center">
        <h1 className="font-heading text-2xl leading-8 font-bold tracking-tight sm:text-3xl sm:leading-9">
          {config.title}
        </h1>
        <p className="mt-2 text-sm leading-5 text-muted-foreground">
          {config.description}
        </p>
      </div>
      {children}
      <footer className="mt-auto flex justify-between gap-3 pt-10">
        {step === 1 ? (
          <span aria-hidden="true" />
        ) : (
          <BackButton onClick={() => router.push(`/create-path/${step - 1}`)} />
        )}
        <Button
          variant="primary"
          size="lg"
          type={isLastStep ? "submit" : "button"}
          onClick={isLastStep ? undefined : () => void goForward()}
        >
          <span>{isLastStep ? "Review answers" : "Continue"}</span>
          <ArrowRight className="size-6" aria-hidden="true" />
        </Button>
      </footer>
    </form>
  );
}