import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Google, Github } from "./icons";


export default function AuthFooter() {
	return (
		<div className="">
			<Link
				href="/forgot-password"
				className="block ml-auto w-fit text-sm/5 text-right mb-6 font-medium"
			>
				Forgot password?
			</Link>

			<Button
				variant="primary"
				className="w-full"
				size="lg"
			>
				Log in
			</Button>

			<div className="flex justify-center items-center gap-4 py-7">
				<div className="bg-muted h-px w-full" />
				<span className="text-foreground/20 text-xs whitespace-nowrap"> Or continue with </span>
				<div className="bg-muted h-px w-full" />
			</div>

			<div className="flex gap-5 flex-wrap sm:wrap-0">
				<Button
					variant="secondary"
					className="flex-1 rounded-lg gap-4"
					size="lg"
					type="button"
				>
					<Google className="size-6" />
					Google
				</Button>

				<Button
					variant="secondary"
					className="flex-1 rounded-lg gap-4"
					size="lg"
					type="button"
				>
					<Github className="size-6" />
					GitHub
				</Button>
			</div>

			<p className="text-sm pt-12 text-muted-foreground">
				Don&apos;t have an account ?
				<Link
					href="/sign-up"
					className="text-sm font-semibold text-foreground pl-2"
				>
					Sign up
				</Link>
			</p>
		</div>
	);
}
