"use client";

import { ChevronRight, LogOut, Settings, User } from "lucide-react";

import { cn } from "cn";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SidebarUserMenuProps = {
  name: string;
  collapsed: boolean;
  onLogout: () => void;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function SidebarUserMenu({
  name,
  collapsed,
  onLogout,
}: SidebarUserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className={cn(
            "flex h-14 w-full items-center gap-3 rounded-full p-1.5 text-left transition-colors",
            "hover:bg-white/10 data-[state=open]:bg-white/10",
            collapsed && "justify-center",
          )}
        >
          <Avatar className="size-9 shrink-0">
            <AvatarFallback className="bg-white/10 text-[13px] font-medium text-[#D5D9D2]">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>

          <span
            className={cn(
              "flex-1 truncate whitespace-nowrap text-sm font-medium text-[#D5D9D2]",
              collapsed && "hidden",
            )}
          >
            {name}
          </span>

          <ChevronRight
            className={cn(
              "mr-2 size-4 shrink-0 text-white/50",
              collapsed && "hidden",
            )}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="right"
        align="end"
        sideOffset={16}
        className="w-52 rounded-2xl p-2 shadow-[0_12px_28px_rgba(17,18,17,0.14)]"
      >
        <DropdownMenuItem
          className="gap-2 rounded-[14px] cursor-pointer p-2 hover:bg-muted!"
          disabled
        >
          <User className="size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2 rounded-[14px] cursor-pointer p-2 hover:bg-muted!"
          disabled
        >
          <Settings className="size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={onLogout}
          variant="destructive"
          className="gap-2 rounded-[14px] cursor-pointer p-2"
        >
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
