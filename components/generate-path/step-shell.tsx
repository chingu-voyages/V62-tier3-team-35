"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { BackButton } from "@/components/generate-path/layout/back-button";
import { StepProgress } from "@/components/generate-path/layout/step-progress";
import {
  firstUnansweredStepIndex,
  getStep,
  getStepIndex,
  stepPathForIndex,
  steps,
  type StepId,
} from "@/components/generate-path/step-config";
import { readDraft } from "@/lib/generate-path/draft-storage";
import type { RoadmapFormValues } from "@/lib/schemas/generate-path.schema";
import { Button } from "@/components/ui/button";
import { InfoBlock } from "@/components/common/info-block";

type StepShellProps = {
  stepId: StepId;
};

export function StepShell({ stepId }: StepShellProps) {
  const router = useRouter();
  const { trigger, getValues } = useFormContext<RoadmapFormValues>();
  const step = getStep(stepId);
  const index = getStepIndex(stepId);
  const isFirstStep = index === 0;
  const isLastStep = index === steps.length - 1;

  useEffect(() => {
    const blockingStep = firstUnansweredStepIndex(getValues());
    const draftBlockingStep = firstUnansweredStepIndex(readDraft() ?? {});
    if (
      blockingStep !== null &&
      blockingStep < index &&
      draftBlockingStep !== null &&
      draftBlockingStep < index
    ) {
      router.replace(stepPathForIndex(Math.min(blockingStep, draftBlockingStep)));
    }
  }, [getValues, index, router]);

  const goForward = async () => {
    const valid = await trigger(step.formKeys);
    if (!valid) return;

    router.push(
      isLastStep
        ? "/generate-path/review"
        : `/generate-path/${steps[index + 1].id}`,
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void goForward();
  };

  return (
    <form
      className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <div className="flex justify-center">
        <StepProgress step={index + 1} total={steps.length} />
      </div>
      <div className="mx-auto my-8 w-full text-center">
        <h1 className="font-heading text-2xl leading-8 font-bold tracking-tight sm:text-3xl sm:leading-9">
          {step.title}
        </h1>
        <p className="mt-2 text-sm leading-5 text-muted-foreground">
          {step.description}
        </p>
      </div>
      <step.Component />
      {step.infoBlock && (
        <InfoBlock
          className="mt-6"
          title={step.infoBlock.title}
          description={step.infoBlock.description}
        />
      )}
      <footer className="mt-auto flex justify-between gap-3 pt-10">
        {!isFirstStep && (
          <BackButton onClick={() => router.back()} />
        )}
        <Button
          variant="primary"
          size="lg"
          type={isLastStep ? "submit" : "button"}
          onClick={isLastStep ? undefined : () => void goForward()}
          className="ms-auto"
        >
          <span>{isLastStep ? "Review answers" : "Continue"}</span>
          <ArrowRight className="size-6" aria-hidden="true" />
        </Button>
      </footer>
    </form>
  );
}
