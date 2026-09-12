import type { LucideIcon } from "lucide-react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type ChoiceOption = {
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

type ChoiceGroupProps = {
  choices: ChoiceOption[];
  value: string;
  onChange: (value: string) => void;
};

export function ChoiceGroup({ choices, value, onChange }: ChoiceGroupProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      aria-label="Choose an option"
      className="mt-8 gap-3"
    >
      {choices.map((choice) => {
        const Icon = choice.icon;
        const inputId = `choice-${choice.value}`;
        const isSelected = value === choice.value;

        return (
          <label
            key={choice.value}
            htmlFor={inputId}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-left transition-colors ${isSelected ? "border-primary bg-accent" : "border-border"}`}
          >
            <RadioGroupItem
              id={inputId}
              value={choice.value}
              className="mt-0.5"
            />
            <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <span>
              <span className="block font-medium">{choice.title}</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {choice.description}
              </span>
            </span>
          </label>
        );
      })}
    </RadioGroup>
  );
}
