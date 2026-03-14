import { ListTable } from "@/components/app/list-table";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { devices } from "@/lib/data/platform";

export default function DevicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Device management"
        title="Supported device inventory"
        description="v1 keeps the hardware matrix narrow by design. Device inventory, action history, and network linkage are structured around that constraint."
        actions={[
          { label: "Register device", href: "/ops/devices/new" },
          { label: "Templates", href: "/ops/config-templates", variant: "secondary" }
        ]}
      />

      <SectionCard title="Devices">
        <ListTable
          items={[...devices]}
          getKey={(device) => device.id}
          rowHref={(device) => `/ops/devices/${device.id}`}
          columns={[
            { key: "name", header: "Device", render: (device) => device.name },
            { key: "type", header: "Type", render: (device) => device.type },
            { key: "vendor", header: "Vendor", render: (device) => `${device.vendor} ${device.model}` },
            { key: "status", header: "Status", render: (device) => device.status },
            { key: "node", header: "Node", render: (device) => device.nodeId }
          ]}
        />
      </SectionCard>
    </div>
  );
}

