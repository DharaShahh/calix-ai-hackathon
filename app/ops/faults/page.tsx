import { ListTable } from "@/components/app/list-table";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { faults } from "@/lib/data/platform";

export default function FaultsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Faults"
        title="Incident and fault management"
        description="Faults are the internal operational object for service-impacting issues. They link alerts, devices, customers, and assignment workflow."
      />

      <SectionCard title="Fault queue">
        <ListTable
          items={[...faults]}
          getKey={(fault) => fault.id}
          rowHref={(fault) => `/ops/faults/${fault.id}`}
          columns={[
            { key: "title", header: "Fault", render: (fault) => fault.title },
            { key: "severity", header: "Severity", render: (fault) => fault.severity },
            { key: "status", header: "Status", render: (fault) => fault.status },
            { key: "owner", header: "Assigned to", render: (fault) => fault.assignedTo }
          ]}
        />
      </SectionCard>
    </div>
  );
}

