"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route, Home, Plus, ChevronsLeft, type LucideIcon } from "lucide-react";

import { cn } from "cn";
import { Logo } from "../logo";
import { SidebarUserMenu } from "./sidebar-user-menu";

type SidebarLinkProps = {
  active?: boolean;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
  href: string;
};

function SidebarLink({
  active,
  icon: Icon,
  label,
  collapsed,
  href,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "flex h-11 w-full items-center gap-3 rounded-full px-3 text-left text-[14px] transition",
        collapsed && "lg:justify-center lg:px-0",
        active
          ? "bg-white text-foreground"
          : "text-[#D5D9D2] hover:bg-white/10 hover:text-white",
      )}
    >
      <Icon
        className="h-4.75 w-4.75 shrink-0"
        strokeWidth={active ? 2.2 : 1.8}
      />
      <span className={cn("transition-opacity", collapsed && "lg:hidden")}>
        {label}
      </span>
    </Link>
  );
}

type AppSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
};

export function AppSidebar({
  collapsed,
  onToggle,
  className,
}: AppSidebarProps) {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isRoadmaps = pathname === "/roadmaps";
  const isNewRoadmap = pathname.startsWith("/generate-path");

  return (
    <aside
      className={cn(
        "fixed left-4 top-4 bottom-4 z-40",
        "flex flex-col overflow-hidden rounded-3xl bg-foreground text-white",
        "shadow-xl px-3 py-4 transition-[width] duration-300",
        collapsed ? "w-20" : "w-48",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center px-2 py-2",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        <div className="flex items-center gap-2.5">
          <div className={cn(collapsed && "lg:hidden")}>
            <Logo size="sm" />
          </div>
          <span
            className={cn(
              "text-[15px] font-semibold tracking-tight transition-opacity",
              collapsed && "lg:hidden",
            )}
          >
            Pathway
          </span>
        </div>
        <button
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onToggle}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/15 hover:text-white"
        >
          <ChevronsLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180",
            )}
          />
        </button>
      </div>

      <nav className={cn("mt-8 space-y-2", collapsed && "lg:space-y-3")}>
        <SidebarLink
          active={isHome}
          icon={Home}
          label="Home"
          collapsed={collapsed}
          href="/"
        />
        <SidebarLink
          active={isRoadmaps}
          icon={Route}
          label="Roadmaps"
          collapsed={collapsed}
          href="/roadmaps"
        />
        <SidebarLink
          active={isNewRoadmap}
          icon={Plus}
          label="New roadmap"
          collapsed={collapsed}
          href="/generate-path/career-goal"
        />
      </nav>

      <div className="mt-auto">
        {/* Contributors card can go here, above the user row */}
        <SidebarUserMenu collapsed={collapsed} />
      </div>
    </aside>
  );
}
