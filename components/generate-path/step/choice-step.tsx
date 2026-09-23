"use client";

import { useController, useFormContext } from "react-hook-form";

import { ChoiceGroup } from "@/components/generate-path/controls/choice-group";
import { ErrorMessage } from "@/components/common/error-message";
import { formLabels } from "@/components/generate-path/step-config";
import type { FormOption } from "@/components/generate-path/data/form-options";
import type { RoadmapFormKey, RoadmapFormValues } from "@/lib/schemas/generate-path.schema";

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
      {error?.message && <ErrorMessage id={errorId}>{error.message}</ErrorMessage>}
    </>
  );
}
