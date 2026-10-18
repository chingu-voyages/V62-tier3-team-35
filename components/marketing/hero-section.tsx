import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ExploreRoadmapButton } from "@/components/marketing/explore-roadmap-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const highlights = [
  { value: "5", label: "Quick questions" },
  { value: "1", label: "Personal roadmap" },
  { value: "Your pace", label: "Built around your time" },
];

export function HeroSection() {
  const gridStyle = {
    "--hero-edge": "max(4.5rem, calc((100% - 96rem) / 2 + 4.5rem))",
  } as CSSProperties;

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center bg-foreground pt-(--navbar-height) text-background"
    >
      <div
        className="grid w-full grid-cols-[24px_minmax(0,1fr)_24px] items-center gap-y-12 py-16 sm:grid-cols-[40px_minmax(0,1fr)_40px] lg:grid-cols-[var(--hero-edge)_minmax(0,1fr)_2rem_minmax(0,1fr)_var(--hero-edge)] lg:gap-y-0 lg:py-24"
        style={gridStyle}
      >
        <div className="col-start-2 min-w-0 flex flex-col items-center lg:row-start-1 lg:items-start">
          <h1 id="hero-heading" className="landing-title">
            From curiosity to
            <br />
            <span className="mt-1 inline-block rounded-md bg-accent px-2 pb-1 text-foreground">
              real progress.
            </span>
          </h1>
          <p className="landing-body mt-8 max-w-md text-background/75">
            Turn what you want to learn, what you already know, and the time you
            have into a clear, personal roadmap. Know where to start — and what
            comes next.
          </p>

          <dl className="mt-12 flex w-fit max-w-full gap-4">
            {highlights.map(({ value, label }) => (
              <div
                key={label}
                className="flex shrink flex-col items-center text-center"
              >
                <dt className="landing-caption mt-2 text-background/65">
                  {label}
                </dt>
                <dd className="landing-subheading -order-1">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex w-full flex-col gap-x-12 gap-y-4 sm:w-auto sm:flex-row">
            <Button asChild variant="secondary" size="lg">
              <Link href="/generate-path/career-goal">
                Create my path
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
            <ExploreRoadmapButton />
          </div>
        </div>

        <figure
          id="roadmap-preview"
          className="col-start-2 min-w-0 scroll-mt-[calc(var(--navbar-height)+2rem)] lg:col-span-2 lg:col-start-4 lg:row-start-1"
        >
          <Card className="relative aspect-752/646 gap-0 overflow-clip rounded-4xl border border-input py-0 shadow-none ring-0 lg:max-h-[646px] lg:rounded-r-none lg:border-r-0">
            <Image
              src="/marketing/roadmap-preview.webp"
              alt="Learning roadmap from Foundation to JavaScript, Git and GitHub, React Basics, and optional advanced paths."
              fill
              sizes="(min-width: 1536px) calc(100vw - (100vw - 1536px) / 2 - 784px), (min-width: 1024px) calc(50vw - 16px), (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)"
              className="rounded-none! object-cover"
              preload
            />
          </Card>
        </figure>
      </div>
    </section>
  );
}
