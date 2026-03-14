import { PageHeader } from "@/components/app/page-header";
import { WorkflowNote } from "@/components/app/workflow-note";

export default function PortalChangePasswordPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer portal"
        title="Change password"
        description="Password changes should remain self-service while keeping security metadata tracked safely."
        backHref="/portal/profile"
      />

      <WorkflowNote
        title="Security expectations"
        items={[
          "No raw password history in app data.",
          "Track reset and change timestamps safely.",
          "Preserve invite and activation lifecycle metadata."
        ]}
      />
    </div>
  );
}
