import {
  getChoiceTitle,
  timeChoices,
} from "@/components/generate-path/data/form-options";

export const PRESET_HOURS_PER_WEEK = {
  light: 2,
  balanced: 5,
  focused: 11,
  intensive: 20,
} as const;

export type TimeCommitmentPreset = keyof typeof PRESET_HOURS_PER_WEEK;

export function getPresetForHours(
  hoursPerWeek: number | undefined,
): TimeCommitmentPreset | undefined {
  if (hoursPerWeek === undefined) return undefined;
  return (Object.keys(PRESET_HOURS_PER_WEEK) as TimeCommitmentPreset[]).find(
    (preset) => PRESET_HOURS_PER_WEEK[preset] === hoursPerWeek,
  );
}

export function getTimeCommitmentLabel(
  hoursPerWeek: number | undefined,
): string {
  if (hoursPerWeek === undefined) return "Not set";
  const preset = getPresetForHours(hoursPerWeek);
  return preset
    ? getChoiceTitle(timeChoices, preset)
    : `${hoursPerWeek} hours per week`;
}