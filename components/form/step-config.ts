import {
  goalChoices,
  levelChoices,
  targetChoices,
  timeChoices,
  type FormOption,
} from "@/components/form/data/form-options";
import type { RoadmapFormKey } from "@/lib/schemas/path";

export type FormStep = 1 | 2 | 3 | 4 | 5;

export type StepChoiceConfig = {
  step: FormStep;
  title: string;
  description: string;
  body: "choice";
  choiceLabel: string;
  formKey: Exclude<RoadmapFormKey, "skills">;
  choices: readonly FormOption[];
  infoBlock?: {
    title: string;
    description: string;
  };
  customHours?: boolean;
};

export type StepSkillsConfig = {
  step: FormStep;
  title: string;
  description: string;
  body: "skills";
};

export type StepConfig = StepChoiceConfig | StepSkillsConfig;

export const steps: StepConfig[] = [
  {
    step: 1,
    title: "What do you want to achieve?",
    description:
      "Choose a career direction or describe a specific learning goal. We'll tailor the roadmap around it.",
    body: "choice",
    choiceLabel: "Learning goal",
    formKey: "careerGoal",
    choices: goalChoices,
  },
  {
    step: 2,
    title: "What is your current level?",
    description:
      "Tell us where you're starting so we can set the right level of challenge.",
    body: "choice",
    choiceLabel: "Experience level",
    formKey: "skillLevel",
    choices: levelChoices,
    infoBlock: {
      title: "Not sure where you fit?",
      description: "Choose the closest match. You can adjust your roadmap later.",
    },
  },
  {
    step: 3,
    title: "What do you already know?",
    description:
      "Select the skills you already know. You can skip this if you're starting from scratch.",
    body: "skills",
  },
  {
    step: 4,
    title: "How much time do you have?",
    description: "Choose a weekly commitment that fits your routine.",
    body: "choice",
    choiceLabel: "Weekly learning time",
    formKey: "timeCommitment",
    choices: timeChoices,
    customHours: true,
    infoBlock: {
      title: "Consistency beats intensity",
      description:
        "A realistic weekly commitment is more useful than an ambitious one.",
    },
  },
  {
    step: 5,
    title: "What pace feels right?",
    description: "Set the pace that feels sustainable for your learning journey.",
    body: "choice",
    choiceLabel: "Target pace",
    formKey: "learningPace",
    choices: targetChoices,
    infoBlock: {
      title: "Your pace can change",
      description:
        "This setting shapes the amount of work each week, not your final destination.",
    },
  },
];

export const formLabels: Record<RoadmapFormKey, string> = {
  careerGoal: "Learning goal",
  skillLevel: "Experience level",
  skills: "Known skills",
  timeCommitment: "Weekly time",
  learningPace: "Target pace",
};

export function isFormStep(value: unknown): value is FormStep {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 5
  );
}

export function getStepConfig(step: FormStep): StepConfig {
  return steps[step - 1];
}

export function getStepValidationFields(step: FormStep): RoadmapFormKey[] {
  switch (step) {
    case 1:
      return ["careerGoal"];
    case 2:
      return ["skillLevel"];
    case 3:
      return ["skills"];
    case 4:
      return ["timeCommitment"];
    case 5:
      return ["learningPace"];
  }
}