import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function MetricsExplorerPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Monitoring"
        title="Metrics explorer"
        description="This route will later expose filtered metric queries without sending portal traffic to raw telemetry tables."
        backHref="/ops/monitoring"
      />

      <SectionCard title="Launch metric set">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {["Device availability", "Service uptime", "Latency", "Packet loss", "Bandwidth utilization"].map(
            (item) => (
              <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
                {item}
              </div>
            )
          )}
        </div>
      </SectionCard>
    </div>
  );
}

