"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";

export function TopThemeControl() {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 lg:right-6 lg:top-6">
      <div className="pointer-events-auto">
        <ThemeToggle />
      </div>
    </div>
  );
}

