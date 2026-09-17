import AuthForm from "@/components/auth-form";
import AuthFooter from "@/components/auth-footer";

export default function page() {
	return (
		<>
			<header className="pb-8 sm:pb-9"> 
				<h1 className="font-bold text-3xl sm:text-4xl text-foreground pb-0.5"> Welcome back </h1>
				<p className="text-muted-foreground">Log in to continue your learning journey.</p>
			</header>
			<AuthForm action={"/login"}>
				<AuthFooter />
			</AuthForm>
		</>
	)
}
