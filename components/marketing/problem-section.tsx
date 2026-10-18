export function ProblemSection() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="w-full scroll-mt-(--navbar-height) bg-secondary text-foreground"
    >
      <div className="mx-auto flex w-full items-center max-w-screen-2xl flex-col gap-14 lg:gap-20 px-[clamp(1.5rem,3.515625vw,3.375rem)] py-16 sm:py-20  lg:pt-[clamp(4rem,9.635417vw,9.25rem)] lg:pb-[clamp(4rem,6.770833vw,6.5rem)] lg:items-stretch">
        <h2 id="problem-heading" className="landing-heading">
          Thousands of things to learn.
          <br />
          You only need to know{" "}
          <span className="rounded-lg bg-foreground px-6 text-accent whitespace-nowrap">
            what comes next.
          </span>
        </h2>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-28">
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
