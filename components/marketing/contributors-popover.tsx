"use client";

import { useId } from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { X } from "lucide-react";

import { Github } from "@/components/icons";
import { Popover, PopoverContent } from "@/components/ui/popover";

// Team members; GitHub links are optional.
const contributors = [
  {
    name: "Nadiia Lashtun",
    initials: "NL",
    github: "NadiiaLashtun",
    color: "bg-[#A8E6CF]",
  },
  { name: "Eduard", initials: "E", github: "EduardDE7", color: "bg-[#F3FDD8]" },
  { name: "fabirez", initials: "F", github: "fabirez", color: "bg-[#FFD6A5]" },
  {
    name: "Sara Dahman",
    initials: "SD",
    github: "SaraDahman",
    color: "bg-[#CDB4DB]",
  },
  {
    name: "Eva Langerova",
    initials: "EL",
    github: "eva-lng",
    color: "bg-[#FFADAD]",
  },
  {
    name: "LillaT",
    initials: "LT",
    color: "bg-[#BDD8FF]",
  },
];

export function ContributorsPopover() {
  const titleId = useId();

  return (
    <Popover>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          className="landing-caption flex min-h-11 w-fit max-w-full cursor-pointer flex-wrap items-center gap-x-4 gap-y-2 rounded-xl text-secondary-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex -space-x-2" aria-hidden="true">
            {contributors.slice(0, 5).map((contributor) => (
              <span
                key={contributor.name}
                className={`grid size-10 place-items-center rounded-full border-2 border-card text-xs font-semibold text-foreground ${contributor.color}`}
              >
                {contributor.initials}
              </span>
            ))}
            <span className="grid size-10 place-items-center rounded-full border-2 border-card bg-muted text-sm font-semibold text-secondary-foreground">
              +{contributors.length - 5}
            </span>
          </span>
          <span>Contributors</span>
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverContent
        data-landing
        side="top"
        sideOffset={16}
        collisionPadding={16}
        aria-labelledby={titleId}
        className="w-xl max-w-[calc(100vw-2rem)] max-h-(--radix-popover-content-available-height) overflow-y-auto rounded-3xl p-5 shadow-xl sm:p-6"
      >
        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 pr-7">
          <h2 id={titleId} className="landing-subheading">
            Contributors
          </h2>
          <span className="landing-caption ml-auto text-secondary-foreground">
            {contributors.length} contributors
          </span>
        </div>
        <PopoverPrimitive.Close
          aria-label="Close contributors"
          className="absolute top-2 right-2 grid size-9 cursor-pointer place-items-center rounded-full text-secondary-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-4" aria-hidden="true" />
        </PopoverPrimitive.Close>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
          {contributors.map((contributor) => (
            <li
              key={contributor.name}
              className="flex min-w-0 items-center gap-3"
            >
              <span
                aria-hidden="true"
                className={`grid size-11 shrink-0 place-items-center rounded-full text-sm font-semibold text-foreground ${contributor.color}`}
              >
                {contributor.initials}
              </span>
              <div className="min-w-0">
                <p className="landing-caption font-medium">
                  {contributor.name}
                </p>
                {contributor.github && (
                  <a
                    href={`https://github.com/${contributor.github}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${contributor.name} on GitHub (opens in a new tab)`}
                    className="mt-1 grid size-8 place-items-center rounded-full bg-muted text-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Github className="size-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
        <PopoverPrimitive.Arrow
          width={24}
          height={12}
          className="fill-popover"
        />
      </PopoverContent>
    </Popover>
  );
}
