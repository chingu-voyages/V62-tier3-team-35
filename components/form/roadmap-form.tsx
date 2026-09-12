"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

type FormData = {
  goal: string;
  level: string;
  skills: string[];
  weeklyTime: string;
  target: string;
};

type FormStep = 1 | 2 | 3 | 4 | 5;
type Screen = FormStep | "review" | "generating" | "done";

type Choice = {
  value: string;
  title: string;
  description: string;
};

const goalChoices: Choice[] = [
  { value: "frontend", title: "Frontend Developer", description: "Build modern web applications" },
  { value: "backend", title: "Backend Developer", description: "Work with servers, databases and APIs" },
  { value: "fullstack", title: "Full Stack Developer", description: "Combine frontend and backend" },
];

const levelChoices: Choice[] = [
  { value: "beginner", title: "Beginner", description: "I am learning the fundamentals" },
  { value: "intermediate", title: "Intermediate", description: "I can build simple projects" },
  { value: "advanced", title: "Advanced", description: "I can build real applications" },
];

const timeChoices: Choice[] = [
  { value: "light", title: "1–3 hours per week", description: "A light learning pace" },
  { value: "balanced", title: "4–7 hours per week", description: "A balanced learning pace" },
  { value: "focused", title: "8–15 hours per week", description: "A focused learning pace" },
];

const targetChoices: Choice[] = [
  { value: "recommended", title: "Recommended", description: "A balanced roadmap" },
  { value: "accelerated", title: "Accelerated", description: "Finish in less time" },
  { value: "relaxed", title: "Relaxed", description: "Leave more room each week" },
];

const skills = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Git", "Testing"];

const initialForm: FormData = {
  goal: "",
  level: "",
  skills: [],
  weeklyTime: "",
  target: "",
};

const labels: Record<string, string> = {
  goal: "Learning goal",
  level: "Experience level",
  skills: "Known skills",
  weeklyTime: "Weekly time",
  target: "Target pace",
};

function getChoiceTitle(choices: Choice[], value: string) {
  return choices.find((choice) => choice.value === value)?.title ?? value;
}

function RoadmapFrame({
  children,
  onClose,
  onSaveExit,
}: {
  children: ReactNode;
  onClose: () => void;
  onSaveExit: () => void;
}) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="flex h-16 items-center justify-between gap-3 px-4 sm:h-18 sm:px-7">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Pathway
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" type="button" onClick={onSaveExit}>
            Save &amp; exit
          </Button>
          <Button
            variant="secondary"
            size="icon"
            type="button"
            aria-label="Close form"
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}

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

    setScreen(screen === 5 ? "review" : ((screen + 1) as FormStep));
  };

  const closeForm = () => router.push("/");

  if (screen === "generating") {
    return (
      <RoadmapFrame onClose={closeForm} onSaveExit={closeForm}>
        <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-sm text-muted-foreground">Pathway is working</p>
          <h1 className="text-3xl font-semibold">Building your roadmap...</h1>
        </section>
      </RoadmapFrame>
    );
  }

  if (screen === "done") {
    return (
      <RoadmapFrame onClose={closeForm} onSaveExit={closeForm}>
        <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-sm text-muted-foreground">Your answers are ready</p>
          <h1 className="text-3xl font-semibold">Your roadmap is ready</h1>
          <Button className="mt-8" onClick={() => setScreen(1)}>
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
          <h1 className="mt-2 text-3xl font-semibold">Ready to build your path?</h1>
          <div className="mt-8 space-y-3">
            {(Object.keys(labels) as Array<keyof FormData>).map((key) => {
              const value = key === "goal"
                ? getChoiceTitle(goalChoices, form.goal)
                : key === "level"
                  ? getChoiceTitle(levelChoices, form.level)
                  : key === "weeklyTime"
                    ? getChoiceTitle(timeChoices, form.weeklyTime)
                    : key === "target"
                      ? getChoiceTitle(targetChoices, form.target)
                      : form.skills.join(", ") || "No skills selected";

              return (
                <div key={key} className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{labels[key]}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                  <button className="text-sm font-medium underline" onClick={() => setScreen((Object.keys(labels).indexOf(key) + 1) as FormStep)}>
                    Edit
                  </button>
                </div>
              );
            })}
          </div>
          <div className="mt-auto flex justify-between gap-3 pt-8">
            <Button variant="outline" onClick={goBack}>Back</Button>
            <Button onClick={() => setScreen("generating")}>Generate roadmap</Button>
          </div>
        </section>
      </RoadmapFrame>
    );
  }

  const choices = screen === 1 ? goalChoices : screen === 2 ? levelChoices : screen === 4 ? timeChoices : targetChoices;
  const selectedValue = screen === 1 ? form.goal : screen === 2 ? form.level : screen === 4 ? form.weeklyTime : form.target;
  const title = screen === 1
    ? "What do you want to learn?"
    : screen === 2
      ? "What is your current level?"
      : screen === 3
        ? "What do you already know?"
        : screen === 4
          ? "How much time do you have?"
          : "What pace feels right?";

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
          <div
            className="flex items-center gap-2"
            role="group"
            aria-label={`Step ${screen} of 5`}
          >
            <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold">
              STEP {screen} OF 5
            </span>
            <div className="flex gap-1.5" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`h-1.5 w-7 rounded-full ${index < screen ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 w-full text-center">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-3 text-muted-foreground">Choose the answer that best describes your situation.</p>
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
          <div className="mt-8 space-y-3">
            {choices.map((choice) => (
              <button
                key={choice.value}
                type="button"
                aria-pressed={selectedValue === choice.value}
                className={`w-full rounded-xl border p-4 text-left transition-colors ${selectedValue === choice.value ? "border-primary bg-accent" : "border-border"}`}
                onClick={() => updateForm(screen === 1 ? "goal" : screen === 2 ? "level" : screen === 4 ? "weeklyTime" : "target", choice.value)}
              >
                <span className="block font-medium">{choice.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{choice.description}</span>
              </button>
            ))}
          </div>
        )}

        <footer className="mt-auto flex justify-between gap-3 pt-10">
          <Button variant="outline" type="button" disabled={screen === 1} onClick={goBack}>Back</Button>
          <Button type="submit">{screen === 5 ? "Review answers" : "Continue"}</Button>
        </footer>
      </form>
    </RoadmapFrame>
  );
}
