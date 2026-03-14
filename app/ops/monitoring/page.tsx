import { DataGrid } from "@/components/app/data-grid";
import { ListTable } from "@/components/app/list-table";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { alerts } from "@/lib/data/platform";

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Monitoring"
        title="Service quality and alerting"
        description="v1 monitoring stays disciplined: availability, latency, packet loss, bandwidth utilization, and alert acknowledgment."
        actions={[
          { label: "Alert rules", href: "/ops/monitoring/alert-rules" },
          { label: "Metrics explorer", href: "/ops/monitoring/metrics", variant: "secondary" }
        ]}
      />

      <DataGrid
        columns={4}
        items={[
          { label: "Device availability", value: "99.97%" },
          { label: "Median latency", value: "12 ms" },
          { label: "Packet loss posture", value: "0.4%" },
          { label: "Open alerts", value: `${alerts.length}` }
        ]}
      />

      <SectionCard title="Active alerts">
        <ListTable
          items={[...alerts]}
          getKey={(alert) => alert.id}
          rowHref={(alert) => `/ops/monitoring/alerts/${alert.id}`}
          columns={[
            { key: "title", header: "Alert", render: (alert) => alert.title },
            { key: "severity", header: "Severity", render: (alert) => alert.severity },
            { key: "status", header: "Status", render: (alert) => alert.status },
            { key: "target", header: "Target", render: (alert) => alert.target }
          ]}
        />
      </SectionCard>
    </div>
  );
}

