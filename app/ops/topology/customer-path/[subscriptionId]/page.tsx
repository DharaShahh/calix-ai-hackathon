import { PageHeader } from "@/components/app/page-header";
import { WorkflowNote } from "@/components/app/workflow-note";

export default async function CustomerPathPage({
  params
}: {
  params: Promise<{ subscriptionId: string }>;
}) {
  const { subscriptionId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer path"
        title={`Service path for ${subscriptionId}`}
        description="This route is reserved for the simplified customer-to-network dependency view used by support and NOC."
        backHref="/ops/topology"
      />

      <WorkflowNote
        title="Planned path composition"
        items={[
          "Core or distribution node",
          "Fiber node and access equipment",
          "Linked ONT/CPE and customer service endpoint"
        ]}
      />
    </div>
  );
}

