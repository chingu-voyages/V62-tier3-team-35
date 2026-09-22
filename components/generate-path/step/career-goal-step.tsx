"use client";

import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { ChoiceGroup } from "@/components/generate-path/controls/choice-group";
import { FieldError } from "@/components/generate-path/controls/field-feedback";
import { goalChoices } from "@/components/generate-path/data/form-options";
import { formLabels } from "@/components/generate-path/step-config";
import { Input } from "@/components/ui/input";
import type { RoadmapFormValues } from "@/lib/schemas/generate-path.schema";

export function CareerGoalStep() {
  const [customTouched, setCustomTouched] = useState(false);
  const { formState } = useFormContext<RoadmapFormValues>();

  const { field } = useController<RoadmapFormValues, "careerGoal">({
    name: "careerGoal",
  });

  const error = formState.errors.careerGoal;

  const matchedChoice = goalChoices.some(
    (choice) => choice.value === field.value,
  )
    ? field.value
    : undefined;

  const customMode =
    customTouched || (field.value !== "" && matchedChoice === undefined);

  const handleChoiceChange = (value: string) => {
    if (value === "custom") {
      setCustomTouched(true);
      field.onChange("");
      return;
    }

    setCustomTouched(false);
    field.onChange(value);
  };

  const errorId = "field-error-career-goal";

  return (
    <>
      <ChoiceGroup
        choices={goalChoices}
        label={formLabels.careerGoal}
        value={matchedChoice ?? (customMode ? "custom" : "")}
        onChange={handleChoiceChange}
      />
      {customMode ? (
        <div className="mt-5">
          <label htmlFor="custom-goal" className="text-sm font-medium">
            Custom goal
          </label>
          <div className="relative mt-2">
            <Input
              id="custom-goal"
              type="text"
              value={field.value ?? ""}
              onChange={(event) => {
                setCustomTouched(true);
                field.onChange(event.target.value);
              }}
              placeholder="e.g. Learn robotics for my job"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className="h-11 bg-card"
            />
          </div>
        </div>
      ) : null}
      {error?.message && <FieldError id={errorId}>{error.message}</FieldError>}
    </>
  );
}
