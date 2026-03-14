import { PageHeader } from "@/components/app/page-header";
import { WorkflowNote } from "@/components/app/workflow-note";

export default function SettingsSecurityPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Settings" title="Security settings" description="Security surfaces should expose only safe metadata and self-service controls." />
      <WorkflowNote
        title="Available controls"
        items={[
          "Change password",
          "View last login metadata",
          "Review invite and reset history",
          "Future MFA configuration"
        ]}
      />
    </div>
  );
}

