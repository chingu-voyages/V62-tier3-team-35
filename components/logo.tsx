import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import Link from "next/link";
import Image from "next/image";

const logoVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "text-foreground",
        text: "gap-2.5 text-foreground font-bold",
      },
      size: {
        default: "h-8 text-xl",
        xs: "h-6 text-xs",
        sm: "h-8 text-sm",
        lg: "h-11 font-semibold text-2xl",
        xl: "h-24 text-4xl",
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
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof logoVariants>) {
  return (
    <Link
      href="/"
      aria-label="Pathway home"
      className="inline-flex shrink-0 items-center"
    >
      <div
        className={cn(logoVariants({ variant, size, className }))}
        {...props}
      >
        <Image
          src="/pathway-brand.svg"
          alt="Pathway"
          width={132}
          height={32}
          priority
          className="h-full w-auto"
        />

        {variant === "text" && <p> Pathway </p>}
      </div>
    </Link>
  );
}

export { Logo, logoVariants };
