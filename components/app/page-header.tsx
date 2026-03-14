import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";

type ActionLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  status?: {
    label: string;
    tone?: "success" | "warning" | "danger" | "neutral";
  };
  backHref?: string;
  actions?: ActionLink[];
};

export function PageHeader({
  eyebrow,
  title,
  description,
  status,
  backHref,
  actions
}: PageHeaderProps) {
  return (
    <section className="rounded-md border border-border bg-elevated p-5 md:p-6">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {backHref ? (
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-xs uppercase tracking-[0.12em] text-ink/60 transition hover:bg-mist"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </Link>
            ) : null}
            <p className="text-xs uppercase tracking-[0.12em] text-secondary">{eyebrow}</p>
            {status ? <StatusBadge label={status.label} tone={status.tone} /> : null}
          </div>
          <div>
            <h1 className="font-display text-3xl text-accent md:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/68">{description}</p>
          </div>
        </div>

        {actions?.length ? (
          <div className="flex flex-wrap gap-3">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.variant === "secondary"
                    ? "inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-accent transition hover:bg-mist"
                    : "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
                }
              >
                {action.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
