import { useState, type KeyboardEventHandler } from "react";

import { Search } from "lucide-react";
import {
  SearchField,
  SkillChip,
} from "@/features/create-path/controls/skill-controls";
import { skillGroups } from "@/features/create-path/options/form-options";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
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
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);
  const normalizedSearch = search.trim().replace(/\s+/g, " ");
  const normalizedSearchKey = normalizeSkill(normalizedSearch);
  const selectedSkillKeys = new Set(selectedSkills.map(normalizeSkill));
  const suggestedGroups = skillGroups
    .map((group) => ({
      ...group,
      skills: group.skills.filter(
        (skill) => !selectedSkillKeys.has(normalizeSkill(skill)),
      ),
    }))
    .filter((group) => group.skills.length > 0);
  const matchingGroups = suggestedGroups
    .map((group) => ({
      ...group,
      skills: group.skills.filter((skill) =>
        normalizeSkill(skill).includes(normalizedSearchKey),
      ),
    }))
    .filter((group) => group.skills.length > 0);
  const hasKnownMatches =
    normalizedSearchKey.length > 0 &&
    knownSkills.some((skill) =>
      normalizeSkill(skill).includes(normalizedSearchKey),
    );
  const selectedExactSkill = selectedSkills.find(
    (skill) => normalizeSkill(skill) === normalizedSearchKey,
  );
  const canAddCustomSkill =
    normalizedSearch.length > 0 &&
    matchingGroups.length === 0 &&
    !hasKnownMatches &&
    !selectedExactSkill;
  const matchingSkills = matchingGroups.flatMap((group) => group.skills);
  const hasSearch = normalizedSearch.length > 0;
  const customSkillOptionIndex = matchingSkills.length;
  const searchOptionCount = matchingSkills.length + (canAddCustomSkill ? 1 : 0);
  const hasSearchOptions = searchOptionCount > 0;
  const activeDescendant =
    hasSearch && hasSearchOptions
      ? `skill-search-option-${activeOptionIndex}`
      : undefined;

  const handleSearchChange = (value: string) => {
    setActiveOptionIndex(0);
    onSearchChange(value);
  };

  const selectSkill = (skill: string) => {
    onSkillsChange([...selectedSkills, skill]);
    handleSearchChange("");
  };

  const addCustomSkill = () => {
    if (!canAddCustomSkill) return;

    onSkillsChange([...selectedSkills, normalizedSearch]);
    handleSearchChange("");
  };

  const handleSearchKeyDown: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (!hasSearch || !hasSearchOptions) {
      if (event.key !== "Enter") return;

      event.preventDefault();
      addCustomSkill();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveOptionIndex((index) =>
        Math.min(index + 1, searchOptionCount - 1),
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveOptionIndex((index) => Math.max(index - 1, 0));
      return;
    }

    if (event.key !== "Enter") return;

    event.preventDefault();
    const selectedMatch = matchingSkills[activeOptionIndex];

    if (selectedMatch) {
      selectSkill(selectedMatch);
      return;
    }

    if (canAddCustomSkill && activeOptionIndex === customSkillOptionIndex) {
      addCustomSkill();
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Popover
        open={hasSearch}
        onOpenChange={(open) => {
          if (!open) handleSearchChange("");
        }}
      >
        <PopoverAnchor asChild>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <SearchField
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              label="Search skills"
              placeholder="Search all skills (e.g. Docker, SvelteKit, Jest…)"
              inputProps={{
                id: "skill-search",
                role: "combobox",
                "aria-autocomplete": "list",
                "aria-controls": hasSearch ? "skill-search-results" : undefined,
                "aria-expanded": hasSearch,
                "aria-activedescendant": activeDescendant,
              }}
            />
          </div>
        </PopoverAnchor>

        {hasSearch ? (
          <PopoverContent
            id="skill-search-results"
            align="start"
            className="w-(--radix-popover-trigger-width) min-w-64 p-1"
            onOpenAutoFocus={(event) => event.preventDefault()}
          >
            <div
              role="listbox"
              aria-label="Skill search results"
              className="flex max-h-60 flex-col overflow-y-auto"
            >
              {matchingSkills.map((skill, index) => (
                <Button
                  key={skill}
                  id={`skill-search-option-${index}`}
                  type="button"
                  variant="ghost"
                  size="sm"
                  role="option"
                  aria-selected={index === activeOptionIndex}
                  className={cn(
                    "h-10 w-full justify-start rounded-md px-3 text-left",
                    index === activeOptionIndex && "bg-muted",
                  )}
                  onMouseEnter={() => setActiveOptionIndex(index)}
                  onClick={() => selectSkill(skill)}
                >
                  {skill}
                </Button>
              ))}

              {canAddCustomSkill ? (
                <Button
                  id={`skill-search-option-${customSkillOptionIndex}`}
                  type="button"
                  variant="ghost"
                  size="sm"
                  role="option"
                  aria-selected={customSkillOptionIndex === activeOptionIndex}
                  className={cn(
                    "h-10 w-full justify-start rounded-md px-3 text-left",
                    customSkillOptionIndex === activeOptionIndex && "bg-muted",
                  )}
                  onMouseEnter={() =>
                    setActiveOptionIndex(customSkillOptionIndex)
                  }
                  onClick={addCustomSkill}
                >
                  Add &quot;{normalizedSearch}&quot;
                </Button>
              ) : null}

              {!matchingSkills.length && !canAddCustomSkill ? (
                <p
                  className="px-3 py-2 text-sm text-muted-foreground"
                  aria-live="polite"
                >
                  {selectedExactSkill
                    ? `${selectedExactSkill} is already selected.`
                    : `No additional skills match “${normalizedSearch}”.`}
                </p>
              ) : null}
            </div>
          </PopoverContent>
        ) : null}
      </Popover>

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
        {suggestedGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">{group.title}</p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <SkillChip key={skill} onClick={() => selectSkill(skill)}>
                  {skill}
                </SkillChip>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
