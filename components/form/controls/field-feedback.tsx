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
