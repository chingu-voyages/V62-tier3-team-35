# Project Snapshot

Generated: 2026-09-18 00:59:55

## Directory Structure
```
.github/
  ISSUE_TEMPLATE/
    bug-report-template.md
    epic-template.md
    task-template.md
    user-story-template.md
  workflows/
    playwright.yml
.gitignore
.prettierignore
AGENTS.md
app/
  (marketing)/
    page.tsx
  create-path/
    done/
      page.tsx
    generating/
      page.tsx
    layout.tsx
    page.tsx
    review/
      page.tsx
    [step]/
      layout.tsx
      page.tsx
  favicon.ico
  globals.css
  layout.tsx
CLAUDE.md
components.json
components/
  form/
    controls/
      choice-group.tsx
      field-feedback.tsx
      option-row.tsx
      skill-controls.tsx
      skills-picker.tsx
    data/
      form-options.ts
    layout/
      back-button.tsx
      roadmap-frame.tsx
      step-progress.tsx
    roadmap-form-provider.tsx
    roadmap-shell.tsx
    screens/
      done-screen.tsx
      generation-artwork.tsx
      generation-screen.tsx
      review-screen.tsx
    step-shell.tsx
    step/
      career-goal-step.tsx
      choice-step-body.tsx
      index.tsx
      learning-pace-step.tsx
      skill-level-step.tsx
      skills-step.tsx
      time-commitment-step.tsx
    steps.ts
  ui/
    badge.tsx
    button.tsx
    card.tsx
    input.tsx
    popover.tsx
    progress.tsx
    radio-group.tsx
docs/
  meeting-sprint_planning.pdf
  meeting-sprint_preview.pdf
  meeting-sprint_retrospective.pdf
  meeting-vision_and_feature_planning.pdf
  meeting-voyage_kickoff.pdf
  team_decision_log.md
  team_project_ideas.md
eslint.config.mjs
lib/
  data/
    paths.ts
    steps.ts
  schemas/
    path.ts
  utils.ts
next-env.d.ts
next.config.ts
package.json
playwright.config.ts
postcss.config.mjs
prettier.config.mjs
public/
  pathway-brand.svg
README.md
tests/
  example.spec.ts
tsconfig.json
```

## Source Files

### .github/ISSUE_TEMPLATE/bug-report-template.md

```md
---
name: Bug report template
about: Create a report to help us improve
title: ''
labels: bug
assignees: ''

---

**Describe the problem**
A clear and concise description of what the bug is.

**Actual behavior**
A clear and concise description of what you experienced.

**Expected behavior**
A clear and concise description of what you expected to happen.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Screenshots**
If applicable, add screenshots or gifs to help explain your problem.

**Your Environment:**
 - Your browser & its version
 - Any other software that may impact this issue

**Additional Information**
Add any other context about the problem here.

```

### .github/ISSUE_TEMPLATE/epic-template.md

```md
---
name: Epic template
about: An epic represents functionality that will span multiple sprints
title: ''
labels: epic
assignees: ''

---

**__Feature Description__**
Describe what the feature is intended to accomplish & why it's important

**__Major User Stories/tasks__**
- [ ] User Story or Task  #1
- [ ] User Story or Task #2
- [ ] Additional User Stories or Tasks as necessary

**__Additional Considerations__**
Include anything else that may be helpful. For example, links to external resources.

```

### .github/ISSUE_TEMPLATE/task-template.md

```md
---
name: Task template
about: Tasks are small units of work that can be completed in a single sprint
title: ''
labels: task
assignees: ''

---

**__Task Description__**
Describe the task to be completed.

**__Technical Considerations__**
Include any technical considerations including architecture (e.g. API), required libraries, etc.

**__Additional Considerations__**
Any supplemental information including unresolved questions, links to external resources, screenshots, etc.

```

### .github/ISSUE_TEMPLATE/user-story-template.md

```md
---
name: User Story template
about: User Stories are features supporting user requirements that can be completed
  in a single sprint
title: ''
labels: user_story
assignees: ''

---

**__User Story Description__**
As a [role]
I want to [action to be performed]
So I can [result to be achieved]

**__Steps to Follow (optional)__**
- [ ] Step #1
- [ ] Step #2
- [ ] Additional steps as necessary

**__Additional Considerations__**
Any supplemental information including unresolved questions, links to external resources, screenshots, etc.

```

### .github/workflows/playwright.yml

```yml
name: Playwright Tests
on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
      - name: Run lint
        run: npm run lint
      - name: Build application
        run: npm run build
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

```

### .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Playwright
node_modules/
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
/playwright/.auth/

```

### .prettierignore

```
.next
coverage
node_modules

```

### AGENTS.md

```md
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

```

### CLAUDE.md

```md
@AGENTS.md

```

### README.md

```md
# voyage-tasks

Your project's `readme` is as important to success as your code. For 
this reason you should put as much care into its creation and maintenance
as you would any other component of the application.

If you are unsure of what should go into the `readme` let this article,
written by an experienced Chingu, be your starting point - 
[Keys to a well written README](https://tinyurl.com/yk3wubft).

And before we go there's "one more thing"! Once you decide what to include
in your `readme` feel free to replace the text we've provided here.

> Own it & Make it your Own!

## Team Documents

You may find these helpful as you work together to organize your project.

- [Team Project Ideas](./docs/team_project_ideas.md)
- [Team Decision Log](./docs/team_decision_log.md)

Meeting Agenda templates (located in the `/docs` directory in this repo):

- Meeting - Voyage Kickoff --> ./docs/meeting-voyage_kickoff.docx
- Meeting - App Vision & Feature Planning --> ./docs/meeting-vision_and_feature_planning.docx
- Meeting - Sprint Retrospective, Review, and Planning --> ./docs/meeting-sprint_retrospective_review_and_planning.docx
- Meeting - Sprint Open Topic Session --> ./docs/meeting-sprint_open_topic_session.docx

## Our Team

Everyone on your team should add their name along with a link to their GitHub
& optionally their LinkedIn profiles below. Do this in Sprint #1 to validate
your repo access and to practice PR'ing with your team *before* you start
coding!

- Teammate name #1: [GitHub](https://github.com/ghaccountname) / [LinkedIn](https://linkedin.com/in/liaccountname)
- Teammate name #2: [GitHub](https://github.com/ghaccountname) / [LinkedIn](https://linkedin.com/in/liaccountname)

   ...
- Teammate name #n: [GitHub](https://github.com/ghaccountname) / [LinkedIn](https://linkedin.com/in/liaccountname)
```

### app/(marketing)/page.tsx

```tsx
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background">
      <Button asChild variant="primary" size="lg">
        <Link href="/create-path">Create your roadmap</Link>
      </Button>
    </main>
  );
}

```

### app/create-path/[step]/layout.tsx

```tsx
import { notFound } from "next/navigation";

import { StepShell } from "@/components/form/step-shell";
import { isFormStep } from "@/components/form/steps";

type StepLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ step: string }>;
};

export default async function StepLayout({
  children,
  params,
}: StepLayoutProps) {
  const { step } = await params;
  const stepNumber = Number(step);

  if (!isFormStep(stepNumber)) {
    notFound();
  }

  return <StepShell step={stepNumber}>{children}</StepShell>;
}
```

### app/create-path/[step]/page.tsx

```tsx
import { notFound } from "next/navigation";

import { StepFields } from "@/components/form/step";
import { isFormStep } from "@/components/form/steps";

type StepPageProps = {
  params: Promise<{ step: string }>;
};

export default async function StepPage({ params }: StepPageProps) {
  const { step } = await params;
  const stepNumber = Number(step);

  if (!isFormStep(stepNumber)) {
    notFound();
  }

  return <StepFields step={stepNumber} />;
}
```

### app/create-path/done/page.tsx

```tsx
import { DoneScreen } from "@/components/form/screens/done-screen";

export default function DonePage() {
  return <DoneScreen />;
}
```

### app/create-path/generating/page.tsx

```tsx
import { GenerationScreen } from "@/components/form/screens/generation-screen";

export default function GeneratingPage() {
  return <GenerationScreen />;
}
```

### app/create-path/layout.tsx

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RoadmapShell } from "@/components/form/roadmap-shell";

export const metadata: Metadata = {
  title: "Create a roadmap | Pathway",
  description: "Tell Pathway what you want to learn and build a focused plan.",
};

export default function CreatePathLayout({ children }: { children: ReactNode }) {
  return <RoadmapShell>{children}</RoadmapShell>;
}
```

### app/create-path/page.tsx

```tsx
import { redirect } from "next/navigation";

export default function CreatePathPage() {
  redirect("/create-path/1");
}
```

### app/create-path/review/page.tsx

```tsx
import { ReviewScreen } from "@/components/form/screens/review-screen";

export default function ReviewPage() {
  return <ReviewScreen />;
}
```

### app/globals.css

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-inter);
  --font-mono: var(--font-geist-mono);
  --font-heading: var(--font-inter);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-success: var(--success);
  --color-success-bg: var(--success-bg);
  --color-info: var(--info);
  --color-info-background: var(--info-background);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: #f1f2ee;
  --foreground: #111211;
  --card: #ffffff;
  --card-foreground: #343d50;
  --popover: #ffffff;
  --popover-foreground: #111211;
  --primary: #dfff55;
  --primary-foreground: #111211;
  --secondary: #f1f2ee;
  --secondary-foreground: #626a79;
  --success: #65b82d;
  --success-bg: #f1ffd6;
  --info: #2e55d4;
  --info-background: #edf1ff;
  --muted: #f6f7f4;
  --muted-foreground: #6b7280;
  --accent: #f1ffd6;
  --accent-foreground: #111211;
  --destructive: #b33c38;
  --border: #e5e7eb;
  --input: #e0e3da;
  --ring: var(--info);
  --radius: 0.6875rem;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}

```

### app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learning Path Generator App",
  description: "to be filled out",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable, geistMono.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

```

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-vega",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}

```

### components/form/controls/choice-group.tsx

```tsx
import { RadioGroup } from "@/components/ui/radio-group";
import { OptionRow } from "@/components/form/controls/option-row";
import type { FormOption } from "@/components/form/data/form-options";

type ChoiceGroupProps = {
  choices: readonly FormOption[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  errorId?: string;
};

export function ChoiceGroup({
  choices,
  label,
  value,
  onChange,
  errorId,
}: ChoiceGroupProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      aria-label={label}
      aria-describedby={errorId}
      className="mt-8 gap-3"
    >
      {choices.map((choice) => (
        <OptionRow key={choice.value} {...choice} />
      ))}
    </RadioGroup>
  );
}

```

### components/form/controls/field-feedback.tsx

```tsx
import type { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

type InfoBlockProps = {
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
};

export function InfoBlock({
  title,
  description,
  className,
  iconClassName,
}: InfoBlockProps) {
  return (
    <aside
      className={cn(
        "flex min-h-16 items-center gap-3 rounded-lg bg-info-background px-3 py-3 text-foreground sm:pr-7",
        className,
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-card">
        <Lightbulb className={cn("size-5", iconClassName)} aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col gap-1.5">
        <span className="block text-xs leading-4 font-bold">{title}</span>
        <span className="block text-xs leading-4 text-muted-foreground">
          {description}
        </span>
      </span>
    </aside>
  );
}

type FieldErrorProps = {
  id: string;
  children: ReactNode;
};

export function FieldError({ id, children }: FieldErrorProps) {
  return (
    <p id={id} role="alert" className="text-xs leading-4 text-destructive">
      {children}
    </p>
  );
}

```

### components/form/controls/option-row.tsx

```tsx
import type { FormOption } from "@/components/form/data/form-options";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type OptionRowProps = FormOption & {
  invalid?: boolean;
  className?: string;
};

export function OptionRow({
  value,
  title,
  description,
  icon: Icon,
  invalid = false,
  className,
}: OptionRowProps) {
  const inputId = `choice-${value}`;

  return (
    <label
      htmlFor={inputId}
      data-invalid={invalid ? "true" : undefined}
      className={cn(
        "group/option flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 transition-colors duration-300 ease-in-out hover:bg-muted motion-reduce:transition-none has-[[data-state=checked]]:border-transparent has-[[data-state=checked]]:bg-accent data-[invalid=true]:border-destructive",
        className,
      )}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-foreground transition-[background-color,color] duration-300 ease-in-out motion-reduce:transition-none group-has-[[data-state=checked]]/option:bg-foreground group-has-[[data-state=checked]]/option:text-background">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block text-sm font-bold text-foreground">{title}</span>
        <span className="block text-xs text-muted-foreground">
          {description}
        </span>
      </span>
      <RadioGroupItem
        id={inputId}
        value={value}
        className="size-5 shrink-0"
        aria-invalid={invalid || undefined}
      />
    </label>
  );
}

```

### components/form/controls/skill-controls.tsx

```tsx
import type { ComponentProps, KeyboardEventHandler, ReactNode } from "react";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SkillChipProps = {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
};

export function SkillChip({
  children,
  selected = false,
  onClick,
  onRemove,
}: SkillChipProps) {
  return (
    <span
      className={cn(
        "inline-flex h-9 items-center overflow-hidden rounded-full border border-border bg-card text-foreground",
        selected && "border-transparent bg-accent",
      )}
    >
      {onClick ? (
        <Button
          variant="ghost"
          size="chip"
          type="button"
          aria-pressed={selected}
          className="rounded-none border-0 bg-transparent hover:bg-muted"
          onClick={onClick}
        >
          {children}
        </Button>
      ) : (
        <span className="inline-flex h-full items-center gap-1.5 px-3 text-sm">
          {selected ? <Check className="size-4" aria-hidden="true" /> : null}
          <span>{children}</span>
        </span>
      )}
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${String(children)}`}
          className="inline-flex h-full items-center justify-center px-2 transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          onClick={onRemove}
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      ) : null}
    </span>
  );
}

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  label?: string;
  inputProps?: Omit<
    ComponentProps<typeof Input>,
    "type" | "value" | "onChange" | "onKeyDown" | "placeholder"
  >;
};

export function SearchField({
  value,
  onChange,
  onKeyDown,
  placeholder,
  label,
  inputProps,
}: SearchFieldProps) {
  return (
    <Input
      {...inputProps}
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      aria-label={label ?? "Search"}
      className={cn("h-12 bg-card px-4 pl-11", inputProps?.className)}
    />
  );
}

```

### components/form/controls/skills-picker.tsx

```tsx
import { useState, type KeyboardEventHandler } from "react";

import { Search } from "lucide-react";

import { InfoBlock } from "@/components/form/controls/field-feedback";
import {
  SearchField,
  SkillChip,
} from "@/components/form/controls/skill-controls";
import { skillGroups } from "@/components/form/data/form-options";
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

      <InfoBlock
        title="Starting from scratch?"
        description="You can continue without selecting anything."
      />
    </div>
  );
}

```

### components/form/data/form-options.ts

```ts
import {
  BarChart3,
  Braces,
  Code2,
  Gauge,
  Layers3,
  Leaf,
  Palette,
  PencilLine,
  Rocket,
  Server,
  Sprout,
  Target,
  Zap,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type FormOption = {
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const goalChoices: FormOption[] = [
  {
    value: "frontend",
    title: "Frontend Developer",
    description: "Build modern web applications",
    icon: Code2,
  },
  {
    value: "backend",
    title: "Backend Developer",
    description: "Work with servers, databases and APIs",
    icon: Server,
  },
  {
    value: "fullstack",
    title: "Full Stack Developer",
    description: "Combine frontend and backend",
    icon: Layers3,
  },
  {
    value: "data",
    title: "Data Scientist",
    description: "Analyze data and build ML models",
    icon: BarChart3,
  },
  {
    value: "design",
    title: "UI/UX Designer",
    description: "Design user experiences and interfaces",
    icon: Palette,
  },
  {
    value: "custom",
    title: "Custom goal",
    description: "Describe what you want to learn",
    icon: PencilLine,
  },
];

export const levelChoices: FormOption[] = [
  {
    value: "beginner",
    title: "Beginner",
    description: "I am learning the fundamentals",
    icon: Sprout,
  },
  {
    value: "intermediate",
    title: "Intermediate",
    description: "I can build simple projects",
    icon: Braces,
  },
  {
    value: "advanced",
    title: "Advanced",
    description: "I can build real applications",
    icon: Rocket,
  },
];

export const timeChoices: FormOption[] = [
  {
    value: "light",
    title: "1–3 hours per week",
    description: "A light learning pace",
    icon: Leaf,
  },
  {
    value: "balanced",
    title: "4–7 hours per week",
    description: "A balanced learning pace",
    icon: Gauge,
  },
  {
    value: "focused",
    title: "8–15 hours per week",
    description: "A focused learning pace",
    icon: Target,
  },
  {
    value: "intensive",
    title: "16+ hours per week",
    description: "An intensive learning pace",
    icon: Zap,
  },
  {
    value: "custom",
    title: "Custom",
    description: "Set your own weekly hours",
    icon: PencilLine,
  },
];

export const targetChoices: FormOption[] = [
  {
    value: "recommended",
    title: "Recommended",
    description: "A balanced roadmap",
    icon: Target,
  },
  {
    value: "accelerated",
    title: "Accelerated",
    description: "Finish in less time",
    icon: Zap,
  },
  {
    value: "relaxed",
    title: "Relaxed",
    description: "Leave more room each week",
    icon: Leaf,
  },
];

export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Git",
  "Testing",
];

export const skillGroups = [
  {
    title: "Core knowledge",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Frameworks & libraries",
    skills: ["React", "Next.js", "Vue.js", "Svelte"],
  },
  {
    title: "Tools & workflow",
    skills: ["Git", "GitHub", "Vite", "Testing"],
  },
];

export function getChoiceTitle(choices: FormOption[], value: string) {
  return choices.find((choice) => choice.value === value)?.title ?? value;
}

```

### components/form/layout/back-button.tsx

```tsx
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

type BackButtonProps = {
  onClick: () => void;
};

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      size="back"
      type="button"
      onClick={onClick}
      className="hover:bg-transparent"
    >
      <span className="grid size-10 place-items-center rounded-full border border-border bg-card transition-colors group-hover/button:bg-muted">
        <ArrowLeft className="size-4" aria-hidden="true" />
      </span>
      <span>Back</span>
    </Button>
  );
}

```

### components/form/layout/roadmap-frame.tsx

```tsx
import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export type RoadmapFrameProps = {
  children: ReactNode;
  onClose: () => void;
  onSaveExit: () => void;
};

export function RoadmapFrame({
  children,
  onClose,
  onSaveExit,
}: RoadmapFrameProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="flex h-16 items-center justify-between gap-3 px-4 sm:h-18 sm:px-7">
        <div className="flex min-w-0 items-center gap-2 sm:gap-6">
          <Link href="/" aria-label="Pathway home">
            <Image
              src="/pathway-brand.svg"
              alt="Pathway"
              width={132}
              height={32}
              priority
              className="h-7 w-auto sm:h-8"
            />
          </Link>
          <span className="hidden h-9 w-px bg-border sm:block" />
          <div className="hidden leading-none sm:block">
            <div className="flex items-center gap-3 text-xl leading-7 font-semibold">
              <span>New roadmap</span>
              <ChevronDown className="size-3.5" aria-hidden="true" />
            </div>
            <p className="text-xs leading-4 text-muted-foreground">
              Create with Pathway AI
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="secondary"
            size="lg"
            type="button"
            className="px-3 text-xs sm:px-5 sm:text-sm"
            onClick={onSaveExit}
          >
            Save &amp; exit
          </Button>
          <Button
            variant="secondary"
            size="icon-lg"
            type="button"
            aria-label="Close form"
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col overflow-x-hidden">{children}</main>
    </div>
  );
}

```

### components/form/layout/step-progress.tsx

```tsx
import { cn } from "@/lib/utils";

type StepProgressProps = {
  step: number;
  total?: number;
};

export function StepProgress({ step, total = 5 }: StepProgressProps) {
  const currentStep = Math.min(Math.max(step, 1), total);

  return (
    <div
      className="flex h-7 items-center justify-center gap-1.5 sm:gap-2"
      role="group"
      aria-label={`Step ${currentStep} of ${total}`}
    >
      <span className="shrink-0 rounded-full bg-accent px-2.5 py-1.5 text-center text-xs leading-4 font-bold sm:px-3">
        STEP {currentStep} OF {total}
      </span>
      <div className="flex gap-1 sm:gap-1.5" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-1 w-6 rounded-full bg-border sm:w-8",
              index < currentStep && "bg-success",
            )}
          />
        ))}
      </div>
    </div>
  );
}

```

### components/form/roadmap-form-provider.tsx

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import type { ReactNode } from "react";

import {
  initialForm,
  roadmapFormSchema,
  type RoadmapFormValues,
} from "@/components/form/steps";

export function RoadmapFormProvider({ children }: { children: ReactNode }) {
  const methods = useForm<RoadmapFormValues>({
    resolver: zodResolver(roadmapFormSchema),
    defaultValues: initialForm,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
```

### components/form/roadmap-shell.tsx

```tsx
"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { RoadmapFrame } from "@/components/form/layout/roadmap-frame";
import { RoadmapFormProvider } from "@/components/form/roadmap-form-provider";

export function RoadmapShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const closeForm = () => router.push("/");

  return (
    <RoadmapFormProvider>
      <RoadmapFrame onClose={closeForm} onSaveExit={closeForm}>
        {children}
      </RoadmapFrame>
    </RoadmapFormProvider>
  );
}
```

### components/form/screens/done-screen.tsx

```tsx
"use client";

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function DoneScreen() {
  const router = useRouter();

  return (
    <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 text-center">
      <span className="mb-6 grid size-16 place-items-center rounded-2xl bg-success-bg text-success">
        <CheckCircle2 className="size-8" aria-hidden="true" />
      </span>
      <p className="mb-3 text-sm text-muted-foreground">Your answers are ready</p>
      <h1 className="font-heading text-3xl leading-9 font-bold tracking-tight">
        Your roadmap is ready
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-5 text-muted-foreground">
        Your plan is tailored to your goal, experience, skills, and pace.
      </p>
      <Button
        variant="primary"
        size="lg"
        className="mt-8"
        onClick={() => router.push("/create-path/1")}
      >
        Create another roadmap
      </Button>
    </section>
  );
}
```

### components/form/screens/generation-artwork.tsx

```tsx
import { Sparkles } from "lucide-react";

export function GenerationArtwork() {
  return (
    <div className="relative h-[145px] w-[166px] shrink-0" aria-hidden="true">
      <div className="relative h-[145px] w-[166px]">
        <span className="absolute -top-px -left-[31px] h-[145px] w-[228px] rounded-full bg-primary/10 blur-[62px] motion-reduce:blur-0" />
        <svg
          className="absolute inset-0 h-[145px] w-[166px] overflow-visible"
          viewBox="0 0 166 145"
          fill="none"
        >
          <g transform="matrix(0.9725 0 0 0.9861 -9.37 48.35)">
            <path
              d="M95.4857 8.3457C101.006 8.3457 105.146 9.7257 109.976 12.4857L162.416 42.8457C170.696 47.6757 170.696 55.2657 162.416 60.7857L109.976 90.4557C101.696 95.2857 89.9657 95.2857 81.6857 90.4557L28.5557 62.1657C20.2757 57.3357 20.2757 48.3657 28.5557 42.8457L81.6857 12.4857C86.5157 9.7257 90.6557 8.3457 95.4857 8.3457Z"
              fill="var(--success-bg)"
              stroke="var(--primary)"
              strokeWidth="0.69"
            />
          </g>
          <g transform="matrix(0.9725 0 0 0.9861 -10.72 19.8)">
            <path
              d="M95.4837 10.3457C101.004 10.3457 105.144 11.7257 109.974 14.4857L162.414 44.8457C170.694 49.6757 170.694 57.2657 162.414 62.7857L109.974 92.4557C101.694 97.2857 89.9638 97.2857 81.6838 92.4557L28.5538 64.1657C20.2738 59.3357 20.2738 50.3657 28.5538 44.8457L81.6838 14.4857C86.5137 11.7257 90.6537 10.3457 95.4837 10.3457Z"
              fill="var(--accent)"
              stroke="var(--primary)"
              strokeWidth="0.69"
            />
          </g>
          <g transform="matrix(0.9725 0 0 0.9861 -18.5 -16.12)">
            <path
              d="M103.486 16.3457C109.006 16.3457 113.146 17.7257 117.976 20.4857L170.416 50.8457C178.696 55.6757 178.696 63.2657 170.416 68.7857L117.976 98.4557C109.696 103.286 97.9657 103.286 89.6857 98.4557L36.5557 70.1657C28.2757 65.3357 28.2757 56.3657 36.5557 50.8457L89.6857 20.4857C94.5157 17.7257 98.6557 16.3457 103.486 16.3457Z"
              fill="var(--foreground)"
              stroke="var(--primary)"
              strokeWidth="0.69"
            />
          </g>
        </svg>
        <Sparkles className="absolute top-6 left-16 size-8 text-success-bg" />
      </div>
    </div>
  );
}
```

### components/form/screens/generation-screen.tsx

```tsx
"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Check,
  Circle,
  Clock3,
  LoaderCircle,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

import { InfoBlock } from "@/components/form/controls/field-feedback";
import {
  getChoiceTitle,
  goalChoices,
  levelChoices,
} from "@/components/form/data/form-options";
import {
  getTimeCommitmentLabel,
  type RoadmapFormValues,
} from "@/components/form/steps";
import { GenerationArtwork } from "@/components/form/screens/generation-artwork";

const generationStepDurationMs = 1400;

type GenerationStep = {
  title: string;
  description: string;
};

function getGenerationSteps(values: RoadmapFormValues): GenerationStep[] {
  const goal = getChoiceTitle(goalChoices, values.careerGoal);
  const level = getChoiceTitle(levelChoices, values.skillLevel);
  const weeklyTime = getTimeCommitmentLabel(values.timeCommitment);

  return [
    {
      title: "Understanding your goal",
      description: `${goal} · career direction`,
    },
    {
      title: "Assessing existing knowledge",
      description: `${level || "Your current level"} · ${values.skills.length} known skills`,
    },
    {
      title: "Finding skill gaps",
      description: `Prioritizing gaps around ${values.skills.length} known skills`,
    },
    {
      title: "Building your learning sequence",
      description: "Ordering milestones and dependencies",
    },
    {
      title: "Estimating workload",
      description: `Balancing your plan with ${weeklyTime || "your schedule"}`,
    },
    {
      title: "Finding learning resources",
      description: "Matching resources to each milestone",
    },
  ];
}

export function GenerationScreen() {
  const router = useRouter();
  const { getValues } = useFormContext<RoadmapFormValues>();
  const values = getValues();
  const [generationProgress, setGenerationProgress] = useState(0);
  const generationSteps = getGenerationSteps(values);

  useEffect(() => {
    if (generationProgress >= generationSteps.length) {
      router.replace("/create-path/done");
      return;
    }

    const timer = window.setTimeout(() => {
      setGenerationProgress((current) =>
        Math.min(current + 1, generationSteps.length),
      );
    }, generationStepDurationMs);

    return () => window.clearTimeout(timer);
  }, [generationProgress, generationSteps.length, router]);

  const summaryItems = [
    { label: getChoiceTitle(goalChoices, values.careerGoal), Icon: Target },
    { label: `${values.skills.length} known skills`, Icon: BadgeCheck },
    {
      label: getTimeCommitmentLabel(values.timeCommitment) || "Your schedule",
      Icon: CalendarDays,
    },
    { label: "Personalized path", Icon: Clock3 },
  ];

  return (
    <section
      className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-4 pt-5 pb-8 text-center sm:px-6 sm:pt-8"
      aria-live="polite"
    >
      <GenerationArtwork />
      <div className="mt-2">
        <p className="mb-3 text-sm text-muted-foreground">Pathway is working</p>
        <h1 className="font-heading text-2xl leading-8 font-bold tracking-tight sm:text-3xl sm:leading-9">
          Building your personalized roadmap
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-5 text-muted-foreground">
          We&apos;re using your goal, experience, known skills, and schedule to
          build a path that fits you.
        </p>
      </div>

      <div className="mt-6 flex h-12 w-full items-center overflow-x-auto rounded-full border border-border bg-card px-3.5 text-left shadow-sm">
        {summaryItems.map(({ label, Icon }, index) => (
          <div className="contents" key={label}>
            <div className="flex min-w-32 flex-1 items-center gap-1.5 px-2.5 sm:min-w-0">
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              <span className="truncate text-xs leading-4 font-semibold">
                {label}
              </span>
            </div>
            {index < summaryItems.length - 1 ? (
              <span className="h-6 w-px shrink-0 bg-border" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>

      <div className="relative mt-6 w-full max-w-lg text-left">
        <div className="absolute top-5 bottom-5 left-4 w-px bg-border" />
        <div className="relative flex flex-col gap-1.5">
          {generationSteps.map(({ title, description }, index) => {
            const completed = index < generationProgress;
            const active =
              generationProgress < generationSteps.length &&
              index === generationProgress;

            return (
              <div
                key={title}
                className="relative flex min-h-12 items-start gap-4 pr-4"
              >
                <div
                  className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full ${completed ? "bg-success-bg text-foreground" : active ? "border-2 border-success border-r-border border-b-border bg-secondary" : "border border-border bg-secondary"}`}
                >
                  {completed ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : active ? (
                    <LoaderCircle
                      className="size-4 animate-spin text-foreground"
                      aria-hidden="true"
                    />
                  ) : (
                    <Circle
                      className="size-2 fill-border text-border"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <p className="truncate text-sm leading-5 font-medium">
                    {title}
                  </p>
                  <p className="truncate text-xs leading-4 text-muted-foreground">
                    {description}
                  </p>
                </div>
                <span
                  className={`w-20 shrink-0 pt-3 text-right text-xs leading-4 ${active ? "font-medium text-foreground" : "text-muted-foreground"}`}
                >
                  {completed
                    ? "Completed"
                    : active
                      ? "In progress"
                      : "Waiting"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <InfoBlock
        className="mt-7 w-full max-w-lg text-left"
        iconClassName="text-info"
        title="What Pathway found"
        description={`${values.skills.length} existing skills will count as known while we focus the roadmap on your next useful gaps.`}
      />
    </section>
  );
}
```

### components/form/screens/review-screen.tsx

```tsx
"use client";

import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";

import { InfoBlock } from "@/components/form/controls/field-feedback";
import {
  getChoiceTitle,
  goalChoices,
  levelChoices,
  targetChoices,
} from "@/components/form/data/form-options";
import { BackButton } from "@/components/form/layout/back-button";
import {
  formLabels,
  getTimeCommitmentLabel,
  type RoadmapFormKey,
  type RoadmapFormValues,
} from "@/components/form/steps";
import { Button } from "@/components/ui/button";

export function ReviewScreen() {
  const router = useRouter();
  const { getValues } = useFormContext<RoadmapFormValues>();
  const values = getValues();

  const getAnswer = (key: RoadmapFormKey) => {
    switch (key) {
      case "careerGoal":
        return getChoiceTitle(goalChoices, values.careerGoal);
      case "skillLevel":
        return getChoiceTitle(levelChoices, values.skillLevel);
      case "timeCommitment":
        return getTimeCommitmentLabel(values.timeCommitment);
      case "learningPace":
        return getChoiceTitle(targetChoices, values.learningPace);
      case "skills":
        return values.skills.join(", ") || "No skills selected";
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10">
      <p className="text-sm text-muted-foreground">Review your answers</p>
      <h1 className="mt-2 font-heading text-2xl leading-8 font-bold tracking-tight sm:text-3xl sm:leading-9">
        Review your plan
      </h1>
      <p className="mt-2 text-sm leading-5 text-muted-foreground">
        Make sure everything looks right before we build your roadmap.
      </p>
      <div className="mt-8 space-y-3">
        <p className="text-xs leading-4 font-semibold tracking-wider text-muted-foreground uppercase">
          Your inputs
        </p>
        {(Object.keys(formLabels) as RoadmapFormKey[]).map((key, index) => (
          <div
            key={key}
            className="flex min-h-14 items-center justify-between gap-4 rounded-lg border border-border bg-card px-3.5 py-3 transition-colors hover:border-foreground/20"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs leading-4 text-muted-foreground">
                {formLabels[key]}
              </p>
              <p className="break-words text-sm leading-5 font-medium">
                {getAnswer(key)}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="h-11 w-16 shrink-0 rounded-full border-input bg-card px-4 shadow-none hover:bg-muted"
              onClick={() => router.push(`/create-path/${index + 1}`)}
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
      <InfoBlock
        className="mt-5"
        title="You are in control"
        description="You can edit any answer before generating your roadmap."
      />
      <div className="mt-auto flex justify-between gap-3 pt-8">
        <BackButton onClick={() => router.push("/create-path/5")} />
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push("/create-path/generating")}
        >
          Generate roadmap
        </Button>
      </div>
    </section>
  );
}
```

### components/form/step-shell.tsx

```tsx
"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import { BackButton } from "@/components/form/layout/back-button";
import { StepProgress } from "@/components/form/layout/step-progress";
import {
  getStepConfig,
  getStepValidationFields,
  type FormStep,
  type RoadmapFormValues,
} from "@/components/form/steps";
import { Button } from "@/components/ui/button";

type StepShellProps = {
  step: FormStep;
  children: ReactNode;
};

export function StepShell({ step, children }: StepShellProps) {
  const router = useRouter();
  const { getValues, trigger } = useFormContext<RoadmapFormValues>();
  const config = getStepConfig(step);
  const isLastStep = step === 5;
  

  const goForward = async () => {

    const valid = await trigger(getStepValidationFields(step));
    if (!valid) return;

    router.push(
      isLastStep ? "/create-path/review" : `/create-path/${step + 1}`,
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("roadmap form values", getValues());

    void goForward();
  };

  return (
    <form
      className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <div className="flex justify-center">
        <StepProgress step={step} />
      </div>
      <div className="mx-auto mt-8 w-full text-center">
        <h1 className="font-heading text-2xl leading-8 font-bold tracking-tight sm:text-3xl sm:leading-9">
          {config.title}
        </h1>
        <p className="mt-2 text-sm leading-5 text-muted-foreground">
          {config.description}
        </p>
      </div>
      {children}
      <footer className="mt-auto flex justify-between gap-3 pt-10">
        {step === 1 ? (
          <span aria-hidden="true" />
        ) : (
          <BackButton onClick={() => router.push(`/create-path/${step - 1}`)} />
        )}
        <Button
          variant="primary"
          size="lg"
          type={isLastStep ? "submit" : "button"}
          onClick={isLastStep ? undefined : () => void goForward()}
        >
          <span>{isLastStep ? "Review answers" : "Continue"}</span>
          <ArrowRight className="size-6" aria-hidden="true" />
        </Button>
      </footer>
    </form>
  );
}
```

### components/form/step/career-goal-step.tsx

```tsx
"use client";

import { ChoiceStepBody } from "@/components/form/step/choice-step-body";
import { getStepConfig } from "@/components/form/steps";

export function CareerGoalStep() {
  const config = getStepConfig(1);

  if (config.body !== "choice") return null;

  return (
    <ChoiceStepBody
      name="careerGoal"
      choices={config.choices}
      label={config.choiceLabel}
      infoBlock={config.infoBlock}
    />
  );
}
```

### components/form/step/choice-step-body.tsx

```tsx
"use client";

import { useController, useFormContext } from "react-hook-form";

import { ChoiceGroup } from "@/components/form/controls/choice-group";
import {
  FieldError,
  InfoBlock,
} from "@/components/form/controls/field-feedback";
import type { FormOption } from "@/components/form/data/form-options";
import type { RoadmapFormValues } from "@/components/form/steps";

type ChoiceFormKey = "careerGoal" | "skillLevel" | "learningPace";

type ChoiceStepBodyProps<N extends ChoiceFormKey> = {
  name: N;
  choices: readonly FormOption[];
  label: string;
  infoBlock?: { title: string; description: string };
};

export function ChoiceStepBody<N extends ChoiceFormKey>({
  name,
  choices,
  label,
  infoBlock,
}: ChoiceStepBodyProps<N>) {
  const { field } = useController<RoadmapFormValues, N>({ name });
  const { formState, trigger } = useFormContext<RoadmapFormValues>();
  const error = formState.errors[name];
  const errorId = `field-error-${name}`;

  const handleChange = (value: string) => {
    field.onChange(value);
    void trigger([name]);
  };

  return (
    <>
      <ChoiceGroup
        choices={choices}
        label={label}
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
```

### components/form/step/index.tsx

```tsx
"use client";

import { CareerGoalStep } from "@/components/form/step/career-goal-step";
import { SkillLevelStep } from "@/components/form/step/skill-level-step";
import { SkillsStep } from "@/components/form/step/skills-step";
import { TimeCommitmentStep } from "@/components/form/step/time-commitment-step";
import { LearningPaceStep } from "@/components/form/step/learning-pace-step";
import type { FormStep } from "@/components/form/steps";

type StepFieldsProps = {
  step: FormStep;
};

export function StepFields({ step }: StepFieldsProps) {
  switch (step) {
    case 1:
      return <CareerGoalStep />;
    case 2:
      return <SkillLevelStep />;
    case 3:
      return <SkillsStep />;
    case 4:
      return <TimeCommitmentStep />;
    case 5:
      return <LearningPaceStep />;
  }
}
```

### components/form/step/learning-pace-step.tsx

```tsx
"use client";

import { ChoiceStepBody } from "@/components/form/step/choice-step-body";
import { getStepConfig } from "@/components/form/steps";

export function LearningPaceStep() {
  const config = getStepConfig(5);

  if (config.body !== "choice") return null;

  return (
    <ChoiceStepBody
      name="learningPace"
      choices={config.choices}
      label={config.choiceLabel}
      infoBlock={config.infoBlock}
    />
  );
}
```

### components/form/step/skill-level-step.tsx

```tsx
"use client";

import { ChoiceStepBody } from "@/components/form/step/choice-step-body";
import { getStepConfig } from "@/components/form/steps";

export function SkillLevelStep() {
  const config = getStepConfig(2);

  if (config.body !== "choice") return null;

  return (
    <ChoiceStepBody
      name="skillLevel"
      choices={config.choices}
      label={config.choiceLabel}
      infoBlock={config.infoBlock}
    />
  );
}
```

### components/form/step/skills-step.tsx

```tsx
"use client";

import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { SkillsPicker } from "@/components/form/controls/skills-picker";
import { getChoiceTitle, goalChoices } from "@/components/form/data/form-options";
import type { RoadmapFormValues } from "@/components/form/steps";

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
```

### components/form/step/time-commitment-step.tsx

```tsx
"use client";

import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { ChoiceGroup } from "@/components/form/controls/choice-group";
import {
  FieldError,
  InfoBlock,
} from "@/components/form/controls/field-feedback";
import { Input } from "@/components/ui/input";
import {
  customHoursMax,
  customHoursMin,
  getStepConfig,
  isTimePreset,
  type RoadmapFormValues,
} from "@/components/form/steps";

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
```

### components/form/steps.ts

```ts
import { ZodIssueCode, z } from "zod";

import {
  getChoiceTitle,
  goalChoices,
  levelChoices,
  targetChoices,
  timeChoices,
  type FormOption,
} from "@/components/form/data/form-options";

export const roadmapFormSchema = z.object({
  careerGoal: z.string().min(1, "Choose a learning goal"),
  skillLevel: z.string().min(1, "Choose your experience level"),
  skills: z.array(z.string()),
  timeCommitment: z.string().superRefine((value, ctx) => {
    if (value.trim() === "") {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Choose a weekly time commitment",
      });
      return;
    }

    if (!isTimeCommitmentValid(value)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `Enter a whole number from ${customHoursMin} to ${customHoursMax}`,
      });
    }
  }),
  learningPace: z.string().min(1, "Choose a target pace"),
});

export type RoadmapFormValues = z.infer<typeof roadmapFormSchema>;

export type RoadmapFormKey = keyof RoadmapFormValues;

export type FormStep = 1 | 2 | 3 | 4 | 5;

export const customHoursMin = 1;
export const customHoursMax = 80;

export const initialForm: RoadmapFormValues = {
  careerGoal: "frontend",
  skillLevel: "",
  skills: [],
  timeCommitment: "",
  learningPace: "",
};

export const formLabels: Record<RoadmapFormKey, string> = {
  careerGoal: "Learning goal",
  skillLevel: "Experience level",
  skills: "Known skills",
  timeCommitment: "Weekly time",
  learningPace: "Target pace",
};

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

export type StepChoiceConfig = {
  step: FormStep;
  title: string;
  description: string;
  body: "choice";
  choiceLabel: string;
  formKey: "careerGoal" | "skillLevel" | "timeCommitment" | "learningPace";
  choices: readonly FormOption[];
  infoBlock?: {
    title: string;
    description: string;
  };
  customHours?: boolean;
};

export type StepSkillsConfig = {
  step: FormStep;
  title: string;
  description: string;
  body: "skills";
};

export type StepConfig = StepChoiceConfig | StepSkillsConfig;

export const steps: StepConfig[] = [
  {
    step: 1,
    title: "What do you want to achieve?",
    description:
      "Choose a career direction or describe a specific learning goal. We'll tailor the roadmap around it.",
    body: "choice",
    choiceLabel: "Learning goal",
    formKey: "careerGoal",
    choices: goalChoices,
  },
  {
    step: 2,
    title: "What is your current level?",
    description:
      "Tell us where you're starting so we can set the right level of challenge.",
    body: "choice",
    choiceLabel: "Experience level",
    formKey: "skillLevel",
    choices: levelChoices,
    infoBlock: {
      title: "Not sure where you fit?",
      description: "Choose the closest match. You can adjust your roadmap later.",
    },
  },
  {
    step: 3,
    title: "What do you already know?",
    description:
      "Select the skills you already know. You can skip this if you're starting from scratch.",
    body: "skills",
  },
  {
    step: 4,
    title: "How much time do you have?",
    description: "Choose a weekly commitment that fits your routine.",
    body: "choice",
    choiceLabel: "Weekly learning time",
    formKey: "timeCommitment",
    choices: timeChoices,
    customHours: true,
    infoBlock: {
      title: "Consistency beats intensity",
      description:
        "A realistic weekly commitment is more useful than an ambitious one.",
    },
  },
  {
    step: 5,
    title: "What pace feels right?",
    description: "Set the pace that feels sustainable for your learning journey.",
    body: "choice",
    choiceLabel: "Target pace",
    formKey: "learningPace",
    choices: targetChoices,
    infoBlock: {
      title: "Your pace can change",
      description:
        "This setting shapes the amount of work each week, not your final destination.",
    },
  },
];

export function isFormStep(value: unknown): value is FormStep {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 5
  );
}

export function getStepConfig(step: FormStep): StepConfig {
  return steps[step - 1];
}

export function getStepValidationFields(step: FormStep): RoadmapFormKey[] {
  switch (step) {
    case 1:
      return ["careerGoal"];
    case 2:
      return ["skillLevel"];
    case 3:
      return ["skills"];
    case 4:
      return ["timeCommitment"];
    case 5:
      return ["learningPace"];
  }
}
```

### components/ui/badge.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

```

### components/ui/button.tsx

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        primary:
          "rounded-full bg-foreground text-background hover:bg-foreground/90",
        secondary:
          "rounded-full border-border bg-card text-foreground shadow-xs hover:bg-muted",
        outline:
          "border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-11 gap-2 px-5",
        back: "h-11 gap-2.5 px-0",
        chip: "h-9 gap-1.5 rounded-full px-3 text-sm",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

```

### components/ui/card.tsx

```tsx
import * as React from "react"
import { cn } from "cn"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground shadow-xs ring-1 ring-foreground/10 [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-normal font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex flex-col gap-3 px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl px-(--card-spacing) [.border-t]:pt-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

### components/ui/input.tsx

```tsx
import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

### components/ui/popover.tsx

```tsx
"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";

import { cn } from "cn";

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root {...props} />;
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverAnchor, PopoverContent };

```

### components/ui/progress.tsx

```tsx
"use client"

import * as React from "react"
import { cn } from "cn"
import { Progress as ProgressPrimitive } from "radix-ui"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }

```

### components/ui/radio-group.tsx

```tsx
"use client";

import * as React from "react";
import { cn } from "cn";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid w-full gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-foreground data-checked:bg-card data-checked:text-foreground group-has-[:focus-visible]/field-label:data-checked:border-foreground",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };

```

### docs/team_decision_log.md

```md
# Team Decision Log

Update this with key decisions your team makes that you need to make...and 
remember. The entries in this table are only examples. You may add, change, or
delete these based on the needs of your team.

To set this up add each teammates name in the `teammate name` column. Each 
team member should Place an 'X' under their name to vote for the ideas 
you like the best.

| No. | Question/Option | Teammate name | Teammate name | Teammate name | Teammate name | Teammate name | Teammate name |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Team meeting schedule | | | | | | |
|   |	- Sprint Planning Sunday@9:00 a.m. CST | | | | | | |
|   |	- Knowledge Xfer as needed | | | | | | |
|   |	- Working Session Thursday@4:00 p.m. CST | | | | | | |
| 2	| Project Backlog Tool | | | | | | |
|   |	- Notion | | | | | | |
|   |	- Jira | | | | | | |
| 3	| Technical Stack (vote by adding your pref. in the cell under your name) | | | | | | |
|   |	- BE Language | | | | | | |
|   |	- FE Language | | | | | | |
|   |	- FE Framework | | | | | | |
|   |	- ML Framework | | | | | | |
|   |	- Visualization/Graphics package (if required, e.g. D3, Nivo, etc.) | | | | | | |
| 4	| Where to host the app? | | | | | | |
|   |	- Heroku (suitable for FE, BE, & Postgres) | | | | | | |
|   |	- Netlify (suitable only for FE) | | | | | | |
|   |	- Vercel (suitable only for FE) | | | | | | |
|   |	- Mongo Atlas (suitable only for MongoDB) | | | | | | |
| 5	| BE/FE repos organization | | | | | | |
|   |	- Separate GitHub repos for each | | | | | | |
|   |	- Single GitHub repo for both | | | | | | |
| 6	| Wireframing tool | | | | | | |
|   |	- Paper & pencil | | | | | | |
|   |	- Adobe XD | | | | | | |
|   |	- Balsamiq | | | | | | |
|   |	- Figma | | | | | | |
| 7	| Who works in which part of the app? | | | | | | |
|   | - BE (not applicable for Tier 1 teams) | | | | | | |
|   |	- FE | | | | | | |
| 8	| ... | | | | | | |
| n | ... | | | | | | |
```

### docs/team_project_ideas.md

```md
# Team Project Ideas

Update this with 1-2 ideas per team member for what your teams app project.

To set this up add each teammates name in the `teammate name` column. Everyone
on the team should then updated it, adding 1-2 ideas along with a short 
description. Keep in mind that the descriptions should be only 1-3 short
sentences. 

Each team member should Place an 'X' under their name to vote for the ideas 
you like the best.

| Project Idea | Description | teammate name | teammate name | teammate name | teammate name | teammate name | teammate name |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| First idea | Description | | | | | | |
| Second idea | Description | | | | | | |
| ... | Description | | | | | | |
| Last idea | Description | | | | | | |
```

### eslint.config.mjs

```mjs
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  eslintConfigPrettier,
]);

export default eslintConfig;

```

### lib/data/paths.ts

```ts
// Prisma queries for the Path model.
// e.g.:
// - getPathsByUserId(userId)
// - getPathById(pathId)
// - createPath(userId, careerGoal, skillLevel, steps)
// - deletePath(pathId)

```

### lib/data/steps.ts

```ts
// Prisma queries for the Step model.

```

### lib/schemas/path.ts

```ts
// Zod schema for path (user form input, AI response)

```

### lib/utils.ts

```ts
export { cn } from "cn"

```

### next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";
import "./.next/dev/types/root-params.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

### next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```

### package.json

```json
{
  "name": "v62-tier3-team-35",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  },
  "dependencies": {
    "@hookform/resolvers": "^5.9.1",
    "class-variance-authority": "^0.7.1",
    "cn": "^0.2.6",
    "lucide-react": "^1.44.0",
    "next": "16.3.4",
    "radix-ui": "^1.6.7",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-hook-form": "^7.88.0",
    "shadcn": "^4.21.0",
    "tw-animate-css": "^1.4.0",
    "zod": "^4.6.5"
  },
  "devDependencies": {
    "@playwright/test": "^1.63.0",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.4",
    "eslint-config-prettier": "^10.1.8",
    "prettier": "^3.9.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

```

### playwright.config.ts

```ts
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: process.env.CI ? 'npm run start' : 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});

```

### postcss.config.mjs

```mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;

```

### prettier.config.mjs

```mjs
/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
};

export default config;

```

### public/pathway-brand.svg

```svg
<svg width="132" height="32" viewBox="0 0 132 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4050_37843)">
<path d="M9.51562 19.5942V12.4907C9.81509 8.07631 10.8978 6.74023 16.5491 6.74023H22.7034C25.7467 6.74023 27.4374 8.56685 27.4374 11.2729C27.4374 14.2496 24.9351 16.6175 21.9594 16.6175H17.3606C14.3849 16.6175 11.6121 17.6999 9.51562 19.5942Z" fill="#111211"/>
<path d="M9.61024 25.2544C9.57555 22.8165 10.8021 20.9702 12.8269 19.6113C13.8723 18.9314 15.1853 18.5248 16.5697 18.5051L17.7564 18.4882L17.7966 21.314C17.8313 23.7519 15.5515 25.7241 12.6507 25.7653L10.9366 25.7897C10.1455 25.801 9.61498 25.5869 9.61024 25.2544Z" fill="#111211"/>
<rect x="5.59961" y="3.09961" width="26" height="26" rx="6.88" fill="#111211"/>
<path d="M9.54688 19.7212V12.5626C9.84866 8.11401 10.9397 6.76758 16.6349 6.76758H22.8368C25.9037 6.76758 27.6076 8.60835 27.6076 11.3354C27.6076 14.3352 25.0859 16.7214 22.0871 16.7214H17.4527C14.4539 16.7214 11.6596 17.8122 9.54688 19.7212Z" fill="#F3FDD8"/>
<path d="M9.64223 25.4251C9.60727 22.9682 10.8433 21.1077 12.8838 19.7382C13.9373 19.0531 15.2605 18.6433 16.6556 18.6234L17.8515 18.6064L17.892 21.4541C17.927 23.911 15.6295 25.8984 12.7063 25.94L10.9789 25.9646C10.1817 25.9759 9.647 25.7601 9.64223 25.4251Z" fill="#DFFF55"/>
</g>
<path d="M42.6646 23V8.45455H48.4032C49.5065 8.45455 50.4463 8.66525 51.2228 9.08665C51.9993 9.50331 52.5912 10.0833 52.9984 10.8267C53.4103 11.5653 53.6163 12.4176 53.6163 13.3835C53.6163 14.3494 53.408 15.2017 52.9913 15.9403C52.5746 16.679 51.9709 17.2543 51.1802 17.6662C50.3942 18.0781 49.4425 18.2841 48.3251 18.2841H44.6674V15.8196H47.8279C48.4198 15.8196 48.9075 15.7178 49.291 15.5142C49.6793 15.3059 49.9681 15.0194 50.1575 14.6548C50.3516 14.2855 50.4487 13.8617 50.4487 13.3835C50.4487 12.9006 50.3516 12.4792 50.1575 12.1193C49.9681 11.7547 49.6793 11.473 49.291 11.2741C48.9028 11.0705 48.4103 10.9688 47.8137 10.9688H45.7399V23H42.6646ZM58.3748 23.206C57.6788 23.206 57.0585 23.0852 56.514 22.8438C55.9695 22.5975 55.5386 22.2353 55.2214 21.7571C54.9089 21.2741 54.7527 20.6728 54.7527 19.9531C54.7527 19.3471 54.8639 18.8381 55.0865 18.4261C55.309 18.0142 55.612 17.6828 55.9956 17.4318C56.3791 17.1809 56.8147 16.9915 57.3024 16.8636C57.7948 16.7358 58.3109 16.6458 58.8507 16.5938C59.4851 16.5275 59.9965 16.4659 60.3848 16.4091C60.773 16.3475 61.0547 16.2576 61.2299 16.1392C61.4051 16.0208 61.4927 15.8456 61.4927 15.6136V15.571C61.4927 15.1212 61.3507 14.7732 61.0666 14.527C60.7872 14.2808 60.3895 14.1577 59.8734 14.1577C59.3289 14.1577 58.8957 14.2784 58.5737 14.5199C58.2517 14.7566 58.0386 15.0549 57.9345 15.4148L55.1362 15.1875C55.2783 14.5246 55.5576 13.9517 55.9743 13.4688C56.3909 12.9811 56.9283 12.607 57.5865 12.3466C58.2493 12.0814 59.0164 11.9489 59.8876 11.9489C60.4937 11.9489 61.0737 12.0199 61.6277 12.1619C62.1864 12.304 62.6812 12.5241 63.112 12.8224C63.5476 13.1207 63.8909 13.5043 64.1419 13.973C64.3928 14.437 64.5183 14.9934 64.5183 15.642V23H61.649V21.4872H61.5637C61.3886 21.8281 61.1542 22.1288 60.8606 22.3892C60.567 22.6449 60.2143 22.8461 59.8024 22.9929C59.3904 23.1349 58.9146 23.206 58.3748 23.206ZM59.2413 21.1179C59.6864 21.1179 60.0794 21.0303 60.4203 20.8551C60.7612 20.6752 61.0287 20.4337 61.2228 20.1307C61.417 19.8277 61.514 19.4844 61.514 19.1009V17.9432C61.4193 18.0047 61.2891 18.0616 61.1234 18.1136C60.9624 18.161 60.7809 18.206 60.5765 18.2486C60.3729 18.2865 60.1693 18.322 59.9657 18.3551C59.7621 18.3835 59.5775 18.4096 59.4118 18.4332C59.0566 18.4853 58.7465 18.5682 58.4814 18.6818C58.2162 18.7955 58.0102 18.9493 57.8635 19.1435C57.7167 19.3329 57.6433 19.5696 57.6433 19.8537C57.6433 20.2656 57.7924 20.5805 58.0907 20.7983C58.3938 21.0114 58.7773 21.1179 59.2413 21.1179ZM72.6681 12.0909V14.3636H66.0985V12.0909H72.6681ZM67.59 9.47727H70.6156V19.6477C70.6156 19.9271 70.6582 20.1449 70.7434 20.3011C70.8287 20.4527 70.947 20.5592 71.0985 20.6207C71.2548 20.6823 71.4345 20.7131 71.6383 20.7131C71.7804 20.7131 71.9224 20.7012 72.0645 20.6776C72.2065 20.6491 72.3154 20.6278 72.3912 20.6136L72.867 22.8651C72.7155 22.9124 72.5024 22.9669 72.2278 23.0284C71.9532 23.0947 71.6194 23.1349 71.2264 23.1491C70.4972 23.1776 69.858 23.0805 69.3088 22.858C68.7643 22.6354 68.3405 22.2898 68.0375 21.821C67.7344 21.3523 67.5853 20.7604 67.59 20.0455V9.47727ZM77.899 16.6932V23H74.8734V8.45455H77.8137V14.0156H77.9416C78.1878 13.3717 78.5855 12.8674 79.1348 12.5028C79.684 12.1335 80.3729 11.9489 81.2015 11.9489C81.9591 11.9489 82.6196 12.1146 83.1831 12.446C83.7512 12.7727 84.1916 13.2438 84.5041 13.8594C84.8213 14.4702 84.9776 15.2017 84.9728 16.054V23H81.9473V16.5938C81.952 15.9214 81.7815 15.3982 81.4359 15.0241C81.095 14.6501 80.6168 14.4631 80.0012 14.4631C79.5893 14.4631 79.2247 14.5507 78.9075 14.7259C78.595 14.901 78.3488 15.1567 78.1689 15.4929C77.9937 15.8243 77.9037 16.2244 77.899 16.6932ZM89.5059 23L86.5371 12.0909H89.5982L91.2885 19.4205H91.388L93.1493 12.0909H96.1536L97.9434 19.3778H98.0357L99.6976 12.0909H102.752L99.79 23H96.5868L94.7118 16.1392H94.5769L92.7019 23H89.5059ZM107.476 23.206C106.78 23.206 106.16 23.0852 105.616 22.8438C105.071 22.5975 104.64 22.2353 104.323 21.7571C104.01 21.2741 103.854 20.6728 103.854 19.9531C103.854 19.3471 103.965 18.8381 104.188 18.4261C104.411 18.0142 104.714 17.6828 105.097 17.4318C105.481 17.1809 105.916 16.9915 106.404 16.8636C106.896 16.7358 107.412 16.6458 107.952 16.5938C108.587 16.5275 109.098 16.4659 109.486 16.4091C109.875 16.3475 110.156 16.2576 110.331 16.1392C110.507 16.0208 110.594 15.8456 110.594 15.6136V15.571C110.594 15.1212 110.452 14.7732 110.168 14.527C109.889 14.2808 109.491 14.1577 108.975 14.1577C108.43 14.1577 107.997 14.2784 107.675 14.5199C107.353 14.7566 107.14 15.0549 107.036 15.4148L104.238 15.1875C104.38 14.5246 104.659 13.9517 105.076 13.4688C105.492 12.9811 106.03 12.607 106.688 12.3466C107.351 12.0814 108.118 11.9489 108.989 11.9489C109.595 11.9489 110.175 12.0199 110.729 12.1619C111.288 12.304 111.783 12.5241 112.214 12.8224C112.649 13.1207 112.992 13.5043 113.243 13.973C113.494 14.437 113.62 14.9934 113.62 15.642V23H110.751V21.4872H110.665C110.49 21.8281 110.256 22.1288 109.962 22.3892C109.669 22.6449 109.316 22.8461 108.904 22.9929C108.492 23.1349 108.016 23.206 107.476 23.206ZM108.343 21.1179C108.788 21.1179 109.181 21.0303 109.522 20.8551C109.863 20.6752 110.13 20.4337 110.324 20.1307C110.519 19.8277 110.616 19.4844 110.616 19.1009V17.9432C110.521 18.0047 110.391 18.0616 110.225 18.1136C110.064 18.161 109.882 18.206 109.678 18.2486C109.474 18.2865 109.271 18.322 109.067 18.3551C108.864 18.3835 108.679 18.4096 108.513 18.4332C108.158 18.4853 107.848 18.5682 107.583 18.6818C107.318 18.7955 107.112 18.9493 106.965 19.1435C106.818 19.3329 106.745 19.5696 106.745 19.8537C106.745 20.2656 106.894 20.5805 107.192 20.7983C107.495 21.0114 107.879 21.1179 108.343 21.1179ZM117.444 27.0909C117.061 27.0909 116.701 27.0601 116.365 26.9986C116.033 26.9418 115.759 26.8684 115.541 26.7784L116.223 24.5199C116.578 24.6288 116.898 24.688 117.182 24.6974C117.47 24.7069 117.719 24.6406 117.927 24.4986C118.14 24.3565 118.313 24.1151 118.446 23.7741L118.623 23.3125L114.71 12.0909H117.892L120.15 20.1023H120.264L122.544 12.0909H125.747L121.507 24.179C121.303 24.7661 121.026 25.2775 120.676 25.7131C120.33 26.1534 119.892 26.492 119.362 26.7287C118.832 26.9702 118.193 27.0909 117.444 27.0909Z" fill="#111211"/>
<defs>
<clipPath id="clip0_4050_37843">
<rect x="5.59961" y="3.09961" width="25.8" height="25.8" rx="6.88" fill="white"/>
</clipPath>
</defs>
</svg>

```

### tests/example.spec.ts

```ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```
