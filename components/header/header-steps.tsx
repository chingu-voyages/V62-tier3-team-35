import {
  Calendar,
  ChevronDown,
  Clock1,
  Share2,
  Sun,
  Target,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadRoadmapAsSvg } from "@/lib/roadmap/download-roadmap-as-svg";

interface HeaderStepsProps {
  isDone: boolean;
  onClose?: () => void;
}

//TODO: Replace the mock data with real data from the database.
export function HeaderSteps({ isDone, onClose }: HeaderStepsProps) {
  const summaryItems = [
    { label: "11%", Icon: Target },
    { label: "2 / 18 completed" },
    {
      label: "~ 6 months",
      Icon: Clock1,
    },
    { label: "8h / week", Icon: Calendar },
  ];

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex shrink-0 items-center gap-4">
        <span className="hidden h-9 w-px bg-border sm:block" />
        <div className="hidden leading-none sm:block">
          <div className="flex items-center gap-3 text-xl leading-7 font-semibold">
            <span>{isDone ? "My roadmap" : "New roadmap"}</span>
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </div>

          <p className="text-xs leading-4 text-muted-foreground">
            {!isDone ? "Create with Pathway AI" : "Your learning roadmap"}
          </p>
        </div>
      </div>

      {isDone && (
        <div className="fixed left-1/2 -translate-x-1/2 z-10 hidden lg:flex w-max max-w-[35vw] items-center overflow-x-auto rounded-full border border-border bg-card p-2.5 text-left shadow-sm">
          {summaryItems.map(({ label, Icon }, index) => (
            <div key={label}>
              <div className="flex min-w-32 items-center gap-1.5 px-2.5 sm:min-w-0">
                {Icon && (
                  <Icon className="size-5 shrink-0" aria-hidden="true" />
                )}
                <span className="truncate text-xs leading-4 font-semibold">
                  {label}
                </span>
              </div>
              {index < summaryItems.length - 1 ? (
                <span
                  className="h-6 w-px shrink-0 bg-border"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          ))}
        </div>
      )}

      <div className="flex shrink-0 items-center justify-center gap-2">
        {
          isDone ? (
            <>
              <Button
                variant="secondary"
                size="icon-lg"
                aria-label="Change theme"
              >
                <Sun aria-hidden="true" />
              </Button>

              <Button
                variant="ghost"
                size="default"
                className="gap-2 px-3"
                aria-label="Share roadmap"
                //   onClick={() => window.print()}
                onClick={downloadRoadmapAsSvg}
              >
                <Share2 aria-hidden="true" />
                Share
              </Button>
            </>
          ) : null
          /* <Button
            variant="secondary"
            size="lg"
            type="button"
            className="px-3 text-xs sm:px-5 sm:text-sm"
            onClick={onSaveExit}
          >
            Save &amp; exit
          </Button> */
        }

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
    </div>
  );
}
