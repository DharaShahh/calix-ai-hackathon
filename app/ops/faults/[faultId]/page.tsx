import { notFound } from "next/navigation";
import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { getCustomer, getFault } from "@/lib/data/platform";

export default async function FaultDetailPage({
  params
}: {
  params: Promise<{ faultId: string }>;
}) {
  const { faultId } = await params;
  const fault = getFault(faultId);

  if (!fault) {
    notFound();
  }

  const customer = fault.customerId ? getCustomer(fault.customerId) : null;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Fault detail"
        title={fault.title}
        description="Fault detail is where NOC and engineering align on ownership, resolution progress, and customer impact."
        backHref="/ops/faults"
        status={{ label: fault.severity, tone: fault.severity === "Critical" ? "danger" : "warning" }}
        actions={[
          { label: "Assignment", href: `/ops/faults/${fault.id}/assignment` },
          { label: "Timeline", href: `/ops/faults/${fault.id}/timeline`, variant: "secondary" }
        ]}
      />

      <SectionCard title="Impact summary">
        <DataGrid
          columns={4}
          items={[
            { label: "Status", value: fault.status },
            { label: "Assigned to", value: fault.assignedTo },
            { label: "Customer", value: customer?.name ?? "Network-wide" },
            { label: "Device", value: fault.deviceId ?? "Not attached" }
          ]}
        />
      </SectionCard>
    </div>
  );
}

