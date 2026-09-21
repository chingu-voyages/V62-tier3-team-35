"use client";

import { useController, useFormContext } from "react-hook-form";

import { ChoiceGroup } from "@/features/create-path/controls/choice-group";
import { FieldError } from "@/features/create-path/controls/field-feedback";
import { formLabels } from "@/features/create-path/steps";
import type { FormOption } from "@/features/create-path/options/form-options";
import type { RoadmapFormKey, RoadmapFormValues } from "@/features/create-path/schema";

type ChoiceFormKey = Exclude<RoadmapFormKey, "skills" | "hoursPerWeek">;

type ChoiceStepProps = {
  formKey: ChoiceFormKey;
  choices: readonly FormOption[];
};

export function ChoiceStep({ formKey, choices }: ChoiceStepProps) {
  const { field } = useController<RoadmapFormValues, ChoiceFormKey>({
    name: formKey,
  });
  const { formState } = useFormContext<RoadmapFormValues>();
  const error = formState.errors[formKey];
  const errorId = `field-error-${formKey}`;

  return (
    <>
      <ChoiceGroup
        choices={choices}
        label={formLabels[formKey]}
        value={field.value}
        onChange={field.onChange}
        errorId={error?.message ? errorId : undefined}
      />
      {error?.message && <FieldError id={errorId}>{error.message}</FieldError>}
    </>
  );
}
