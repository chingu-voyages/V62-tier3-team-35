import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import Link from "next/link";

const logoVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "text-foreground",
        text: "gap-4 text-foreground",
      },
      size: {
        default: "h-9 text-base",
        xs: "h-6 text-xs",
        sm: "h-8 text-sm",
        lg: "h-11 font-semibold text-2xl",
        xl: "h-24 text-4xl font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Logo({
  className,
  variant = "default",
  size = "default",
  ...props
}:
  React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof logoVariants>) {
  return (
    <Link
      href="/"
    >
      <div className={cn(logoVariants({ variant, size, className }))} {...props}>
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full" aria-label="Pathway logo">
          <g clipPath="url(#clip0_59_1807)">
            <path d="M6.67871 28.129V16.0145C7.18943 8.48609 9.03585 6.20752 18.6738 6.20752H29.1694C34.3596 6.20752 37.243 9.32267 37.243 13.9377C37.243 19.0142 32.9755 23.0524 27.9007 23.0524H20.0578C14.983 23.0524 10.2542 24.8984 6.67871 28.129Z" fill="#111211" />
            <path d="M6.84008 37.7821C6.78091 33.6244 8.87274 30.4757 12.3259 28.1583C14.1086 26.9987 16.3478 26.3053 18.7089 26.2717L20.7327 26.2429L20.8013 31.0621C20.8604 35.2198 16.9724 38.5831 12.0254 38.6535L9.10216 38.6951C7.75298 38.7143 6.84815 38.3491 6.84008 37.7821Z" fill="#111211" />
            <rect width="44" height="44" rx="11.7333" fill="#111211" />
            <path d="M6.67871 28.129V16.0145C7.18943 8.48609 9.03585 6.20752 18.6738 6.20752H29.1694C34.3596 6.20752 37.243 9.32267 37.243 13.9377C37.243 19.0142 32.9755 23.0524 27.9007 23.0524H20.0578C14.983 23.0524 10.2542 24.8984 6.67871 28.129Z" fill="#F3FDD8" />
            <path d="M6.84008 37.7821C6.78091 33.6244 8.87274 30.4757 12.3259 28.1583C14.1086 26.9987 16.3478 26.3053 18.7089 26.2717L20.7327 26.2429L20.8013 31.0621C20.8604 35.2198 16.9724 38.5831 12.0254 38.6535L9.10216 38.6951C7.75298 38.7143 6.84815 38.3491 6.84008 37.7821Z" fill="#DFFF55" />
          </g>
          <defs>
            <clipPath id="clip0_59_1807">
              <rect width="44" height="44" rx="11.7333" fill="white" />
            </clipPath>
          </defs>
        </svg>
        {variant === "text" && <p> Pathway </p>}
      </div>
    </Link>
  );
}

export { Logo, logoVariants };
