import { PageHeader } from "@/components/app/page-header";
import { WorkflowNote } from "@/components/app/workflow-note";

export default function PortalActivatePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Portal activation"
        title="Activate customer portal account"
        description="Portal activation converts an invite into an authenticated customer account with self-scoped access."
        backHref="/portal"
      />

      <WorkflowNote
        title="Activation path"
        items={[
          "Validate invite token",
          "Set password",
          "Bind portal user to customer account",
          "Transition account to active"
        ]}
      />
    </div>
  );
}

