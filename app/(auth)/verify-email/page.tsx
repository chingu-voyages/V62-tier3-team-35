import AuthHeader from "@/components/auth-header";
import AuthBody from "./auth-body";

export default function page() {
	return (
		<div className="min-h-[500px] grid place-content-center">
			<AuthHeader title="Check your inbox" description="We sent a verification link to alex@company.com" className="text-center" />
			<AuthBody />
		</div>
	)
}
