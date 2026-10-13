export function ProblemSection() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="w-full scroll-mt-(--navbar-height) bg-secondary text-foreground"
    >
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col px-[clamp(1.5rem,3.515625vw,3.375rem)] py-16 sm:py-20 lg:min-h-200 lg:pt-[clamp(4rem,9.635417vw,9.25rem)] lg:pb-[clamp(4rem,6.770833vw,6.5rem)]">
        <h2 id="problem-heading" className="landing-heading flex flex-col">
          <span className="grid gap-y-0 lg:ml-[27%] lg:gap-y-[0.059524em]">
            <span>There are thousands</span>
            <span className="text-balance">of things you could learn.</span>
          </span>
          <span className="mt-0 grid gap-y-0 lg:-mt-[0.142857em] lg:gap-y-[0.107143em]">
            <span className="text-balance">You only need to know</span>
            <span>
              <span className="relative isolate z-0 inline-block max-w-full before:absolute before:inset-x-0 before:top-[8%] before:bottom-[4%] before:-z-10 before:rounded-lg before:bg-[#f3fdd8] before:blur-sm">
                what comes next.
              </span>
            </span>
          </span>
        </h2>

        <div className="mt-12 grid gap-8 lg:mt-[4.296875vw] lg:grid-cols-2 lg:gap-28">
          <div>
            <p className="landing-eyebrow text-secondary-foreground">
              THE PROBLEM
            </p>
            <div className="landing-subheading mt-4 grid gap-y-3">
              <p>Endless resources.</p>
              <p>No clear sequence.</p>
            </div>
          </div>

          <p className="landing-body max-w-md text-secondary-foreground lg:pt-1.5">
            Tutorials, courses and advice are everywhere. Pathway turns them
            into a sequence built around your goal.
          </p>
        </div>
      </div>
    </section>
  );
}
