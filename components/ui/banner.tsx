import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type BannerProps = {
  variant?: "default" | "destructive" | "success";
  title: string;
  message: string;
};

export function Banner({ variant = "default", title, message }: BannerProps) {
  return (
    <Alert variant={variant}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
