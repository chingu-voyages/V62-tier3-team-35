"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { clearDraft, saveDraft } from "@/lib/generate-path/draft-storage";
import { GeneratePathFormProvider } from "@/components/generate-path/generate-path-form-provider";
import { RoadmapFrame } from "@/components/generate-path/layout/roadmap-frame";
import type { RoadmapFormValues } from "@/lib/schemas/generate-path.schema";

export function RoadmapShell({ children }: { children: ReactNode }) {
  return (
    <GeneratePathFormProvider>
      <RoadmapShellInner>{children}</RoadmapShellInner>
    </GeneratePathFormProvider>
  );
}

function RoadmapShellInner({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { getValues } = useFormContext<RoadmapFormValues>();
  const [confirmingDiscard, setConfirmingDiscard] = useState(false);

  const handleSaveExit = () => {
    saveDraft(getValues());
    router.push("/");
  };

  const handleDiscard = () => {
    clearDraft();
    router.push("/");
  };

  return (
    <>
      <RoadmapFrame
        onClose={() => setConfirmingDiscard(true)}
        onSaveExit={handleSaveExit}
      >
        {children}
      </RoadmapFrame>
      <AlertDialog
        open={confirmingDiscard}
        onOpenChange={setConfirmingDiscard}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard this roadmap?</AlertDialogTitle>
            <AlertDialogDescription>
              Your answers haven&apos;t been saved. Leaving now will lose
              them.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction onClick={handleDiscard}>
              Leave anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}