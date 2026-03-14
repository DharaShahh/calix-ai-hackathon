import { PageHeader } from "@/components/app/page-header";
import { TimelineList } from "@/components/app/timeline-list";

export default async function DeviceCommandsPage({
  params
}: {
  params: Promise<{ deviceId: string }>;
}) {
  const { deviceId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Device commands"
        title={`Command history for ${deviceId}`}
        description="Remote actions like reboot, config apply, and firmware operations should stay traceable and auditable."
        backHref={`/ops/devices/${deviceId}`}
      />

      <TimelineList
        items={[
          { title: "Template applied", detail: "Applied home-plus provisioning template to align service profile.", meta: "Success" },
          { title: "Reachability check", detail: "Periodic health command returned within expected threshold.", meta: "Healthy" }
        ]}
      />
    </div>
  );
}

