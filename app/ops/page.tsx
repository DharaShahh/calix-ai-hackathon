import { ArrowRight, LineChart, RadioTower, ShieldAlert } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { KPI_CARDS, OPS_TIMELINE } from "@/lib/data/mock";

const workstreams = [
  {
    title: "Subscriber operations",
    detail: "Customer, plan, subscription, and portal-access workflows come next in Phase 2.",
    icon: RadioTower
  },
  {
    title: "Provisioning backbone",
    detail: "Template-driven jobs, retry states, and tracked activation events are preserved in the shell.",
    icon: LineChart
  },
  {
    title: "Fault readiness",
    detail: "Monitoring, alerts, and assignment views are represented without committing backend logic too early.",
    icon: ShieldAlert
  }
] as const;

export default function OpsDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-2xl border border-border bg-elevated p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge label="Phase 1 live" tone="success" />
            <StatusBadge label="Single-tenant deployment" />
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-3xl text-ink md:text-4xl">
            Broadband operations overview
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/72">
            This workspace is structured for subscriber operations, service activation, device visibility,
            monitoring, and incident handling. Each section is designed to help internal teams work from the same operational context.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white">
              Open subscriber flow
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-ink">
              Review provisioning queue
            </button>
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-elevated p-6">
          <p className="text-xs uppercase tracking-[0.12em] text-ink/45">Operational posture</p>
          <div className="mt-6 grid gap-4">
            {workstreams.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-2xl border border-border bg-surface p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-2.5 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink/68">{item.detail}</p>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {KPI_CARDS.map((card) => (
          <MetricCard key={card.label} label={card.label} value={card.value} change={card.change} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-2xl border border-border bg-elevated p-6">
          <p className="text-xs uppercase tracking-[0.12em] text-ink/45">Current implementation slice</p>
          <div className="mt-6 space-y-4">
            {[
              "App shell and route groups",
              "Centralized config, routes, roles, and statuses",
              "Supabase-backed auth and protected layouts",
              "Customer, plan, and subscription data access",
              "Ops and portal shells with shared component patterns"
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
                <p className="text-sm leading-7 text-ink/70">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-elevated p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-ink/45">Timeline preview</p>
              <h2 className="mt-2 font-display text-2xl text-ink">Execution signals</h2>
            </div>
            <StatusBadge label="Mock data" />
          </div>
          <div className="mt-6 space-y-4">
            {OPS_TIMELINE.map((event) => (
              <div
                key={`${event.time}-${event.title}`}
                className="grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-[90px_1fr]"
              >
                <p className="text-sm font-semibold text-ink">{event.time}</p>
                <div>
                  <p className="text-sm font-semibold text-ink">{event.title}</p>
                  <p className="mt-2 text-sm leading-7 text-ink/65">{event.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
