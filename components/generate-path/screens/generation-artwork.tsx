import { Sparkles } from "lucide-react";

export function GenerationArtwork() {
  return (
    <div className="relative h-[145px] w-[166px] shrink-0" aria-hidden="true">
      <div className="relative h-[145px] w-[166px]">
        <span className="absolute -top-px -left-[31px] h-[145px] w-[228px] rounded-full bg-primary/10 blur-[62px] motion-reduce:blur-0" />
        <svg
          className="absolute inset-0 h-[145px] w-[166px] overflow-visible"
          viewBox="0 0 166 145"
          fill="none"
        >
          <g transform="matrix(0.9725 0 0 0.9861 -9.37 48.35)">
            <path
              d="M95.4857 8.3457C101.006 8.3457 105.146 9.7257 109.976 12.4857L162.416 42.8457C170.696 47.6757 170.696 55.2657 162.416 60.7857L109.976 90.4557C101.696 95.2857 89.9657 95.2857 81.6857 90.4557L28.5557 62.1657C20.2757 57.3357 20.2757 48.3657 28.5557 42.8457L81.6857 12.4857C86.5157 9.7257 90.6557 8.3457 95.4857 8.3457Z"
              fill="var(--success-bg)"
              stroke="var(--primary)"
              strokeWidth="0.69"
            />
          </g>
          <g transform="matrix(0.9725 0 0 0.9861 -10.72 19.8)">
            <path
              d="M95.4837 10.3457C101.004 10.3457 105.144 11.7257 109.974 14.4857L162.414 44.8457C170.694 49.6757 170.694 57.2657 162.414 62.7857L109.974 92.4557C101.694 97.2857 89.9638 97.2857 81.6838 92.4557L28.5538 64.1657C20.2738 59.3357 20.2738 50.3657 28.5538 44.8457L81.6838 14.4857C86.5137 11.7257 90.6537 10.3457 95.4837 10.3457Z"
              fill="var(--accent)"
              stroke="var(--primary)"
              strokeWidth="0.69"
            />
          </g>
          <g transform="matrix(0.9725 0 0 0.9861 -18.5 -16.12)">
            <path
              d="M103.486 16.3457C109.006 16.3457 113.146 17.7257 117.976 20.4857L170.416 50.8457C178.696 55.6757 178.696 63.2657 170.416 68.7857L117.976 98.4557C109.696 103.286 97.9657 103.286 89.6857 98.4557L36.5557 70.1657C28.2757 65.3357 28.2757 56.3657 36.5557 50.8457L89.6857 20.4857C94.5157 17.7257 98.6557 16.3457 103.486 16.3457Z"
              fill="var(--foreground)"
              stroke="var(--primary)"
              strokeWidth="0.69"
            />
          </g>
        </svg>
        <Sparkles className="absolute top-6 left-16 size-8 text-success-bg" />
      </div>
    </div>
  );
}