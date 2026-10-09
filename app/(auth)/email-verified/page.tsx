import AuthHeader from "@/components/auth-header";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthBodyIcon from "@/components/auth-body-icon";

function AuthBody() {
	return (
		<div>
			<AuthBodyIcon
				Icon={CheckCircle2}
				title="You're all set"
				description="Continue to onboarding and create your first learning path."
			/>

			<Button
				variant="primary"
				size="lg"
				className="w-full"
				asChild
			>
				<Link href="/">
					Continue to onboarding
				</Link>
			</Button>
		</div>
	)
}

export default function page() {
	return (
		<div className="min-h-[500px]">
			<AuthHeader
				title="Email verified"
				description="Your account is ready to go."
				className="text-center sm:pb-6"
			/>
			<AuthBody />
		</div>
	);
}
