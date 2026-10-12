export function ProblemSection() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="w-full bg-secondary text-foreground"
    >
      <div className="mx-auto flex w-full max-w-[1536px] flex-col px-[clamp(1.5rem,3.515625vw,3.375rem)] py-16 sm:py-20 lg:min-h-[800px] lg:pt-[clamp(4rem,9.635417vw,9.25rem)] lg:pb-[clamp(4rem,6.770833vw,6.5rem)]">
        <h2
          id="problem-heading"
          className="flex flex-col text-[clamp(2.25rem,5.46875vw,5.25rem)] leading-[1.083333] font-medium tracking-[-0.033333em]"
        >
          <span className="grid gap-y-0 lg:ml-[27%] lg:gap-y-[0.059524em]">
            <span>There are thousands</span>
            <span className="text-balance">of things you could learn.</span>
          </span>
          <span className="mt-0 grid gap-y-0 lg:-mt-[0.142857em] lg:gap-y-[0.107143em]">
            <span className="text-balance">You only need to know</span>
            <span>
              <span className="relative isolate z-0 inline-block max-w-full tracking-[-0.028571em] before:absolute before:inset-x-0 before:top-[8%] before:bottom-[4%] before:-z-10 before:rounded-[10px] before:bg-[#f3fdd8] before:blur-[10px]">
                what comes next.
              </span>
            </span>
          </span>
        </h2>

        <div className="mt-12 grid gap-8 lg:mt-[4.296875vw] lg:grid-cols-2 lg:gap-[112px]">
          <div>
            <p className="text-[13px] leading-4 font-semibold tracking-[1.1px] text-secondary-foreground">
              THE PROBLEM
            </p>
            <div className="mt-4 grid gap-y-3 text-[clamp(1.375rem,1.822917vw,1.75rem)] leading-[1.285714] font-medium">
              <p>Endless resources.</p>
              <p>No clear sequence.</p>
            </div>
          </div>

          <p className="max-w-[430px] text-[clamp(1.125rem,1.432292vw,1.375rem)] leading-[1.454545] text-secondary-foreground lg:pt-[6px]">
            Tutorials, courses and advice are everywhere. Pathway turns them
            into a sequence built around your goal.
          </p>
        </div>
      </div>
    </section>
  );
}
