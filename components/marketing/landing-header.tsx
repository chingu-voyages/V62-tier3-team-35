"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Compass, LogOut, Menu, PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { firstStepPath } from "@/components/generate-path/step-config";
import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
];

export function LandingHeader() {
  const { data: session } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();
  const initials = (session?.user.name ?? "User")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  async function signOut() {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      const result = await authClient.signOut();
      if (result.error) {
        toast.error(
          result.error.message || "We couldn’t sign you out. Try again.",
        );
        return;
      }
      router.push("/login");
    } catch {
      toast.error("We couldn’t sign you out. Try again.");
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 mx-auto flex h-(--navbar-height) w-full max-w-screen-2xl items-center justify-between gap-4 bg-transparent px-4 text-background sm:px-10 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-18">
      <Logo
        variant="text"
        size="sm"
        className="gap-2 text-xl font-bold text-background max-sm:[&_p]:hidden"
      />

      <nav
        aria-label="Main navigation"
        className="hidden items-center gap-5 md:flex lg:gap-6"
      >
        {navigationLinks.map(({ href, name }) => (
          <Link key={href} href={href} className="text-sm/6 text-background">
            {name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center justify-self-end gap-4 md:gap-5 lg:gap-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="text-background hover:bg-background/10 hover:text-background md:hidden"
            >
              <Menu aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogTitle>Navigation</DialogTitle>
            <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
              {navigationLinks.map(({ href, name }) => (
                <DialogClose asChild key={href}>
                  <Link href={href} className="text-lg font-medium">
                    {name}
                  </Link>
                </DialogClose>
              ))}
            </nav>
          </DialogContent>
        </Dialog>

        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Account menu"
                className="rounded-full"
              >
                <Avatar className="size-8">
                  <AvatarFallback className="bg-card text-xs font-semibold text-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <p className="truncate">{session.user.name || "User"}</p>
                <p className="truncate text-xs font-normal text-muted-foreground">
                  {session.user.email}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={firstStepPath}>
                    <PlusCircle aria-hidden="true" />
                    Create Roadmap
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <Compass aria-hidden="true" />
                    My Roadmaps
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                disabled={isSigningOut}
                onSelect={signOut}
              >
                {isSigningOut ? <Spinner /> : <LogOut aria-hidden="true" />}
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link href="/login" className="text-sm/6 text-background">
              Login
            </Link>
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="rounded-full"
            >
              <Link href={firstStepPath}>Get started</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
