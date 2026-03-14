import { notFound } from "next/navigation";
import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { getPlanById } from "@/lib/server/repositories/plans";

export default async function PlanDetailPage({
  params
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;
  const plan = await getPlanById(planId);

  if (!plan) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Plan detail"
        title={plan.name}
        description="The plan detail page is where commercial configuration, billing codes, and technical mappings stay in sync."
        backHref="/ops/plans"
        status={{ label: plan.status, tone: "success" }}
        actions={[
          { label: "Edit plan", href: `/ops/plans/${plan.id}/edit` },
          { label: "Provisioning mapping", href: `/ops/plans/${plan.id}/provisioning-mapping`, variant: "secondary" }
        ]}
      />

      <SectionCard title="Plan definition">
        <DataGrid
          columns={4}
          items={[
            { label: "Speed profile", value: plan.speed },
            { label: "Billing code", value: plan.billingCode },
            { label: "Provisioning template", value: plan.provisioningTemplate },
            { label: "Status", value: plan.status }
          ]}
        />
      </SectionCard>
    </div>
  );
}
