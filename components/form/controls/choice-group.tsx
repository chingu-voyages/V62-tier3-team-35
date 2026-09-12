import { RadioGroup } from "@/components/ui/radio-group";
import { OptionRow } from "@/components/form/controls/option-row";
import type { FormOption } from "@/components/form/data/form-options";

type ChoiceGroupProps = {
  choices: readonly FormOption[];
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function ChoiceGroup({
  choices,
  label,
  value,
  onChange,
}: ChoiceGroupProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      aria-label={label}
      className="mt-8 gap-3"
    >
      {choices.map((choice) => (
        <OptionRow key={choice.value} {...choice} />
      ))}
    </RadioGroup>
  );
}
