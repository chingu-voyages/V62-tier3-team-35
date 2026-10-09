import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { LucideIcon } from "lucide-react";

type BannerProps = {
  variant?: "default" | "destructive" | "success" | "info";
  icon?: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function Banner({
  variant = "default",
  icon,
  title,
  description,
  className,
}: BannerProps) {
  return (
    <Alert variant={variant} icon={icon} className={className}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
