import { PageHeader } from "@/components/app/page-header";
import { WorkflowNote } from "@/components/app/workflow-note";

export default async function PortalAccessPage({
  params
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Portal access"
        title={`Portal access for ${customerId}`}
        description="Portal access is explicitly enabled for an existing subscriber and remains invite-based in v1."
        backHref={`/ops/customers/${customerId}`}
      />

      <WorkflowNote
        title="Portal lifecycle"
        items={[
          "Not enabled",
          "Invite sent",
          "Active portal user",
          "Locked or disabled if required"
        ]}
      />
    </div>
  );
}

