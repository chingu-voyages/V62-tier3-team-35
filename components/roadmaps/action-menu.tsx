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
  /** renders a separator above this item */
  separatorBefore?: boolean;
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
  align = "end",
  defaultOpen,
  className,
  contentClassName,
  disabled = false,
}: ActionMenuProps) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 shrink-0 rounded-full text-foreground hover:bg-secondary",
            className,
          )}
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="sr-only">{label}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        className={cn(
          "w-45 rounded-2xl p-2 shadow-[0_12px_28px_rgba(17,18,17,0.14)]",
          contentClassName,
        )}
      >
        {items.map(
          ({
            label,
            icon: Icon,
            onSelect,
            destructive,
            disabled,
            separatorBefore,
          }) => (
            <Fragment key={label}>
              {separatorBefore && <DropdownMenuSeparator />}
              <DropdownMenuItem
                disabled={disabled}
                onSelect={onSelect}
                className={cn(
                  "gap-2",
                  destructive &&
                    "text-destructive focus:bg-destructive-bg focus:text-destructive",
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {label}
              </DropdownMenuItem>
            </Fragment>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
