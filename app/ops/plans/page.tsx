import { ListTable } from "@/components/app/list-table";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { listPlans } from "@/lib/server/repositories/plans";

export default async function PlansPage() {
  const servicePlans = await listPlans();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Plan catalog"
        title="Service plans and provisioning mappings"
        description="Plans are a controlled catalog in v1. They bridge subscriber offerings, billing codes, and provisioning templates."
        actions={[{ label: "Create plan", href: "/ops/plans/new" }]}
      />

      <SectionCard title="Service plans">
        <ListTable
          items={servicePlans}
          getKey={(plan) => plan.id}
          rowHref={(plan) => `/ops/plans/${plan.id}`}
          columns={[
            { key: "name", header: "Plan", render: (plan) => plan.name },
            { key: "speed", header: "Profile", render: (plan) => plan.speed },
            { key: "billing", header: "Billing code", render: (plan) => plan.billingCode },
            { key: "template", header: "Provisioning template", render: (plan) => plan.provisioningTemplate },
            { key: "status", header: "Status", render: (plan) => plan.status }
          ]}
        />
      </SectionCard>
    </div>
  );
}
