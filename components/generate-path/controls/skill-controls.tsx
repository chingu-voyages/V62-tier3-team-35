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
