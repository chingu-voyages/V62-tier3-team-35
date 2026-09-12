import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background">
      <Button asChild>
        <Link href="/create-path">Create your roadmap</Link>
      </Button>
    </main>
  );
}
