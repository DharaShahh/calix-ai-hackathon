import { ListTable } from "@/components/app/list-table";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { provisioningJobs } from "@/lib/data/platform";

export default function ProvisioningPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Provisioning"
        title="Provisioning queue and job history"
        description="Provisioning remains template-driven in v1 so activation, reprovisioning, and retries stay auditable and predictable."
      />

      <SectionCard title="Provisioning jobs">
        <ListTable
          items={[...provisioningJobs]}
          getKey={(job) => job.id}
          rowHref={(job) => `/ops/provisioning/jobs/${job.id}`}
          columns={[
            { key: "job", header: "Job", render: (job) => job.id },
            { key: "type", header: "Type", render: (job) => job.type },
            { key: "status", header: "Status", render: (job) => job.status },
            { key: "template", header: "Template", render: (job) => job.template },
            { key: "owner", header: "Requested by", render: (job) => job.requestedBy }
          ]}
        />
      </SectionCard>
    </div>
  );
}

