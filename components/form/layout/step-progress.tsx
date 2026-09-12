import { cn } from "@/lib/utils";

type StepProgressProps = {
  step: number;
  total?: number;
};

export function StepProgress({ step, total = 5 }: StepProgressProps) {
  const currentStep = Math.min(Math.max(step, 1), total);

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label={`Step ${currentStep} of ${total}`}
    >
      <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold">
        STEP {currentStep} OF {total}
      </span>
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-1.5 w-7 rounded-full bg-border",
              index < currentStep && "bg-primary",
            )}
          />
        ))}
      </div>
    </div>
  );
}
