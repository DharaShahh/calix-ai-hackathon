import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function AlertRulesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Monitoring"
        title="Alert rules"
        description="Admin-managed rule sets keep the v1 severity model simple: warning and critical thresholds mapped to the launch metric set."
        backHref="/ops/monitoring"
      />

      <SectionCard title="Default rule families">
        <div className="grid gap-4 md:grid-cols-2">
          {["Device offline", "Service down", "Packet loss threshold", "Latency degradation", "Bandwidth saturation"].map(
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
