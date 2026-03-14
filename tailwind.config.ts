import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        ink: "var(--color-ink)",
        mist: "var(--color-mist)",
        surface: "var(--color-surface)",
        elevated: "var(--color-elevated)",
        panel: "var(--color-panel)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
        signal: "var(--color-signal)",
        danger: "var(--color-danger)",
        warning: "var(--color-warning)",
        success: "var(--color-success)"
      },
      boxShadow: {
        halo: "0 24px 70px rgba(11, 42, 79, 0.18)"
      },
      borderRadius: {
        shell: "32px"
      },
      backgroundImage: {
        grid: "linear-gradient(to right, var(--color-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--color-grid) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
