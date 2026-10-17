import { MoreHorizontal } from "lucide-react";

import { cn } from "cn";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

const chip =
  "inline-flex items-center rounded-full bg-[#F5F5F2] px-[14px] py-[12px] text-[11px] font-medium text-[#1F1F1F]";

type TagListProps = {
  tags: string[];
  max?: number;
  className?: string;
};

export function TagList({ tags, className }: TagListProps) {
  return (
    <div className={cn("flex w-full gap-2", className)}>
      <ul className="flex w-fit flex-wrap gap-2 overflow-hidden max-h-10">
        {tags.map((tag) => (
          <li key={tag} className="shrink-0">
            <span className={cn(chip, "whitespace-nowrap")}>
              {tag}
            </span>
          </li>
        ))}
      </ul>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            aria-label="Show more tags"
            className="shrink-0 bg-secondary"
          >
            <MoreHorizontal className="size-4" strokeWidth={2.5} />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-auto max-w-64 rounded-2xl p-3">
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag}>
                <span className={cn(chip, "h-8 px-3")}>{tag}</span>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>);
}
