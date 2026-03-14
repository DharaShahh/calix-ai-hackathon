import { PageHeader } from "@/components/app/page-header";
import { WorkflowNote } from "@/components/app/workflow-note";

export default async function BillingMappingPage({
  params
}: {
  params: Promise<{ subscriptionId: string }>;
}) {
  const { subscriptionId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Billing mapping"
        title={`Billing mapping for ${subscriptionId}`}
        description="Subscription-to-billing mappings need to stay explicit because v1 uses an adapter layer rather than a native billing engine."
        backHref="/ops/billing"
      />

      <WorkflowNote
        title="Mapping fields"
        items={[
          "External account reference",
          "External subscription reference",
          "Billing status snapshot",
          "Last sync state and timestamp"
        ]}
      />
    </div>
  );
}

