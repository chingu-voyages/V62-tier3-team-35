"use client";

/*
 * NOTE:
 * This Navbar is currently implemented for demonstration and reference purposes to showcase:
 * - Reactive client-side session handling via `authClient.useSession()`
 * - UI switching between guest (Login / Get Started) and authenticated state (User Avatar & Menu)
 * - Safe sign-out flow with loading feedback (Spinner) and error toast handling via `authClient.signOut()`
 * - Navigation links, responsive full-screen mobile menu drawer, and dropdown actions.
 */

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import {
	Menu,
	CompassIcon,
	PlusCircleIcon,
	SettingsIcon,
	LogOutIcon,
} from "lucide-react"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const navigationLink = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "About",
		href: "/about",
	},
	{
		name: "Features",
		href: "/features",
	},
	{
		name: "Pricing",
		href: "/pricing",
	},
];
interface UserMenuProps {
	user: {
		name?: string | null;
		email?: string | null;
	};
	initialsName?: string;
	signOut: () => void;
	isSigningOut: boolean;
}

export function UserMenu({ user, initialsName, signOut, isSigningOut }: UserMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
					<Avatar className="justify-center items-center size-8">
						<AvatarFallback className="text-xs font-semibold">
							{initialsName}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none text-foreground truncate">
							{user.name || "User"}
						</p>
						<p className="text-xs leading-none text-muted-foreground truncate">
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href="/create-path" className="cursor-pointer">
							<PlusCircleIcon className="size-4 mr-2" />
							Create Roadmap
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href="/dashboard" className="cursor-pointer">
							<CompassIcon className="size-4 mr-2" />
							My Roadmaps
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href="/settings" className="cursor-pointer">
							<SettingsIcon className="size-4 mr-2" />
							Settings
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					variant="destructive"
					onClick={() => signOut()}
					disabled={isSigningOut}
					className="cursor-pointer"
				>
					{isSigningOut ? (
						<Spinner className="size-4 mx-auto" />
					) : (
						<>
							<LogOutIcon className="size-4 mr-2" />
							Logout
						</>
					)}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}


interface HamburgerOpenProps {
	handleHamburger: () => void;
}

function HamburgerOpen({ handleHamburger }: HamburgerOpenProps) {
	return (
		<div className="fixed inset-0 h-dvh w-screen bg-background z-50 flex flex-col p-4 sm:px-6">
			<header className="flex justify-between items-center h-14">
				<Logo variant="text" size="sm" className="font-bold text-xl gap-2" />

				<button
					type="button"
					onClick={handleHamburger}
					className="p-2 text-foreground cursor-pointer outline-none"
					aria-label="Close menu"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18 18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</header>

			<div className="mt-8">
				<ul className="flex flex-col gap-6">
					{navigationLink.map((el, idx) => (
						<li key={idx}>
							<Link
								href={el.href}
								onClick={handleHamburger}
								className="text-2xl font-semibold text-foreground hover:text-muted-foreground transition-colors"
							>
								{el.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
export default function Navbar() {
	const [hamburger, setHamburger] = useState<boolean>(false);
	const { data: session } = authClient.useSession();

	function handleHamburger() {
		setHamburger(!hamburger);
	}
	const [isSigningOut, setIsSigningOut] = useState(false);
	const router = useRouter();

	const initialsName = session?.user.name
		.split(/\s+/)
		.map((w) => w[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	const signOut = async () => {
		if (isSigningOut) return;
		setIsSigningOut(true);

		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/login")
					setIsSigningOut(false);
				},
				onError: (ctx) => {
					toast.error(ctx.error.message || "We couldn’t sign you out. Try again.")
					setIsSigningOut(false);
				}
			}
		})
	};

	return (
		<header className="flex h-(--navbar-height) items-center justify-between gap-8 px-2 sm:px-4 md:px-6">
			<Logo variant="text" size="sm" className="font-bold text-xl gap-2" />

			<div className="flex items-center gap-4 md:gap-5 lg:gap-6">

				<nav className="hidden md:flex items-center gap-4 md:gap-5 lg:gap-6">
					{navigationLink.map(({ href, name }, idx) => (
						<Link
							href={href}
							key={idx}
							className="text-sm/6 text-foreground"
						>
							{name}
						</Link>
					))}
				</nav>

				<Button variant="ghost" onClick={handleHamburger} className="md:hidden">
					<Menu className="size-5" />
				</Button>

				{/* Divider */}
				<div className="h-6 w-px bg-foreground/5" />

				{session ? (
					<UserMenu
						user={session.user}
						initialsName={initialsName}
						signOut={signOut}
						isSigningOut={isSigningOut}
					/>
				) : (
					<>
						<Link href="/login" className="text-sm/6 text-foreground">
							Login
						</Link>
						<Button variant="primary" size="sm" className="rounded-full">
							Get started
						</Button>
					</>
				)}
			</div>


			{hamburger && <HamburgerOpen handleHamburger={handleHamburger} />}

		</header>
	)
}

