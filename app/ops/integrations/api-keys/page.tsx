import { ListTable } from "@/components/app/list-table";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { apiKeys } from "@/lib/data/platform";

export default function ApiKeysPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Integrations"
        title="API keys"
        description="API and integration access is admin-controlled. v1 keeps this surface narrow and audit-friendly."
      />

      <SectionCard title="Issued keys">
        <ListTable
          items={[...apiKeys]}
          getKey={(key) => key.id}
          columns={[
            { key: "name", header: "Key", render: (key) => key.name },
            { key: "used", header: "Last used", render: (key) => key.lastUsed },
            { key: "status", header: "Status", render: (key) => key.status }
          ]}
        />
      </SectionCard>
    </div>
  );
}

