import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Billing visibility"
        title="Billing integration surface"
        description="Billing remains provider-agnostic in v1. The platform shows mappings, sync events, and customer billing state without becoming a native billing engine."
        actions={[
          { label: "Integrations", href: "/ops/billing/integrations" },
          { label: "Sync events", href: "/ops/billing/sync-events", variant: "secondary" }
        ]}
      />

      <DataGrid
        columns={4}
        items={[
          { label: "Adapter mode", value: "Mock / Manual" },
          { label: "Sync health", value: "99.2%" },
          { label: "Mappings ready", value: "96%" },
          { label: "Native billing", value: "Out of scope" }
        ]}
      />

      <SectionCard title="v1 billing boundaries">
        <div className="space-y-4">
          {[
            "Expose customer billing status and history summaries.",
            "Store mapping and sync state for subscriptions.",
            "Do not implement invoices, payments, taxes, or collections."
          ].map((item) => (
            <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

