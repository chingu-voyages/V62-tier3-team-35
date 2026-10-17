import { MoreHorizontal } from "lucide-react";

import { cn } from "cn";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const chip =
  "inline-flex items-center rounded-full bg-[#F5F5F2] px-[14px] py-[12px] text-[11px] font-medium text-[#1F1F1F]";

type TagListProps = {
  tags: string[];
  max?: number;
  className?: string;
};

export function TagList({ tags, max = 3, className }: TagListProps) {
  const visible = tags.slice(0, max);
  const hidden = tags.slice(max);

  return (
    <ul className={cn("flex min-w-0 items-center gap-2", className)}>
      {visible.map((tag) => (
        <li key={tag} className="min-w-0">
          <span className={cn(chip, "max-w-full")}>
            <span className="truncate">{tag}</span>
          </span>
        </li>
      ))}

      {hidden.length > 0 && (
        <li className="shrink-0">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label={`Show ${hidden.length} more tags`}
                className="grid size-9 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-input"
              >
                <MoreHorizontal className="size-4" strokeWidth={2.5} />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-auto max-w-64 rounded-2xl p-3"
            >
              <ul className="flex flex-wrap gap-2">
                {hidden.map((tag) => (
                  <li key={tag} className={cn(chip, "h-8 px-3")}>
                    {tag}
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </li>
      )}
    </ul>
  );
}
