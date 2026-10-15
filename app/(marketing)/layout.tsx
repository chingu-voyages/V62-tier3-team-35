import type { ReactNode } from "react";
import Header from "@/components/header";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      {children}
    </div>
  );
}
