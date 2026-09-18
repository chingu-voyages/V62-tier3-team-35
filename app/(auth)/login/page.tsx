import AuthFooter from "@/components/auth-footer";
import AuthHeader from "@/components/auth-header";
import LoginForm from "./login-form";

export default function page() {
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
