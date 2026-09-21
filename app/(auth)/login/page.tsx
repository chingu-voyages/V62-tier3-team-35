import AuthFooter from "@/components/auth-footer";
import AuthHeader from "@/components/auth-header";
import LoginForm from "./login-form";
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
        title="Welcome back"
        description="Log in to continue your learning journey."
      />
      <LoginForm />
      <AuthFooter variant="login" />
    </div>
  );
}
