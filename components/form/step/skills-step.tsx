"use client";

import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { SkillsPicker } from "@/components/form/controls/skills-picker";
import { getChoiceTitle, goalChoices } from "@/components/form/data/form-options";
import type { RoadmapFormValues } from "@/lib/schemas/path";

export function SkillsStep() {
  const [skillSearch, setSkillSearch] = useState("");
  const { getValues } = useFormContext<RoadmapFormValues>();
  const { field } = useController<RoadmapFormValues, "skills">({
    name: "skills",
  });
  const careerGoal = getValues("careerGoal");

  return (
    <div className="mt-8">
      <SkillsPicker
        goalTitle={getChoiceTitle(goalChoices, careerGoal)}
        search={skillSearch}
        selectedSkills={field.value}
        onSearchChange={setSkillSearch}
        onSkillsChange={field.onChange}
      />
    </div>
  );
}