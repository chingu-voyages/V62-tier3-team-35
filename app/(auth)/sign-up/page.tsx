import SignUpForm from "./signup-form";
import AuthFooter from "@/components/auth-footer";
import AuthHeader from "@/components/auth-header";
import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }


  return (
    <div className="min-h-[500px]">
      <AuthHeader
        title="Create your account"
        description="Start building a learning path tailored your goals."
      />
      <SignUpForm />
      <AuthFooter variant="signup" />
    </div>
  );
}
