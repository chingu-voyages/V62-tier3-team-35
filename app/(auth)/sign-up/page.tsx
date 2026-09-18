import AuthForm from "@/components/auth-form";
import AuthFooter from "@/components/auth-footer";
import AuthHeader from "@/components/auth-header";

export default function page() {
	return (
		<div className="min-h-[500px]">
			<AuthHeader title="Create your account" description="Start building a learning path tailored your goals." />
			<AuthForm action={"/sign-up"} variant="signup" />
			<AuthFooter variant="signup" />
		</div>
	)
}
