import { PageHeader } from "@/components/app/page-header";
import { TimelineList } from "@/components/app/timeline-list";

export default async function FaultTimelinePage({
  params
}: {
  params: Promise<{ faultId: string }>;
}) {
  const { faultId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Fault timeline"
        title={`Timeline for ${faultId}`}
        description="The fault timeline should remain the authoritative operational narrative for incident investigation and closure."
        backHref={`/ops/faults/${faultId}`}
      />

      <TimelineList
        items={[
          { title: "Alert opened", detail: "Packet loss threshold breached on east business uplink.", meta: "09:01" },
          { title: "Acknowledged", detail: "NOC Desk 2 took ownership and started investigation.", meta: "09:04" },
          { title: "Remote actions", detail: "CPE health checks and path validation started.", meta: "09:16" }
        ]}
      />
    </div>
  );
}

