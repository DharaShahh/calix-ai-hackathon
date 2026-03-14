import { notFound } from "next/navigation";
import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { getAlert } from "@/lib/data/platform";

export default async function AlertDetailPage({
  params
}: {
  params: Promise<{ alertId: string }>;
}) {
  const { alertId } = await params;
  const alert = getAlert(alertId);

  if (!alert) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Alert detail"
        title={alert.title}
        description="Alert detail captures severity, acknowledgment posture, and the operational target of the event."
        backHref="/ops/monitoring"
        status={{ label: alert.severity, tone: alert.severity === "Critical" ? "danger" : "warning" }}
      />

      <DataGrid
        columns={3}
        items={[
          { label: "Status", value: alert.status },
          { label: "Target", value: alert.target },
          { label: "Severity", value: alert.severity }
        ]}
      />
    </div>
  );
}

