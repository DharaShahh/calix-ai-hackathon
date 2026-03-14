import { notFound } from "next/navigation";
import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { getCustomer, getDevice } from "@/lib/data/platform";

export default async function DeviceDetailPage({
  params
}: {
  params: Promise<{ deviceId: string }>;
}) {
  const { deviceId } = await params;
  const device = getDevice(deviceId);

  if (!device) {
    notFound();
  }

  const customer = device.customerId ? getCustomer(device.customerId) : null;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Device detail"
        title={device.name}
        description="Remote operations, topology placement, provisioning readiness, and service assurance all converge here."
        backHref="/ops/devices"
        status={{ label: device.status, tone: device.status === "Reachable" ? "success" : "danger" }}
        actions={[
          { label: "Command history", href: `/ops/devices/${device.id}/commands` },
          { label: "Metrics", href: `/ops/devices/${device.id}/metrics`, variant: "secondary" }
        ]}
      />

      <SectionCard title="Device summary">
        <DataGrid
          columns={4}
          items={[
            { label: "Type", value: device.type },
            { label: "Vendor", value: device.vendor },
            { label: "Model", value: device.model },
            { label: "Management IP", value: device.ip },
            { label: "Topology node", value: device.nodeId },
            { label: "Customer linkage", value: customer?.name ?? "Core infrastructure" },
            { label: "Operational status", value: device.status },
            { label: "Scope", value: "v1 supported matrix" }
          ]}
        />
      </SectionCard>
    </div>
  );
}

