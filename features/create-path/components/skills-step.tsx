"use client";

import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { SkillsPicker } from "@/features/create-path/controls/skills-picker";
import {
  getChoiceTitle,
  goalChoices,
} from "@/features/create-path/options/form-options";
import type { RoadmapFormValues } from "@/features/create-path/schema";

export function SkillsStep() {
  const [skillSearch, setSkillSearch] = useState("");
  const { getValues } = useFormContext<RoadmapFormValues>();
  const { field } = useController<RoadmapFormValues, "skills">({
    name: "skills",
  });
  const careerGoal = getValues("careerGoal");

  return (
    <SkillsPicker
      goalTitle={getChoiceTitle(goalChoices, careerGoal)}
      search={skillSearch}
      selectedSkills={field.value ?? []}
      onSearchChange={setSkillSearch}
      onSkillsChange={field.onChange}
    />
  );
}
