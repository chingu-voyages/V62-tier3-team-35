import { getChoiceTitle, timeChoices } from "@/components/form/data/form-options";

export const customHoursMin = 1;
export const customHoursMax = 80;

export const timePresetValues = ["light", "balanced", "focused", "intensive"];

export function isTimePreset(value: string) {
  return timePresetValues.includes(value);
}

export function isCustomHoursValue(value: string) {
  if (!/^\d+$/.test(value)) return false;

  const hours = Number(value);
  return (
    Number.isInteger(hours) &&
    hours >= customHoursMin &&
    hours <= customHoursMax
  );
}

export function isTimeCommitmentValid(value: string) {
  return isTimePreset(value) || isCustomHoursValue(value);
}

export function getTimeCommitmentLabel(value: string) {
  if (isTimePreset(value)) {
    return getChoiceTitle(timeChoices, value);
  }

  if (value.trim() !== "") {
    return `${value} hours/week`;
  }

  return "";
}