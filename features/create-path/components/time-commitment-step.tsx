"use client";

import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { ChoiceGroup } from "@/features/create-path/controls/choice-group";
import { FieldError } from "@/features/create-path/controls/field-feedback";
import { timeChoices } from "@/features/create-path/options/form-options";
import { formLabels } from "@/features/create-path/steps";
import { Input } from "@/components/ui/input";
import {
  getPresetForHours,
  PRESET_HOURS_PER_WEEK,
  type TimeCommitmentPreset,
} from "@/features/create-path/options/time-commitment";
import { customHoursMax, customHoursMin } from "@/features/create-path/schema";
import type { RoadmapFormValues } from "@/features/create-path/schema";

export function TimeCommitmentStep() {
  const { field } = useController<RoadmapFormValues, "hoursPerWeek">({
    name: "hoursPerWeek",
  });
  const { formState } = useFormContext<RoadmapFormValues>();
  const error = formState.errors.hoursPerWeek;

  const matchedPreset = getPresetForHours(field.value);
  const [customMode, setCustomMode] = useState(
    () => field.value !== undefined && matchedPreset === undefined,
  );

  const handleChoiceChange = (value: string) => {
    if (value === "custom") {
      setCustomMode(true);
      field.onChange(undefined);
      return;
    }

    setCustomMode(false);
    field.onChange(PRESET_HOURS_PER_WEEK[value as TimeCommitmentPreset]);
  };

  const handleHoursChange = (value: string) => {
    field.onChange(value === "" ? undefined : Number(value));
  };

  const errorId = "field-error-time-commitment";

  return (
    <>
      <ChoiceGroup
        choices={timeChoices}
        label={formLabels.hoursPerWeek}
        value={matchedPreset ?? (customMode ? "custom" : "")}
        onChange={handleChoiceChange}
      />
      {customMode ? (
        <div className="mt-5">
          <label htmlFor="custom-weekly-hours" className="text-sm font-medium">
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
              value={field.value ?? ""}
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
      {error?.message && <FieldError id={errorId}>{error.message}</FieldError>}
    </>
  );
}