"use client";

import { useState, type ReactNode } from "react";

import { AppSidebar } from "@/components/common/sidebar";
import { cn } from "cn";

type DashboardShellProps = {
  children: ReactNode;
  className?: string;
};

export function DashboardShell({ children, className }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <AppSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />

      <main
        className={cn(
          "w-full transition-[padding] duration-300",
          collapsed ? "pl-35" : "pl-63",
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
}
