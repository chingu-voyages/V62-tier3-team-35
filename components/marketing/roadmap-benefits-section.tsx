import {
  ChartNoAxesColumn,
  Compass,
  Goal,
  Route,
  SlidersHorizontal,
  UserRoundCheck,
} from "lucide-react";

const roadmapBenefits = [
  {
    title: "Clarity",
    description: "Know what to learn next,\nand why it matters.",
    Icon: Compass,
  },
  {
    title: "Personalization",
    description: "Built around your goal, level,\nskills, and weekly time.",
    Icon: UserRoundCheck,
  },
  {
    title: "Progress",
    description: "See what’s complete, current,\nand what comes next.",
    Icon: ChartNoAxesColumn,
  },
  {
    title: "Branching",
    description:
      "Follow recommended steps and explore\noptional topics when you need them.",
    Icon: Route,
  },
  {
    title: "Adaptability",
    description: "Adjust the plan when your goals\nor available time change.",
    Icon: SlidersHorizontal,
  },
  {
    title: "Focus",
    description:
      "Keep the next best step visible\ninstead of juggling endless resources.",
    Icon: Goal,
  },
];

export function RoadmapBenefitsSection() {
  return (
    <section
      id="roadmap-benefits"
      aria-labelledby="roadmap-benefits-heading"
      className="w-full scroll-mt-(--navbar-height) bg-background text-foreground"
    >
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col px-[clamp(1.5rem,4.6875vw,4.5rem)] pb-16 sm:pb-20">
        <h2 id="roadmap-benefits-heading" className="landing-heading max-w-6xl">
          <span className="block text-muted-foreground">
            You don’t need more things to learn.
          </span>
          <span className="block">You need a better way through them.</span>
        </h2>

        <div className="mt-16 sm:mt-20 lg:mt-[clamp(7rem,11.523438vw,11.0625rem)]">
          <p className="landing-caption font-medium text-foreground">
            Six things your roadmap should do
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-y-8">
            {roadmapBenefits.map(({ title, description, Icon }) => (
              <li key={title} className="flex items-start gap-4 lg:gap-6">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-foreground sm:size-16 lg:size-18 lg:rounded-3xl">
                  <Icon aria-hidden="true" className="size-7 lg:size-8" />
                </span>
                <div className="min-w-0">
                  <h3 className="landing-subheading">{title}</h3>
                  <p className="landing-body mt-2 max-w-sm text-secondary-foreground lg:mt-3">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
