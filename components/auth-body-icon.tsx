import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthBodyIconProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  variant?: "default" | "destructive" | "info";
}

export default function AuthBodyIcon({
  Icon,
  title,
  description,
  className,
  variant = "default",
}: AuthBodyIconProps) {
  const variants = {
    default: "bg-accent text-accent-foreground",
    destructive: "bg-destructive/10 text-destructive",
    info: "bg-info-background text-info",
  }
  return (
    <div className={cn("flex flex-col gap-4 pb-6 items-center text-center", className)}>
      <div className={cn(variants[variant], "rounded-3xl size-19 grid place-items-center")}>
        <Icon className="size-8" />
      </div>
      <h3 className="text-2xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
