import type { FormOption } from "@/components/generate-path/data/form-options";
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
