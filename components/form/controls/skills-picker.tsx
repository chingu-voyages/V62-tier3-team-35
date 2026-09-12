"use client";

import { Search } from "lucide-react";

import { InfoBlock } from "@/components/form/controls/field-feedback";
import {
  SearchField,
  SkillChip,
} from "@/components/form/controls/skill-controls";
import { skillGroups } from "@/components/form/data/form-options";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SkillsPickerProps = {
  goalTitle: string;
  search: string;
  selectedSkills: string[];
  onSearchChange: (value: string) => void;
  onSkillsChange: (skills: string[]) => void;
};

const knownSkills = skillGroups.flatMap((group) => group.skills);

function normalizeSkill(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function SkillsPicker({
  goalTitle,
  search,
  selectedSkills,
  onSearchChange,
  onSkillsChange,
}: SkillsPickerProps) {
  const normalizedSearch = search.trim().replace(/\s+/g, " ");
  const searchKey = normalizeSkill(normalizedSearch);
  const selectedKeys = new Set(selectedSkills.map(normalizeSkill));
  const availableSkills = knownSkills.filter(
    (skill) => !selectedKeys.has(normalizeSkill(skill)),
  );
  const matchingSkills = availableSkills.filter((skill) =>
    normalizeSkill(skill).includes(searchKey),
  );
  const hasExactSkill = selectedKeys.has(searchKey);
  const canAddCustomSkill =
    normalizedSearch.length > 0 &&
    matchingSkills.length === 0 &&
    !hasExactSkill;

  const addSkill = (skill: string) => {
    onSkillsChange([...selectedSkills, skill]);
    onSearchChange("");
  };

  const addCustomSkill = () => {
    if (canAddCustomSkill) addSkill(normalizedSearch);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <SearchField
          value={search}
          onChange={onSearchChange}
          inputProps={{
            id: "skill-search",
            role: "combobox",
            "aria-label": "Search skills",
            "aria-autocomplete": "list",
            "aria-expanded": Boolean(normalizedSearch),
            className: "pl-11",
            onKeyDown: (event) => {
              if (event.key === "Enter" && canAddCustomSkill) {
                event.preventDefault();
                addCustomSkill();
              }
            },
          }}
        />
        {normalizedSearch ? (
          <div
            className="absolute top-full right-0 left-0 z-20 mt-2 rounded-lg border border-border bg-card p-1 shadow-lg"
            role="listbox"
            aria-label="Skill search results"
          >
            {matchingSkills.map((skill) => (
              <Button
                key={skill}
                type="button"
                variant="ghost"
                size="sm"
                role="option"
                className="h-10 w-full justify-start rounded-md px-3"
                onClick={() => addSkill(skill)}
              >
                {skill}
              </Button>
            ))}
            {canAddCustomSkill ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                role="option"
                className="h-10 w-full justify-start rounded-md px-3"
                onClick={addCustomSkill}
              >
                Add &quot;{normalizedSearch}&quot;
              </Button>
            ) : null}
            {!matchingSkills.length && !canAddCustomSkill ? (
              <p className="px-3 py-2 text-sm text-muted-foreground">
                {hasExactSkill
                  ? `${normalizedSearch} is already selected.`
                  : "No matching skills."}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <section aria-labelledby="selected-skills-label">
        <div className="flex items-center justify-between gap-3">
          <p id="selected-skills-label" className="text-xs font-semibold">
            Selected skills ({selectedSkills.length})
          </p>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            disabled={!selectedSkills.length}
            onClick={() => onSkillsChange([])}
          >
            Clear all
          </Button>
        </div>
        <div className="mt-2 flex min-h-9 flex-wrap gap-2">
          {selectedSkills.length ? (
            selectedSkills.map((skill) => (
              <SkillChip
                key={skill}
                selected
                onRemove={() =>
                  onSkillsChange(
                    selectedSkills.filter((item) => item !== skill),
                  )
                }
              >
                {skill}
              </SkillChip>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No skills selected yet.
            </p>
          )}
        </div>
      </section>

      <section
        className="flex flex-col gap-5"
        aria-labelledby="suggested-skills-label"
      >
        <p id="suggested-skills-label" className="text-xs font-semibold">
          Suggested for {goalTitle}
        </p>
        {skillGroups.map((group) => {
          const remainingSkills = group.skills.filter(
            (skill) => !selectedKeys.has(normalizeSkill(skill)),
          );

          return remainingSkills.length ? (
            <div key={group.title} className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">{group.title}</p>
              <div className="flex flex-wrap gap-2">
                {remainingSkills.map((skill) => (
                  <SkillChip key={skill} onClick={() => addSkill(skill)}>
                    {skill}
                  </SkillChip>
                ))}
              </div>
            </div>
          ) : null;
        })}
      </section>

      <InfoBlock
        title="Starting from scratch?"
        description="You can continue without selecting anything."
        className={cn("mt-1")}
      />
    </div>
  );
}
