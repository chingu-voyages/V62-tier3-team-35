"use client";

import { useController, useFormContext } from "react-hook-form";

import { ChoiceGroup } from "@/components/form/controls/choice-group";
import {
  FieldError,
  InfoBlock,
} from "@/components/form/controls/field-feedback";
import { getStepConfig, type FormStep } from "@/components/form/step-config";
import type {
  RoadmapFormKey,
  RoadmapFormValues,
} from "@/lib/schemas/path";

type ChoiceFormKey = Exclude<RoadmapFormKey, "skills">;

type ChoiceStepBodyProps = {
  step: FormStep;
};

export function ChoiceStepBody({ step }: ChoiceStepBodyProps) {
  const config = getStepConfig(step);
  const formKey =
    config.body === "choice" ? config.formKey : "careerGoal";
  const { field } = useController<RoadmapFormValues, ChoiceFormKey>({
    name: formKey,
  });
  const { formState, trigger } = useFormContext<RoadmapFormValues>();
  const error = formState.errors[formKey];
  const errorId = `field-error-${formKey}`;

  const handleChange = (value: string) => {
    field.onChange(value);
    void trigger([formKey]);
  };

  if (config.body !== "choice") return null;

  const { choices, choiceLabel, infoBlock } = config;

  return (
    <>
      <ChoiceGroup
        choices={choices}
        label={choiceLabel}
        value={field.value}
        onChange={handleChange}
        errorId={error?.message ? errorId : undefined}
      />
      {error?.message ? (
        <FieldError id={errorId}>{error.message}</FieldError>
      ) : null}
      {infoBlock ? (
        <InfoBlock
          className="mt-5"
          title={infoBlock.title}
          description={infoBlock.description}
        />
      ) : null}
    </>
  );
}