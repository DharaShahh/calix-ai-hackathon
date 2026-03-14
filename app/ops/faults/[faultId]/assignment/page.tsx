import { PageHeader } from "@/components/app/page-header";
import { WorkflowNote } from "@/components/app/workflow-note";

export default async function FaultAssignmentPage({
  params
}: {
  params: Promise<{ faultId: string }>;
}) {
  const { faultId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Fault assignment"
        title={`Assignment for ${faultId}`}
        description="NOC owns assignment flow in v1, with optional escalation into technician-lite when field work is required."
        backHref={`/ops/faults/${faultId}`}
      />

      <WorkflowNote
        title="Assignment path"
        items={[
          "Acknowledge and assign to NOC or engineering owner.",
          "Escalate to technician-lite only when remote resolution is not enough.",
          "Keep assignment changes visible in the fault timeline and audit logs."
        ]}
      />
    </div>
  );
}

