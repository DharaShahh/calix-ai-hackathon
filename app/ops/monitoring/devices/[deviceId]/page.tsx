import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";

export default async function MonitoringDevicePage({
  params
}: {
  params: Promise<{ deviceId: string }>;
}) {
  const { deviceId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Monitoring"
        title={`Health for ${deviceId}`}
        description="Device health views expose the core v1 metrics and their alert posture."
        backHref="/ops/monitoring"
      />

      <DataGrid
        columns={4}
        items={[
          { label: "Reachability", value: "Online" },
          { label: "Uptime", value: "41 days" },
          { label: "Packet loss", value: "0.2%" },
          { label: "Alert posture", value: "Stable" }
        ]}
      />
    </div>
  );
}

