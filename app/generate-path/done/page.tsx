import { Suspense } from "react";
import { DoneScreen } from "@/components/generate-path/screens/done-screen";
import { Spinner } from "@/components/ui/spinner";

export default function DonePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <DoneScreen />
    </Suspense>
  );
}
