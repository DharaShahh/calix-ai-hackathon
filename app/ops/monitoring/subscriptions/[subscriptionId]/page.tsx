import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";

export default async function MonitoringSubscriptionPage({
  params
}: {
  params: Promise<{ subscriptionId: string }>;
}) {
  const { subscriptionId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Monitoring"
        title={`Service health for ${subscriptionId}`}
        description="Subscriber service health is the simplified monitoring lens used by support and the customer portal."
        backHref="/ops/monitoring"
      />

      <DataGrid
        columns={4}
        items={[
          { label: "Service state", value: "Stable" },
          { label: "Latency", value: "14 ms" },
          { label: "Packet loss", value: "0.3%" },
          { label: "Bandwidth posture", value: "Healthy" }
        ]}
      />
    </div>
  );
}

