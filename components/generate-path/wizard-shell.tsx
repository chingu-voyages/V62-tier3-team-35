"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { clearDraft, saveDraft } from "@/lib/generate-path/draft-storage";
import { GeneratePathFormProvider } from "@/components/generate-path/generate-path-form-provider";
import { RoadmapFrame } from "@/components/generate-path/layout/roadmap-frame";
import type { RoadmapFormValues } from "@/lib/schemas/generate-path.schema";

export function WizardShell({ children }: { children: ReactNode }) {
  return (
    <GeneratePathFormProvider>
      <WizardShellInner>{children}</WizardShellInner>
    </GeneratePathFormProvider>
  );
}

function WizardShellInner({ children }: { children: ReactNode }) {
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
      <ConfirmDialog
        open={confirmingDiscard}
        onOpenChange={setConfirmingDiscard}
        onConfirm={handleDiscard}
        title="Discard this path?"
        description="Your answers haven't been saved. Leaving now will lose them."
      />
    </>
  );
}
