"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/form/layout/back-button";
import { RoadmapFrame } from "@/components/form/layout/roadmap-frame";
import { StepProgress } from "@/components/form/layout/step-progress";
import { Input } from "@/components/ui/input";
import { ChoiceGroup } from "@/components/form/controls/choice-group";
import {
  getChoiceTitle,
  goalChoices,
  levelChoices,
  skills,
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
  goal: "",
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

const customWeeklyHoursMin = 1;
const customWeeklyHoursMax = 80;

export function RoadmapForm() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>(1);
  const [form, setForm] = useState<FormData>(initialForm);

  useEffect(() => {
    if (screen !== "generating") return;

    const timer = window.setTimeout(() => setScreen("done"), 1400);
    return () => window.clearTimeout(timer);
  }, [screen]);

  const updateForm = (key: keyof FormData, value: string | string[]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleSkill = (skill: string) => {
    const nextSkills = form.skills.includes(skill)
      ? form.skills.filter((item) => item !== skill)
      : [...form.skills, skill];

    updateForm("skills", nextSkills);
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
        <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-sm text-muted-foreground">
            Pathway is working
          </p>
          <h1 className="text-3xl font-semibold">Building your roadmap...</h1>
        </section>
      </RoadmapFrame>
    );
  }

  if (screen === "done") {
    return (
      <RoadmapFrame onClose={closeForm} onSaveExit={closeForm}>
        <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-sm text-muted-foreground">
            Your answers are ready
          </p>
          <h1 className="text-3xl font-semibold">Your roadmap is ready</h1>
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
          <h1 className="mt-2 text-3xl font-semibold">
            Ready to build your path?
          </h1>
          <div className="mt-8 space-y-3">
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
                  className="flex items-center justify-between gap-4 rounded-xl border border-border p-4"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {labels[key]}
                    </p>
                    <p className="font-medium">{value}</p>
                  </div>
                  <button
                    className="text-sm font-medium underline"
                    onClick={() =>
                      setScreen(
                        (Object.keys(labels).indexOf(key) + 1) as FormStep,
                      )
                    }
                  >
                    Edit
                  </button>
                </div>
              );
            })}
          </div>
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
      ? "What do you want to learn?"
      : screen === 2
        ? "What is your current level?"
        : screen === 3
          ? "What do you already know?"
          : screen === 4
            ? "How much time do you have?"
            : "What pace feels right?";
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
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-3 text-muted-foreground">
            Choose the answer that best describes your situation.
          </p>
        </div>

        {screen === 3 ? (
          <div className="mt-8 grid grid-cols-2 gap-3 text-left">
            {skills.map((skill) => (
              <button
                key={skill}
                type="button"
                aria-pressed={form.skills.includes(skill)}
                className={`rounded-xl border p-4 text-left transition-colors ${form.skills.includes(skill) ? "border-primary bg-accent" : "border-border"}`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        ) : (
          <>
            <ChoiceGroup
              choices={choices}
              label={choiceLabel}
              value={selectedValue}
              onChange={handleChoiceChange}
            />
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
