"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { Menu, X } from "lucide-react";
import { UserMenu } from "./user-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navigationLinks = [
  { name: "Features", href: "#roadmap-benefits" },
  { name: "How it works", href: "#how-it-works" },
];

interface HeaderProps {
  variant?: "default" | "close";
  onClose?: () => void;
}

export default function Header({ variant = "default", onClose }: HeaderProps) {
  const { data: session } = authClient.useSession();

  return (
    <>
      {variant === "close" ? (
        <div className="absolute top-0 right-0 p-4 flex w-full justify-end">
          <Button
            variant="secondary"
            size="icon-lg"
            type="button"
            aria-label="Close form"
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <header
          data-landing
          className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between gap-3 bg-transparent px-6 text-background mix-blend-difference backdrop-blur-md sm:h-(--navbar-height) sm:px-10 lg:px-18"
        >
          <Logo variant="text" className="text-background" />

          <nav
            aria-label="Main navigation"
            className="pointer-events-auto hidden items-center gap-5 md:flex lg:gap-6"
          >
            {navigationLinks.map(({ href, name }) => (
              <Link
                key={href}
                href={href}
                className="landing-caption pointer-events-auto inline-flex min-h-8 items-center rounded-sm text-background"
              >
                {name}
              </Link>
            ))}
          </nav>

          <div className="pointer-events-auto flex items-center justify-self-end gap-4 md:gap-5 lg:gap-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="text-background hover:bg-background/10 hover:text-background md:hidden"
                >
                  <Menu aria-hidden="true" className="text-background size-6" />
                </Button>
              </DialogTrigger>
              <DialogContent data-landing aria-describedby={undefined}>
                <DialogTitle>Navigation</DialogTitle>
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-4"
                >
                  {navigationLinks.map(({ href, name }) => (
                    <DialogClose asChild key={href}>
                      <Link href={href} className="landing-body font-medium">
                        {name}
                      </Link>
                    </DialogClose>
                  ))}
                </nav>
              </DialogContent>
            </Dialog>

            {session ? (
              <UserMenu user={session.user} />
            ) : (
              <Button asChild variant="primary" size="lg">
                <Link href="/login">Log in</Link>
              </Button>
            )}
          </div>
        </header>
      )}
    </>
  );
}
