"use client";

import { usePathname } from "next/navigation";
import { Logo } from "../logo";
import HeaderDefault from "./header-default";
import { HeaderSteps } from "./header-steps";

interface NavbarProps {
  variant?: "default" | "steps";
  onClose?: () => void;
}

export default function Header({ variant = "default", onClose }: NavbarProps) {
  const pathname = usePathname();
  const isDone = pathname === "/generate-path/done";

  return (
    <header className="relative flex h-16 sm:h-(--navbar-height) items-center justify-between gap-3 px-4 sm:px-7">
      <Logo variant="text" />

      <div className="min-w-0 flex-1">
        {variant === "default" ? (
          <HeaderDefault />
        ) : (
          <HeaderSteps isDone={isDone} onClose={onClose} />
        )}
      </div>
    </header>
  );
}
