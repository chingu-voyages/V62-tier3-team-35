import type { ComponentType } from "react";

import { ChoiceStep } from "@/components/generate-path/step/choice-step";
import { SkillsStep } from "@/components/generate-path/step/skills-step";
import { TimeCommitmentStep } from "@/components/generate-path/step/time-commitment-step";
import {
  goalChoices,
  levelChoices,
  targetChoices,
} from "@/components/generate-path/data/form-options";
import type { RoadmapFormKey, RoadmapFormValues } from "@/lib/schemas/generate-path.schema";

export type StepId =
  | "career-goal"
  | "skill-level"
  | "skills"
  | "time-commitment"
  | "learning-pace";

export type Step = {
  id: StepId;
  title: string;
  description: string;
  formKeys: RoadmapFormKey[];
  Component: ComponentType;
  infoBlock?: {
    title: string;
    description: string;
  };
};

export const steps: Step[] = [
  {
    id: "career-goal",
    title: "What do you want to achieve?",
    description:
      "Choose a career direction or describe a specific learning goal. We'll tailor the roadmap around it.",
    formKeys: ["careerGoal"],
    Component: () => <ChoiceStep formKey="careerGoal" choices={goalChoices} />,
  },
  {
    id: "skill-level",
    title: "What is your current level?",
    description:
      "Tell us where you're starting so we can set the right level of challenge.",
    formKeys: ["skillLevel"],
    Component: () => <ChoiceStep formKey="skillLevel" choices={levelChoices} />,
    infoBlock: {
      title: "Not sure where you fit?",
      description:
        "Choose the closest match. You can adjust your roadmap later.",
    },
  },
  {
    id: "skills",
    title: "What do you already know?",
    description:
      "Select the skills you already know. You can skip this if you're starting from scratch.",
    formKeys: ["skills"],
    Component: SkillsStep,
    infoBlock: {
      title: "Starting from scratch?",
      description: "You can continue without selecting anything.",
    },
  },
  {
    id: "time-commitment",
    title: "How much time do you have?",
    description: "Choose a weekly commitment that fits your routine.",
    formKeys: ["hoursPerWeek"],
    Component: TimeCommitmentStep,
    infoBlock: {
      title: "Consistency beats intensity",
      description:
        "A realistic weekly commitment is more useful than an ambitious one.",
    },
  },
  {
    id: "learning-pace",
    title: "What pace feels right?",
    description:
      "Set the pace that feels sustainable for your learning journey.",
    formKeys: ["learningPace"],
    Component: () => (
      <ChoiceStep formKey="learningPace" choices={targetChoices} />
    ),
    infoBlock: {
      title: "Your pace can change",
      description:
        "This setting shapes the amount of work each week, not your final destination.",
    },
  },
];

export const firstStepPath = `/generate-path/${steps[0].id}`;

export const formLabels: Record<RoadmapFormKey, string> = {
  careerGoal: "Learning goal",
  skillLevel: "Experience level",
  skills: "Known skills",
  hoursPerWeek: "Weekly learning time",
  learningPace: "Target pace",
};

export function isStepId(value: unknown): value is StepId {
  return typeof value === "string" && steps.some((step) => step.id === value);
}

export function getStep(id: StepId): Step {
  return steps.find((step) => step.id === id)!;
}

export function getStepIndex(id: StepId): number {
  return steps.findIndex((step) => step.id === id);
}

const SKIPPABLE_STEP_KEYS: RoadmapFormKey[] = ["skills"];

function stepValueIsAnswered(
  key: RoadmapFormKey,
  values: Partial<RoadmapFormValues>,
): boolean {
  const value = values[key];
  return (
    value !== undefined &&
    value !== "" &&
    !(Array.isArray(value) && value.length === 0)
  );
}

export function firstUnansweredStepIndex(
  values: Partial<RoadmapFormValues>,
): number | null {
  for (let index = 0; index < steps.length; index++) {
    const key = steps[index].formKeys[0];
    if (SKIPPABLE_STEP_KEYS.includes(key)) continue;
    if (!stepValueIsAnswered(key, values)) return index;
  }
  return null;
}

export function stepPathForIndex(index: number): string {
  return `/generate-path/${steps[index].id}`;
}
