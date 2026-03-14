import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { Bell, ChevronRight, Search, TowerControl } from "lucide-react";
import { signOutAction } from "@/app/auth/actions";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { APP_CONFIG } from "@/lib/constants/app-config";

type ShellNavItem = {
  label: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
};

type AppShellProps = {
  title: string;
  eyebrow: string;
  navItems: readonly ShellNavItem[];
  children: ReactNode;
  accent?: "ops" | "portal";
  currentUser?: {
    name: string;
    role: string;
  } | null;
};

export function AppShell({
  title,
  eyebrow,
  navItems,
  children,
  currentUser
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <aside className="w-full shrink-0 border-b border-border bg-[rgb(9,24,46)] text-white lg:w-80 lg:border-b-0 lg:border-r lg:border-r-white/8">
          <div className="border-b border-white/8 p-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/12 text-sm font-bold text-white">
                {APP_CONFIG.shortName}
              </div>
              <div>
                <p className="font-display text-lg text-white">{APP_CONFIG.name}</p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">{eyebrow}</p>
              </div>
            </Link>
          </div>

          <div className="p-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/10 p-2.5 text-white">
                  <TowerControl className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-white/45">Workspace</p>
                  <p className="mt-1 text-sm font-semibold text-white">{title}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/68">
                Enterprise workflow shell for broadband operations, access control, and service management.
              </p>
            </div>
          </div>

          <div className="px-6">
            <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-white/42">Navigation</p>
          </div>

          <nav className="space-y-1 px-4 pb-6">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-white/78 transition hover:bg-white/8 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-white/32" />
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-border bg-panel">
            <div className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-secondary">{eyebrow}</p>
                <h2 className="mt-1 font-display text-2xl text-accent">{title}</h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink/60">
                  <Search className="h-4 w-4" />
                  Search subscribers, devices, tickets
                </div>
                {currentUser ? (
                  <div className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-ink/72">
                    <span className="font-semibold text-accent">{currentUser.name}</span>
                    <span className="ml-2 text-ink/48">{currentUser.role}</span>
                  </div>
                ) : null}
                <ThemeToggle />
                <button className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-accent">
                  <Bell className="h-4 w-4" />
                  Alerts
                </button>
                {currentUser ? (
                  <form action={signOutAction}>
                    <button className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-accent transition hover:border-secondary/50 hover:bg-mist">
                      Sign out
                    </button>
                  </form>
                ) : null}
              </div>
            </div>
          </header>

          <main className="min-h-[calc(100vh-5rem)] bg-mist p-6 md:p-7 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
