import Link from "next/link";

import { firstStepPath } from "@/components/generate-path/step-config";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background">
      <Button asChild variant="primary" size="lg">
        <Link href={firstStepPath}>Create your roadmap</Link>
      </Button>
    </main>
  );
}
