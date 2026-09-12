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
