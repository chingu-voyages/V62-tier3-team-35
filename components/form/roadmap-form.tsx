"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LoaderCircle } from "lucide-react";

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

export function RoadmapForm() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [skillSearch, setSkillSearch] = useState("");

  useEffect(() => {
    if (screen !== "generating") return;

    const timer = window.setTimeout(() => setScreen("done"), 1400);
    return () => window.clearTimeout(timer);
  }, [screen]);

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

  if (screen === "generating") {
    return (
      <RoadmapFrame onClose={closeForm} onSaveExit={closeForm}>
        <section
          className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 text-center"
          aria-live="polite"
        >
          <span className="mb-6 grid size-16 place-items-center rounded-2xl bg-accent">
            <LoaderCircle
              className="size-8 animate-spin text-foreground"
              aria-hidden="true"
            />
          </span>
          <p className="mb-3 text-sm text-muted-foreground">
            Pathway is working
          </p>
          <h1 className="font-heading text-3xl leading-9 font-bold tracking-tight">
            Building your roadmap...
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-5 text-muted-foreground">
            We&apos;re turning your answers into a practical learning plan.
          </p>
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
            <Button
              variant="primary"
              size="lg"
              onClick={() => setScreen("generating")}
            >
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
            {screen === 5 ? "Review answers" : "Continue"}
          </Button>
        </footer>
      </form>
    </RoadmapFrame>
  );
}
