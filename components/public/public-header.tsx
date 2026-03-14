import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { PublicBrand } from "@/components/public/public-brand";

const NAV_ITEMS = [
  { label: "Platform", href: "#platform" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Workflows", href: "#workflows" },
  { label: "Access", href: "#access" }
] as const;

export function PublicHeader() {
  return (
    <header className="public-content sticky top-0 z-40 border-b border-border bg-elevated/96 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-6 px-6 py-4 lg:px-10 2xl:px-16">
        <PublicBrand />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/74 transition hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="hidden items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-accent transition hover:bg-panel md:inline-flex"
          >
            Customer portal
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
