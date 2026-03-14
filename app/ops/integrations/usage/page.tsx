import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";

export default function IntegrationUsagePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Integrations"
        title="API usage and errors"
        description="This route will become the thin operational surface for integration traffic, failures, and usage trends."
        backHref="/ops/integrations/api-keys"
      />

      <DataGrid
        columns={4}
        items={[
          { label: "Daily requests", value: "48.2K" },
          { label: "Error rate", value: "0.4%" },
          { label: "P95 latency", value: "190 ms" },
          { label: "Active keys", value: "2" }
        ]}
      />
    </div>
  );
}

