"use client";

import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { ChoiceGroup } from "@/components/form/controls/choice-group";
import {
  FieldError,
  InfoBlock,
} from "@/components/form/controls/field-feedback";
import { getStepConfig } from "@/components/form/step-config";
import { Input } from "@/components/ui/input";
import {
  customHoursMax,
  customHoursMin,
  isTimePreset,
} from "@/lib/form/time-commitment";
import type { RoadmapFormValues } from "@/lib/schemas/path";

export function TimeCommitmentStep() {
  const { field } = useController<RoadmapFormValues, "timeCommitment">({
    name: "timeCommitment",
  });
  const { formState, trigger } = useFormContext<RoadmapFormValues>();
  const error = formState.errors.timeCommitment;
  const [customMode, setCustomMode] = useState(
    () => field.value !== "" && !isTimePreset(field.value),
  );
  const config = getStepConfig(4);

  if (config.body !== "choice") return null;

  const handleChoiceChange = (value: string) => {
    if (value === "custom") {
      setCustomMode(true);
      field.onChange("");
      void trigger(["timeCommitment"]);
      return;
    }

    setCustomMode(false);
    field.onChange(value);
    void trigger(["timeCommitment"]);
  };

  const handleHoursChange = (value: string) => {
    field.onChange(value);
    void trigger(["timeCommitment"]);
  };

  const errorId = "field-error-time-commitment";

  return (
    <>
      <ChoiceGroup
        choices={config.choices}
        label={config.choiceLabel}
        value={isTimePreset(field.value) ? field.value : customMode ? "custom" : field.value}
        onChange={handleChoiceChange}
      />
      {customMode ? (
        <div className="mt-5">
          <label
            htmlFor="custom-weekly-hours"
            className="text-sm font-medium"
          >
            Custom weekly hours
          </label>
          <div className="relative mt-2">
            <Input
              id="custom-weekly-hours"
              type="number"
              min={customHoursMin}
              max={customHoursMax}
              step="1"
              inputMode="numeric"
              value={field.value}
              onChange={(event) => handleHoursChange(event.target.value)}
              placeholder="e.g. 10"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className="h-11 bg-card pr-24"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
              hours / week
            </span>
          </div>
        </div>
      ) : null}
      {error?.message ? (
        <FieldError id={errorId}>{error.message}</FieldError>
      ) : null}
      {config.infoBlock ? (
        <InfoBlock
          className="mt-5"
          title={config.infoBlock.title}
          description={config.infoBlock.description}
        />
      ) : null}
    </>
  );
}