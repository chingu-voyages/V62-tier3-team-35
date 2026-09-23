import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import {
  CircleCheck,
  TriangleAlert,
  Info,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg p-3 items-center text-left text-xs has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg:not([class*='size-'])]:size-10 [&>svg]:bg-card [&>svg]:rounded-xl [&>svg]:p-2.5 [&>svg]:stroke-[1.8]",
  {
    variants: {
      variant: {
        default: "bg-muted",
        info: "bg-info-background",
        destructive: "bg-destructive-bg",
        success: "bg-success-bg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  icon,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    icon?: LucideIcon;
  }) {
  const role =
    variant === "destructive"
      ? "alert"
      : variant === "success"
        ? "status"
        : "note";

  const Icon =
    icon ??
    (variant === "destructive"
      ? TriangleAlert
      : variant === "success"
        ? CircleCheck
        : variant === "info"
          ? Lightbulb
          : Info);

  return (
    <div
      data-slot="alert"
      role={role}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon aria-hidden="true" />
      {children}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-bold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className,
      )}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2.5 right-3", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
