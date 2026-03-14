import { CreditCard, Gauge, LifeBuoy, Router } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { PORTAL_SUMMARY } from "@/lib/data/mock";

const portalCards = [
  {
    title: "Current plan",
    value: PORTAL_SUMMARY.planName,
    icon: Router
  },
  {
    title: "Usage snapshot",
    value: PORTAL_SUMMARY.usage,
    icon: Gauge
  },
  {
    title: "Billing state",
    value: PORTAL_SUMMARY.billingStatus,
    icon: CreditCard
  },
  {
    title: "Support posture",
    value: "Ticket timeline and issue requests stay request-driven in v1",
    icon: LifeBuoy
  }
] as const;

export default function PortalDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-2xl border border-border bg-elevated p-6 md:p-8">
          <StatusBadge label="Portal v1" tone="warning" />
          <h1 className="mt-5 max-w-2xl font-display text-3xl text-ink md:text-4xl">
            Customer self-service overview
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/68">
            The portal is intentionally read-heavy in v1. Customers can review service status, usage,
            billing-linked information, and support activity without exposing internal operational controls.
          </p>
        </article>

        <article className="rounded-2xl border border-border bg-elevated p-6">
          <p className="text-xs uppercase tracking-[0.12em] text-ink/45">Live posture</p>
          <h2 className="mt-3 font-display text-2xl text-ink">Service snapshot</h2>
          <p className="mt-3 text-sm leading-7 text-ink/72">{PORTAL_SUMMARY.serviceStatus}</p>
          <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-ink/45">Billing contact</p>
            <p className="mt-3 text-sm leading-7 text-ink/72">
              External provider integration is deferred, so billing values will be sourced via the
              planned adapter contract.
            </p>
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {portalCards.map((card) => {
          const Icon = card.icon;

          return (
            <article key={card.title} className="rounded-2xl border border-border bg-elevated p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.12em] text-ink/45">{card.title}</p>
                <div className="rounded-xl bg-signal/15 p-2.5 text-signal">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-6 text-base leading-7 text-ink/72">{card.value}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
