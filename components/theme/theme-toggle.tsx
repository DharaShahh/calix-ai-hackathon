"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { THEME_MODES } from "@/lib/constants/theme";
import { useTheme } from "@/components/theme/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === THEME_MODES.dark;

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="inline-flex items-center justify-center rounded-md border border-border bg-surface p-2.5 text-sm text-accent transition hover:bg-mist"
      aria-label="Toggle theme"
    >
      {isDark ? <SunMedium className="h-4 w-4 text-secondary" /> : <MoonStar className="h-4 w-4 text-secondary" />}
    </button>
  );
}
