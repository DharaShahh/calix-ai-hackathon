export const THEME_MODES = {
  light: "light",
  dark: "dark"
} as const;

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

export const THEME_STORAGE_KEY = "bop-theme";

export const THEME_COLORS = {
  primary: "#0b2a4f",
  secondary: "#60749f"
} as const;

