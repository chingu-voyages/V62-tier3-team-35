"use client";

import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";

import { AppSidebar } from "@/components/common/sidebar";
import { Logo } from "@/components/logo";
import { cn } from "cn";

type DashboardShellProps = {
  children: ReactNode;
  className?: string;
};

export function DashboardShell({ children, className }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <AppSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <main
        className={cn(
          "w-full transition-[padding] duration-300 pl-0",
          collapsed ? "lg:pl-35" : "lg:pl-63",
          className,
        )}
      >
        <header className="flex shrink-0 items-center gap-3 p-4 lg:hidden">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted relative z-30"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Logo size="sm" />
        </header>

        {children}
      </main>
    </div>
  );
}
