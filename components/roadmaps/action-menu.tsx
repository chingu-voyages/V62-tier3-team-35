"use client";

import { Fragment } from "react";
import { MoreHorizontal, type LucideIcon } from "lucide-react";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ActionMenuItem = {
  label: string;
  icon?: LucideIcon;
  onSelect?: () => void;
  destructive?: boolean;
  disabled?: boolean;
};

type ActionMenuProps = {
  items: ActionMenuItem[];
  /** screen-reader label for the trigger */
  label?: string;
  align?: "start" | "center" | "end";
  defaultOpen?: boolean;
  /** classes for the trigger button (e.g. positioning offsets) */
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
};

export function ActionMenu({
  items,
  label = "Actions",
  align = "start",
  defaultOpen,
  className,
  contentClassName,
  disabled = false,
}: ActionMenuProps) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button
          variant="secondary"
          size="icon-lg"
          className={className}
        >
          <MoreHorizontal className="size-4" />
          <span className="sr-only">{label}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        className={cn(
          "w-45 rounded-xl p-2 shadow-[0_12px_28px_rgba(17,18,17,0.14)]",
          contentClassName,
        )}
      >
        {items.map(({ label, icon: Icon, onSelect, destructive, disabled }) => (
          <Fragment key={label}>
            <DropdownMenuItem
              disabled={disabled}
              onSelect={onSelect}
              className={cn(
                "gap-2 cursor-pointer",
                destructive &&
                "text-destructive focus:bg-destructive-bg focus:text-destructive",
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {label}
            </DropdownMenuItem>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
