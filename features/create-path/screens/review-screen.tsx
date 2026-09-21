"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { InfoBlock } from "@/features/create-path/controls/field-feedback";
import {
  getChoiceTitle,
  goalChoices,
  levelChoices,
  targetChoices,
} from "@/features/create-path/options/form-options";
import { BackButton } from "@/features/create-path/layout/back-button";
import {
  firstUnansweredStepIndex,
  formLabels,
  stepPathForIndex,
  steps,
} from "@/features/create-path/steps";
import { readDraft } from "@/features/create-path/draft-storage";
import { Button } from "@/components/ui/button";
import { getTimeCommitmentLabel } from "@/features/create-path/options/time-commitment";

import type { RoadmapFormKey, RoadmapFormValues } from "@/features/create-path/schema";

export function ReviewScreen() {
  const router = useRouter();
  const { getValues } = useFormContext<RoadmapFormValues>();
  const values = getValues();

  useEffect(() => {
    const blockingStep = firstUnansweredStepIndex(values);
    const draftBlockingStep = firstUnansweredStepIndex(readDraft() ?? {});
    if (blockingStep !== null && draftBlockingStep !== null) {
      router.replace(stepPathForIndex(Math.min(blockingStep, draftBlockingStep)));
    }
  }, [router, values]);

  const getAnswer = (key: RoadmapFormKey) => {
    switch (key) {
      case "careerGoal":
        return getChoiceTitle(goalChoices, values.careerGoal);
      case "skillLevel":
        return getChoiceTitle(levelChoices, values.skillLevel);
      case "hoursPerWeek":
        return getTimeCommitmentLabel(values.hoursPerWeek);
      case "learningPace":
        return getChoiceTitle(targetChoices, values.learningPace);
      case "skills":
        return (values.skills ?? []).join(", ") || "No skills selected";
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10">
      <p className="text-sm text-muted-foreground">Review your answers</p>
      <h1 className="mt-2 font-heading text-2xl leading-8 font-bold tracking-tight sm:text-3xl sm:leading-9">
        Review your plan
      </h1>
      <p className="mt-2 text-sm leading-5 text-muted-foreground">
        Make sure everything looks right before we build your roadmap.
      </p>
      <div className="mt-8 space-y-3">
        <p className="text-xs leading-4 font-semibold tracking-wider text-muted-foreground uppercase">
          Your inputs
        </p>
        {steps.map((step) => {
          const key = step.formKeys[0];
          return (
            <div
              key={key}
              className="flex min-h-14 items-center justify-between gap-4 rounded-lg border border-border bg-card px-3.5 py-3 transition-colors hover:border-foreground/20"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs leading-4 text-muted-foreground">
                  {formLabels[key]}
                </p>
                <p className="wrap-break-word text-sm leading-5 font-medium">
                  {getAnswer(key)}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                type="button"
                className="h-11 w-16 shrink-0 rounded-full border-input bg-card px-4 shadow-none hover:bg-muted"
                onClick={() => router.push(`/create-path/${step.id}`)}
              >
                Edit
              </Button>
            </div>
          );
        })}
      </div>
      <InfoBlock
        className="mt-5"
        title="You are in control"
        description="You can edit any answer before generating your roadmap."
      />
      <div className="mt-auto flex justify-between gap-3 pt-8">
        <BackButton onClick={() => router.back()} />
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push("/create-path/generating")}
        >
          Generate roadmap
        </Button>
      </div>
    </section>
  );
}
