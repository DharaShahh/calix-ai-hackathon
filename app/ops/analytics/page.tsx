import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { analyticsCards } from "@/lib/data/platform";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analytics"
        title="Operational analytics"
        description="v1 analytics stays operational: traffic trends, reliability, provisioning performance, and incident posture."
      />

      <DataGrid columns={4} items={[...analyticsCards]} />
    </div>
  );
}

