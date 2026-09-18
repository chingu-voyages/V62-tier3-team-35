import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";

export default function AuthBody() {
  return (
    <div>
      <div className="flex flex-col gap-4 pb-6 items-center">
        <div className="bg-accent rounded-3xl size-19 grid place-items-center">
          <MailCheck className="size-8" />
        </div>
        <h3 className="text-2xl font-bold"> Verify your email </h3>
        <p className="text-muted-foreground">
          {" "}
          Open the link in your email to activate your Pathway account
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="primary" size="lg" className="w-full">
          Resend email
        </Button>

        <Button variant="secondary" size="lg" className="w-full">
          Back to login
        </Button>
      </div>
    </div>
  );
}
