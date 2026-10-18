"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { clearDraft } from "@/lib/generate-path/draft-storage";
import { GeneratePathFormProvider } from "@/components/generate-path/generate-path-form-provider";
import { RoadmapFrame } from "@/components/generate-path/layout/roadmap-frame";

export function WizardShell({ children }: { children: ReactNode }) {
  return (
    <GeneratePathFormProvider>
      <WizardShellInner>{children}</WizardShellInner>
    </GeneratePathFormProvider>
  );
}

function WizardShellInner({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [confirmingDiscard, setConfirmingDiscard] = useState(false);

  const handleDiscard = () => {
    clearDraft();
    router.push("/roadmaps");
  };

  return (
    <>
      <RoadmapFrame onClose={() => setConfirmingDiscard(true)}>
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
