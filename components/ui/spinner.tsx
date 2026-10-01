import { cn } from "cn";

function Spinner({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn(
        "size-6 animate-spin rounded-full border-3 border-foreground border-r-primary",
        className,
      )}
      {...props}
    />
  );
}

export { Spinner };
