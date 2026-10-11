import React from "react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Resolves a Lucide icon component whether provided as a component or as a string name.
 * Falls back to Code2 if the icon name is not found in lucide-react.
 */
export function getStepIcon(icon: LucideIcon | string | undefined | null): LucideIcon {
  if (!icon) return Icons.Code2;
  if (typeof icon !== "string") return icon;

  let Component = Icons[icon as keyof typeof Icons];
  if (typeof Component === "function") {
    return Component as LucideIcon;
  }

  const pascalName = icon
    .split(/[-_ ]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  Component = Icons[pascalName as keyof typeof Icons];
  if (typeof Component === "function") {
    return Component as LucideIcon;
  }

  return Icons.Code2;
}

/**
 * Static component to render a Lucide icon safely without React compiler / hook warnings.
 */
export function StepIcon({
  icon,
  className,
}: {
  icon: LucideIcon | string | undefined | null;
  className?: string;
}) {
  const IconComponent = getStepIcon(icon);
  return React.createElement(IconComponent, { className });
}
