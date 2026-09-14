"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  LoaderCircle,
  Sparkles,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/form/layout/back-button";
import { RoadmapFrame } from "@/components/form/layout/roadmap-frame";
import { StepProgress } from "@/components/form/layout/step-progress";
import { Input } from "@/components/ui/input";
import { ChoiceGroup } from "@/components/form/controls/choice-group";
import { InfoBlock } from "@/components/form/controls/field-feedback";
import { SkillsPicker } from "@/components/form/controls/skills-picker";
import {
  getChoiceTitle,
  goalChoices,
  levelChoices,
  targetChoices,
  timeChoices,
} from "@/components/form/data/form-options";

type FormData = {
  goal: string;
  level: string;
  skills: string[];
  weeklyTime: string;
  customWeeklyHours: string;
  target: string;
};

type FormStep = 1 | 2 | 3 | 4 | 5;
type Screen = FormStep | "review" | "generating" | "done";

const initialForm: FormData = {
  goal: "frontend",
  level: "",
  skills: [],
  weeklyTime: "",
  customWeeklyHours: "",
  target: "",
};

const labels: Record<string, string> = {
  goal: "Learning goal",
  level: "Experience level",
  skills: "Known skills",
  weeklyTime: "Weekly time",
  target: "Target pace",
};

const stepDescriptions: Record<FormStep, string> = {
  1: "Choose a career direction or describe a specific learning goal. We'll tailor the roadmap around it.",
  2: "Tell us where you're starting so we can set the right level of challenge.",
  3: "Select the skills you already know. You can skip this if you're starting from scratch.",
  4: "Choose a weekly commitment that fits your routine.",
  5: "Set the pace that feels sustainable for your learning journey.",
};

const customWeeklyHoursMin = 1;
const customWeeklyHoursMax = 80;

type GenerationStep = {
  title: string;
  description: string;
};

const generationStepDurationMs = 1400;

function getGenerationSteps(form: FormData): GenerationStep[] {
  const goal = getChoiceTitle(goalChoices, form.goal);
  const level = getChoiceTitle(levelChoices, form.level);
  const weeklyTime = getChoiceTitle(timeChoices, form.weeklyTime);

  return [
    {
      title: "Understanding your goal",
      description: `${goal} · career direction`,
    },
    {
      title: "Assessing existing knowledge",
      description: `${level || "Your current level"} · ${form.skills.length} known skills`,
    },
    {
      title: "Finding skill gaps",
      description: `Prioritizing gaps around ${form.skills.length} known skills`,
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

function GenerationArtwork() {
  return (
    <div className="relative h-[145px] w-[166px] shrink-0" aria-hidden="true">
      <div className="relative h-[145px] w-[166px]">
        <span className="absolute -top-px -left-[31px] h-[145px] w-[228px] rounded-full bg-primary/10 blur-[62px] motion-reduce:blur-0" />
        <svg
          className="absolute inset-0 h-[145px] w-[166px] overflow-visible"
          viewBox="0 0 166 145"
          fill="none"
        >
          <g transform="matrix(0.9725 0 0 0.9861 -9.37 48.35)">
            <path
              d="M95.4857 8.3457C101.006 8.3457 105.146 9.7257 109.976 12.4857L162.416 42.8457C170.696 47.6757 170.696 55.2657 162.416 60.7857L109.976 90.4557C101.696 95.2857 89.9657 95.2857 81.6857 90.4557L28.5557 62.1657C20.2757 57.3357 20.2757 48.3657 28.5557 42.8457L81.6857 12.4857C86.5157 9.7257 90.6557 8.3457 95.4857 8.3457Z"
              fill="var(--success-bg)"
              stroke="var(--primary)"
              strokeWidth="0.69"
            />
          </g>
          <g transform="matrix(0.9725 0 0 0.9861 -10.72 19.8)">
            <path
              d="M95.4837 10.3457C101.004 10.3457 105.144 11.7257 109.974 14.4857L162.414 44.8457C170.694 49.6757 170.694 57.2657 162.414 62.7857L109.974 92.4557C101.694 97.2857 89.9638 97.2857 81.6838 92.4557L28.5538 64.1657C20.2738 59.3357 20.2738 50.3657 28.5538 44.8457L81.6838 14.4857C86.5137 11.7257 90.6537 10.3457 95.4837 10.3457Z"
              fill="var(--accent)"
              stroke="var(--primary)"
              strokeWidth="0.69"
            />
          </g>
          <g transform="matrix(0.9725 0 0 0.9861 -18.5 -16.12)">
            <path
              d="M103.486 16.3457C109.006 16.3457 113.146 17.7257 117.976 20.4857L170.416 50.8457C178.696 55.6757 178.696 63.2657 170.416 68.7857L117.976 98.4557C109.696 103.286 97.9657 103.286 89.6857 98.4557L36.5557 70.1657C28.2757 65.3357 28.2757 56.3657 36.5557 50.8457L89.6857 20.4857C94.5157 17.7257 98.6557 16.3457 103.486 16.3457Z"
              fill="var(--foreground)"
              stroke="var(--primary)"
              strokeWidth="0.69"
            />
          </g>
        </svg>
        <Sparkles className="absolute top-6 left-16 size-8 text-success-bg" />
      </div>
    </div>
  );
}

export function RoadmapForm() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [skillSearch, setSkillSearch] = useState("");
  const [generationProgress, setGenerationProgress] = useState(0);
  const generationSteps = getGenerationSteps(form);

  useEffect(() => {
    if (
      screen !== "generating" ||
      generationProgress >= generationSteps.length
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      const nextProgress = Math.min(
        generationProgress + 1,
        generationSteps.length,
      );

      setGenerationProgress(nextProgress);

      if (nextProgress === generationSteps.length) {
        setScreen("done");
      }
    }, generationStepDurationMs);

    return () => window.clearTimeout(timer);
  }, [generationProgress, generationSteps.length, screen]);

  const updateForm = (key: keyof FormData, value: string | string[]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const goBack = () => {
    if (screen === "review") {
      setScreen(5);
    } else if (typeof screen === "number" && screen > 1) {
      setScreen((screen - 1) as FormStep);
    }
  };

  const goForward = () => {
    if (typeof screen !== "number") return;

    if (screen === 4 && form.weeklyTime === "custom") {
      const hours = Number(form.customWeeklyHours);
      const invalidHours =
        !Number.isInteger(hours) ||
        hours < customWeeklyHoursMin ||
        hours > customWeeklyHoursMax;

      if (invalidHours) return;
    }

    setScreen(screen === 5 ? "review" : ((screen + 1) as FormStep));
  };

  const closeForm = () => router.push("/");

  const startGeneration = () => {
    setGenerationProgress(0);
    setScreen("generating");
  };

  if (screen === "generating") {
    const summaryItems = [
      { label: getChoiceTitle(goalChoices, form.goal), Icon: Target },
      { label: `${form.skills.length} known skills`, Icon: BadgeCheck },
      {
        label: getChoiceTitle(timeChoices, form.weeklyTime) || "Your schedule",
        Icon: CalendarDays,
      },
      { label: "Personalized path", Icon: Clock3 },
    ];

    return (
      <RoadmapFrame onClose={closeForm} onSaveExit={closeForm}>
        <section
          className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-4 pt-5 pb-8 text-center sm:px-6 sm:pt-8"
          aria-live="polite"
        >
          <GenerationArtwork />
          <div className="mt-2">
            <p className="mb-3 text-sm text-muted-foreground">
              Pathway is working
            </p>
            <h1 className="font-heading text-2xl leading-8 font-bold tracking-tight sm:text-3xl sm:leading-9">
              Building your personalized roadmap
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-5 text-muted-foreground">
              We&apos;re using your goal, experience, known skills, and schedule
              to build a path that fits you.
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
                  <span
                    className="h-6 w-px shrink-0 bg-border"
                    aria-hidden="true"
                  />
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
            description={`${form.skills.length} existing skills will count as known while we focus the roadmap on your next useful gaps.`}
          />
        </section>
      </RoadmapFrame>
    );
  }

  if (screen === "done") {
    return (
      <RoadmapFrame onClose={closeForm} onSaveExit={closeForm}>
        <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 text-center">
          <span className="mb-6 grid size-16 place-items-center rounded-2xl bg-success-bg text-success">
            <CheckCircle2 className="size-8" aria-hidden="true" />
          </span>
          <p className="mb-3 text-sm text-muted-foreground">
            Your answers are ready
          </p>
          <h1 className="font-heading text-3xl leading-9 font-bold tracking-tight">
            Your roadmap is ready
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-5 text-muted-foreground">
            Your plan is tailored to your goal, experience, skills, and pace.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="mt-8"
            onClick={() => setScreen(1)}
          >
            Create another roadmap
          </Button>
        </section>
      </RoadmapFrame>
    );
  }

  if (screen === "review") {
    return (
      <RoadmapFrame onClose={closeForm} onSaveExit={closeForm}>
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
            {(Object.keys(labels) as Array<keyof FormData>).map((key) => {
              const value =
                key === "goal"
                  ? getChoiceTitle(goalChoices, form.goal)
                  : key === "level"
                    ? getChoiceTitle(levelChoices, form.level)
                    : key === "weeklyTime"
                      ? form.customWeeklyHours
                        ? `${getChoiceTitle(timeChoices, form.weeklyTime)} (${form.customWeeklyHours}h/week)`
                        : getChoiceTitle(timeChoices, form.weeklyTime)
                      : key === "target"
                        ? getChoiceTitle(targetChoices, form.target)
                        : form.skills.join(", ") || "No skills selected";

              return (
                <div
                  key={key}
                  className="flex min-h-14 items-center justify-between gap-4 rounded-lg border border-border bg-card px-3.5 py-3 transition-colors hover:border-foreground/20"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs leading-4 text-muted-foreground">
                      {labels[key]}
                    </p>
                    <p className="break-words text-sm leading-5 font-medium">
                      {value}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    className="h-11 w-16 shrink-0 rounded-full border-input bg-card px-4 shadow-none hover:bg-muted"
                    onClick={() =>
                      setScreen(
                        (Object.keys(labels).indexOf(key) + 1) as FormStep,
                      )
                    }
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
            <BackButton onClick={goBack} />
            <Button variant="primary" size="lg" onClick={startGeneration}>
              Generate roadmap
            </Button>
          </div>
        </section>
      </RoadmapFrame>
    );
  }

  const choices =
    screen === 1
      ? goalChoices
      : screen === 2
        ? levelChoices
        : screen === 4
          ? timeChoices
          : targetChoices;
  const selectedValue =
    screen === 1
      ? form.goal
      : screen === 2
        ? form.level
        : screen === 4
          ? form.weeklyTime
          : form.target;
  const choiceKey =
    screen === 1
      ? "goal"
      : screen === 2
        ? "level"
        : screen === 4
          ? "weeklyTime"
          : "target";

  const handleChoiceChange = (value: string) => {
    if (choiceKey === "weeklyTime") {
      setForm((current) => ({
        ...current,
        weeklyTime: value,
        customWeeklyHours: value === "custom" ? current.customWeeklyHours : "",
      }));
      return;
    }

    updateForm(choiceKey, value);
  };

  const title =
    screen === 1
      ? "What do you want to achieve?"
      : screen === 2
        ? "What is your current level?"
        : screen === 3
          ? "What do you already know?"
          : screen === 4
            ? "How much time do you have?"
            : "What pace feels right?";
  const description = stepDescriptions[screen];
  const choiceLabel =
    screen === 1
      ? "Learning goal"
      : screen === 2
        ? "Experience level"
        : screen === 4
          ? "Weekly learning time"
          : "Target pace";
  const customHours = Number(form.customWeeklyHours);
  const customHoursInvalid =
    screen === 4 &&
    form.weeklyTime === "custom" &&
    (form.customWeeklyHours.trim() === "" ||
      !Number.isInteger(customHours) ||
      customHours < customWeeklyHoursMin ||
      customHours > customWeeklyHoursMax);

  return (
    <RoadmapFrame onClose={closeForm} onSaveExit={closeForm}>
      <form
        className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10"
        onSubmit={(event) => {
          event.preventDefault();
          goForward();
        }}
      >
        <div className="flex justify-center">
          <StepProgress step={screen} />
        </div>
        <div className="mx-auto mt-8 w-full text-center">
          <h1 className="font-heading text-2xl leading-8 font-bold tracking-tight sm:text-3xl sm:leading-9">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-5 text-muted-foreground">
            {description}
          </p>
        </div>

        {screen === 3 ? (
          <div className="mt-8">
            <SkillsPicker
              goalTitle={getChoiceTitle(goalChoices, form.goal)}
              search={skillSearch}
              selectedSkills={form.skills}
              onSearchChange={setSkillSearch}
              onSkillsChange={(skills) => updateForm("skills", skills)}
            />
          </div>
        ) : (
          <>
            <ChoiceGroup
              choices={choices}
              label={choiceLabel}
              value={selectedValue}
              onChange={handleChoiceChange}
            />
            {screen === 2 ? (
              <InfoBlock
                className="mt-5"
                title="Not sure where you fit?"
                description="Choose the closest match. You can adjust your roadmap later."
              />
            ) : null}
            {screen === 4 && form.weeklyTime === "custom" ? (
              <div className="mt-5">
                <label
                  htmlFor="custom-weekly-hours"
                  className="text-sm font-medium"
                >
                  Custom weekly hours
                </label>
                <div className="relative mt-2">
                  <Input
                    id="custom-weekly-hours"
                    type="number"
                    min={customWeeklyHoursMin}
                    max={customWeeklyHoursMax}
                    step="1"
                    inputMode="numeric"
                    value={form.customWeeklyHours}
                    onChange={(event) =>
                      updateForm("customWeeklyHours", event.target.value)
                    }
                    placeholder="e.g. 10"
                    className="h-11 bg-card pr-24"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
                    hours / week
                  </span>
                </div>
                {customHoursInvalid ? (
                  <p className="mt-2 text-sm text-destructive" role="alert">
                    Enter a whole number from {customWeeklyHoursMin} to{" "}
                    {customWeeklyHoursMax}.
                  </p>
                ) : null}
              </div>
            ) : null}
            {screen === 4 ? (
              <InfoBlock
                className="mt-5"
                title="Consistency beats intensity"
                description="A realistic weekly commitment is more useful than an ambitious one."
              />
            ) : null}
            {screen === 5 ? (
              <InfoBlock
                className="mt-5"
                title="Your pace can change"
                description="This setting shapes the amount of work each week, not your final destination."
              />
            ) : null}
          </>
        )}

        <footer className="mt-auto flex justify-between gap-3 pt-10">
          {screen === 1 ? (
            <span aria-hidden="true" />
          ) : (
            <BackButton onClick={goBack} />
          )}
          <Button variant="primary" size="lg" type="submit">
            <span>{screen === 5 ? "Review answers" : "Continue"}</span>
            <ArrowRight className="size-6" aria-hidden="true" />
          </Button>
        </footer>
      </form>
    </RoadmapFrame>
  );
}
