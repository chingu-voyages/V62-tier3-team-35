import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Github } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ContributorsPopover } from "@/components/marketing/contributors-popover";

const githubUrl = "https://github.com/chingu-voyages/V62-tier3-team-35";

export function LandingFooter() {
  return (
    <footer
      id="footer"
      className="w-full bg-foreground px-6 py-12 text-background sm:px-10 sm:py-16 lg:px-[4.6875vw] lg:py-[4.365vw]"
    >
      <div className="mx-auto flex min-h-140 max-w-[1392px] flex-col rounded-4xl bg-accent px-6 pt-8 pb-12 text-foreground sm:px-10 sm:pt-10 sm:pb-16 lg:min-h-160 lg:px-12 lg:pt-12 lg:pb-20">
        <h2 className="landing-heading max-w-3xl">
          LESS GUESSING.
          <br />
          MORE PROGRESS.
        </h2>

        <div className="mt-8 flex flex-col gap-8 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
          <p className="landing-body text-center sm:text-left">
            A personal roadmap. A clear place to start.
          </p>
          <Button
            asChild
            variant="primary"
            size="lg"
            className="h-14 min-w-52 px-5 sm:self-auto"
          >
            <Link href="/generate-path/career-goal">
              Create my path
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="mt-auto flex flex-col gap-8 pt-20 sm:gap-6 lg:flex-row items-center lg:justify-between lg:pt-24">
          <p className="landing-caption text-secondary-foreground">
            Built with <span className="text-success">♥</span> by a small team
            of learners
          </p>

          <ContributorsPopover />

          <Link
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="landing-caption inline-flex items-center gap-2 underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
          >
            <Github className="size-6" aria-hidden="true" />
            <span>View on GitHub</span>
            <ArrowUpRight className="size-5" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
