import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CreditCard,
  Network,
  ShieldCheck,
  UsersRound
} from "lucide-react";

type PublicHeroVisualProps = {
  compact?: boolean;
};

const metrics = [
  { label: "Active subscribers", value: "18,420" },
  { label: "Provisioning completion", value: "99.2%" },
  { label: "Average latency", value: "24ms" }
] as const;

const activityRows = [
  { label: "New activations", value: "42 today" },
  { label: "Plan changes", value: "18 queued" },
  { label: "Support impact", value: "6 linked incidents" }
] as const;

const summaryRows = [
  { label: "Subscriber ops", value: "14,260 active" },
  { label: "Monitoring", value: "1,284 reachable" },
  { label: "Billing sync", value: "Current" }
] as const;

export function PublicHeroVisual({ compact = false }: PublicHeroVisualProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] border border-border bg-primary text-white shadow-[0_28px_80px_rgba(11,42,79,0.16)] ${
        compact ? "min-h-[460px] p-6" : "min-h-[620px] p-8"
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(96,116,159,0.18),transparent_30%,rgba(255,255,255,0.03))]" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/55">Product preview</p>
            <h3 className="mt-3 font-public-display text-2xl text-white">
              One platform for subscriber operations, service assurance, and customer visibility.
            </h3>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-3 text-white/88">
            <Network className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/12 bg-white/10 p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">{metric.label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className={`grid gap-4 ${compact ? "mt-6" : "mt-10"} lg:grid-cols-[1.28fr_0.72fr]`}>
          <div className="rounded-[28px] border border-white/12 bg-white/10 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">Operations board</p>
                <p className="mt-2 text-sm text-white/78">
                  Provisioning, support, and subscriber context in one view
                </p>
              </div>
              <BarChart3 className="h-5 w-5 text-white/72" />
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">
                      Subscriber activity
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">Service delivery pipeline</p>
                  </div>
                  <UsersRound className="h-5 w-5 text-white/72" />
                </div>
                <div className="mt-4 space-y-3">
                  {activityRows.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl bg-white/8 px-3 py-2">
                      <span className="text-xs text-white/65">{item.label}</span>
                      <span className="text-sm font-semibold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">Operational posture</p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-white/10 bg-white/8 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Network core</span>
                      <span className="rounded-full bg-emerald-400/18 px-2.5 py-1 text-[11px] font-semibold text-emerald-200">
                        Healthy
                      </span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[82%] rounded-full bg-emerald-300" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/8 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Customer support load</span>
                      <span className="rounded-full bg-amber-400/18 px-2.5 py-1 text-[11px] font-semibold text-amber-100">
                        Warning
                      </span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[57%] rounded-full bg-amber-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {summaryRows.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/12 bg-white/8 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">{item.label}</p>
                  <p className="mt-2 text-sm text-white/82">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-white/12 bg-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/12 p-3">
                  <ShieldCheck className="h-5 w-5 text-white/85" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">Role-aware access</p>
                  <p className="mt-1 text-sm text-white/82">
                    Separate staff and customer experiences under one authentication foundation
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/12 bg-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/12 p-3">
                  <Activity className="h-5 w-5 text-white/85" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">Service operations</p>
                  <p className="mt-1 text-sm text-white/82">
                    Activation, monitoring, and incident handling stay connected to the same service record
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/12 bg-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/12 p-3">
                  <CreditCard className="h-5 w-5 text-white/85" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">Billing awareness</p>
                  <p className="mt-1 text-sm text-white/82">
                    Subscription state and billing-linked visibility remain aligned without adding a full billing engine
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/12 bg-white/10 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">Executive view</p>
                  <p className="mt-3 text-sm leading-7 text-white/78">
                    Designed for operators that need one operational story from activation through customer support.
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 text-white/72" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
