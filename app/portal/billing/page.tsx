import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { PORTAL_SUMMARY } from "@/lib/data/mock";

export default function PortalBillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer portal"
        title="Billing"
        description="Portal billing shows adapter-supplied status and history, not a native billing engine."
      />

      <DataGrid
        columns={3}
        items={[
          { label: "Billing status", value: PORTAL_SUMMARY.billingStatus },
          { label: "Last payment", value: "05 Mar 2026" },
          { label: "Data source", value: "Billing adapter snapshot" }
        ]}
      />
    </div>
  );
}

