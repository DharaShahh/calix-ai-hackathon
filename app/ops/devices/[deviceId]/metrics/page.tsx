import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";

export default async function DeviceMetricsPage({
  params
}: {
  params: Promise<{ deviceId: string }>;
}) {
  const { deviceId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Device health"
        title={`Metrics for ${deviceId}`}
        description="The metrics view is a narrow operational surface in v1: reachability, packet health, bandwidth posture, and uptime."
        backHref={`/ops/devices/${deviceId}`}
      />

      <DataGrid
        columns={4}
        items={[
          { label: "Availability", value: "99.97%" },
          { label: "Packet loss", value: "0.3%" },
          { label: "Latency", value: "12 ms" },
          { label: "Utilization", value: "64%" }
        ]}
      />
    </div>
  );
}

