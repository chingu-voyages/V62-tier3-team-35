const steps = [
  {
    label: "Your goal",
    title: "Give your path a destination.",
    description:
      "Choose a career direction or describe what you want to learn. Start with the outcome that matters to you.",
  },
  {
    label: "Your context",
    title: "Make it fit your life.",
    description:
      "Share your current level, known skills and weekly time. Choose a pace you can keep up with.",
  },
  {
    label: "Your roadmap",
    title: "See your next steps.",
    description:
      "Review your answers and generate a connected learning path with milestones, dependencies and optional topics.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="how-it-works-reveal relative isolate w-full scroll-mt-(--navbar-height) bg-background px-6 py-20 sm:px-10 lg:px-12 lg:py-24"
    >
      <div
        aria-hidden="true"
        data-slot="how-it-works-background"
        className="how-it-works-background pointer-events-none absolute inset-0 -z-10 bg-foreground"
      />
      {/* A solid base preserves text contrast independently of the expanding layer. */}
      <div className="mx-auto max-w-[1440px] rounded-4xl bg-foreground px-6 py-10 text-background sm:p-10 lg:p-16">
        <h2 id="how-it-works-heading" className="landing-heading max-w-4xl">
          A few questions.
          <br />A path that’s yours.
        </h2>
        <p className="landing-body mt-6 max-w-lg text-background/70 mx-auto lg:mx-0">
          Turn your ambition into a plan built around what you know and the time
          you have.
        </p>

        <ol
          aria-label="How your roadmap is created"
          className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-10"
        >
          {steps.map((step, index) => (
            <li
              key={step.label}
              className="flex min-w-0 flex-col items-center lg:items-stretch"
            >
              <span
                aria-hidden="true"
                className="landing-caption grid size-11 shrink-0 place-items-center rounded-full border border-accent/40 font-medium text-accent"
              >
                0{index + 1}
              </span>
              <h3 className="landing-subheading mt-6 max-w-sm text-balance">
                {step.title}
              </h3>
              <p className="landing-body mt-4 text-background/70 max-w-2xl lg:max-w-auto">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
