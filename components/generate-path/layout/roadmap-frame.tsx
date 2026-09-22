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
