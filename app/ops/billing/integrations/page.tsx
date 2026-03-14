import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function BillingIntegrationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Billing"
        title="Billing integrations"
        description="The first implementation uses a provider-agnostic adapter contract with mock or manual connectors."
        backHref="/ops/billing"
      />

      <SectionCard title="Adapter contract">
        <div className="grid gap-4 md:grid-cols-2">
          {["createAccount", "updateSubscription", "fetchStatus", "fetchHistory"].map((item) => (
            <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 font-mono text-sm text-ink/72">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

