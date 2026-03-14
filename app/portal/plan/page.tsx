import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { PORTAL_SUMMARY } from "@/lib/data/mock";

export default function PortalPlanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer portal"
        title="My plan"
        description="The portal exposes plan context and request-based change flows without giving direct control over provisioning."
      />

      <DataGrid
        columns={3}
        items={[
          { label: "Current plan", value: PORTAL_SUMMARY.planName },
          { label: "Commercial posture", value: "Active plan" },
          { label: "Change flow", value: "Request only" }
        ]}
      />
    </div>
  );
}

