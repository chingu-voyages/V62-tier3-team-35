"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Check,
  Circle,
  Clock3,
  LoaderCircle,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

import { InfoBlock } from "@/components/common/info-block";
import { clearDraft, readDraft } from "@/lib/generate-path/draft-storage";
import {
  getChoiceTitle,
  goalChoices,
  levelChoices,
} from "@/components/generate-path/data/form-options";
import { GenerationArtwork } from "@/components/generate-path/screens/generation-artwork";
import { getTimeCommitmentLabel } from "@/components/generate-path/data/time-commitment";
import {
  firstUnansweredStepIndex,
  stepPathForIndex,
} from "@/components/generate-path/step-config";
import type { RoadmapFormValues } from "@/lib/schemas/generate-path.schema";

const generationStepDurationMs = 1400;

type GenerationStep = {
  title: string;
  description: string;
};

function getGenerationSteps(values: RoadmapFormValues): GenerationStep[] {
  const goal = getChoiceTitle(goalChoices, values.careerGoal);
  const level = getChoiceTitle(levelChoices, values.skillLevel);
  const weeklyTime = getTimeCommitmentLabel(values.hoursPerWeek);

  return [
    {
      title: "Understanding your goal",
      description: `${goal} · career direction`,
    },
    {
      title: "Assessing existing knowledge",
      description: `${level || "Your current level"} · ${(values.skills ?? []).length} known skills`,
    },
    {
      title: "Finding skill gaps",
      description: `Prioritizing gaps around ${(values.skills ?? []).length} known skills`,
    },
    {
      title: "Building your learning sequence",
      description: "Ordering milestones and dependencies",
    },
    {
      title: "Estimating workload",
      description: `Balancing your plan with ${weeklyTime || "your schedule"}`,
    },
    {
      title: "Finding learning resources",
      description: "Matching resources to each milestone",
    },
  ];
}

export function GenerationScreen() {
  const router = useRouter();
  const { getValues } = useFormContext<RoadmapFormValues>();
  const values = getValues();
  const [generationProgress, setGenerationProgress] = useState(0);
  const generationSteps = getGenerationSteps(values);

  useEffect(() => {
    const blockingStep = firstUnansweredStepIndex(values);
    const draftBlockingStep = firstUnansweredStepIndex(readDraft() ?? {});
    if (blockingStep !== null && draftBlockingStep !== null) {
      router.replace(stepPathForIndex(Math.min(blockingStep, draftBlockingStep)));
    }
  }, [router, values]);

  useEffect(() => {
    if (generationProgress >= generationSteps.length) {
      clearDraft();
      router.replace("/generate-path/done");
      return;
    }

    const timer = window.setTimeout(() => {
      setGenerationProgress((current) =>
        Math.min(current + 1, generationSteps.length),
      );
    }, generationStepDurationMs);

    return () => window.clearTimeout(timer);
  }, [generationProgress, generationSteps.length, router]);

  const summaryItems = [
    { label: getChoiceTitle(goalChoices, values.careerGoal), Icon: Target },
    { label: `${(values.skills ?? []).length} known skills`, Icon: BadgeCheck },
    {
      label: getTimeCommitmentLabel(values.hoursPerWeek) || "Your schedule",
      Icon: CalendarDays,
    },
    { label: "Personalized path", Icon: Clock3 },
  ];

  return (
    <section
      className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-4 pt-5 pb-8 text-center sm:px-6 sm:pt-8"
      aria-live="polite"
    >
      <GenerationArtwork />
      <div className="mt-2">
        <p className="mb-3 text-sm text-muted-foreground">Pathway is working</p>
        <h1 className="font-heading text-2xl leading-8 font-bold tracking-tight sm:text-3xl sm:leading-9">
          Building your personalized roadmap
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-5 text-muted-foreground">
          We&apos;re using your goal, experience, known skills, and schedule to
          build a path that fits you.
        </p>
      </div>

      <div className="mt-6 flex h-12 w-full items-center overflow-x-auto rounded-full border border-border bg-card px-3.5 text-left shadow-sm">
        {summaryItems.map(({ label, Icon }, index) => (
          <div className="contents" key={label}>
            <div className="flex min-w-32 flex-1 items-center gap-1.5 px-2.5 sm:min-w-0">
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              <span className="truncate text-xs leading-4 font-semibold">
                {label}
              </span>
            </div>
            {index < summaryItems.length - 1 ? (
              <span className="h-6 w-px shrink-0 bg-border" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>

      <div className="relative mt-6 w-full max-w-lg text-left">
        <div className="absolute top-5 bottom-5 left-4 w-px bg-border" />
        <div className="relative flex flex-col gap-1.5">
          {generationSteps.map(({ title, description }, index) => {
            const completed = index < generationProgress;
            const active =
              generationProgress < generationSteps.length &&
              index === generationProgress;

            return (
              <div
                key={title}
                className="relative flex min-h-12 items-start gap-4 pr-4"
              >
                <div
                  className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full ${completed ? "bg-success-bg text-foreground" : active ? "border-2 border-success border-r-border border-b-border bg-secondary" : "border border-border bg-secondary"}`}
                >
                  {completed ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : active ? (
                    <LoaderCircle
                      className="size-4 animate-spin text-foreground"
                      aria-hidden="true"
                    />
                  ) : (
                    <Circle
                      className="size-2 fill-border text-border"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <p className="truncate text-sm leading-5 font-medium">
                    {title}
                  </p>
                  <p className="truncate text-xs leading-4 text-muted-foreground">
                    {description}
                  </p>
                </div>
                <span
                  className={`w-20 shrink-0 pt-3 text-right text-xs leading-4 ${active ? "font-medium text-foreground" : "text-muted-foreground"}`}
                >
                  {completed
                    ? "Completed"
                    : active
                      ? "In progress"
                      : "Waiting"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <InfoBlock
        className="mt-7 w-full max-w-lg text-left"
        iconClassName="text-info"
        title="What Pathway found"
        description={`${(values.skills ?? []).length} existing skills will count as known while we focus the roadmap on your next useful gaps.`}
      />
    </section>
  );
}