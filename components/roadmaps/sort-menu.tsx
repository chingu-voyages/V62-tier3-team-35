"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortValue = "recent" | "updated" | "shorted" | "alpha";

export function SortMenu({
  sort,
  onSortChange,
}: {
  sort: SortValue;
  onSortChange: (v: SortValue) => void;
}) {
  return (
    <Select
      value={sort}
      onValueChange={(value) => onSortChange(value as SortValue)}
      disabled
    >
      <SelectTrigger className="h-10! w-39 rounded-full border-border shadow-none bg-white px-4 text-xs text-foreground focus:ring-0">
        Sort by:
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        className="rounded-2xl border-border p-2 w-47"
        align="center"
        position="popper"
      >
        <SelectItem value="recent" className="rounded-xl text-xs">
          Recently added
        </SelectItem>
        <SelectItem value="updated" className="rounded-xl text-xs">
          Recently updated
        </SelectItem>
        <SelectItem value="shortest" className="rounded-xl text-xs">
          Shortest duration
        </SelectItem>
        <SelectItem value="alpha" className="rounded-xl text-xs">
          Alphabetical
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
