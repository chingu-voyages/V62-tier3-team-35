import { RadioGroup } from "@/components/ui/radio-group";
import { OptionRow } from "@/components/generate-path/controls/option-row";
import type { FormOption } from "@/components/generate-path/data/form-options";

type ChoiceGroupProps = {
  choices: readonly FormOption[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  errorId?: string;
};

export function ChoiceGroup({
  choices,
  label,
  value,
  onChange,
  errorId,
}: ChoiceGroupProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      aria-label={label}
      aria-describedby={errorId}
    >
      {choices.map((choice) => (
        <OptionRow key={choice.value} {...choice} />
      ))}
    </RadioGroup>
  );
}
