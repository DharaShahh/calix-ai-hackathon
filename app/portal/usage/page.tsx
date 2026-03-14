import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { PORTAL_SUMMARY } from "@/lib/data/mock";

export default function PortalUsagePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer portal"
        title="Usage"
        description="Portal usage remains summary-oriented and should not query raw operational analytics directly."
      />

      <DataGrid
        columns={3}
        items={[
          { label: "Current cycle", value: PORTAL_SUMMARY.usage },
          { label: "Peak window", value: "19:00 - 22:00" },
          { label: "Trend", value: "+6% vs last cycle" }
        ]}
      />
    </div>
  );
}

