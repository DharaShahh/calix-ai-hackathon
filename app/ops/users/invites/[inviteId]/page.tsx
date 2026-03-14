import { PageHeader } from "@/components/app/page-header";
import { WorkflowNote } from "@/components/app/workflow-note";

export default async function InviteDetailPage({
  params
}: {
  params: Promise<{ inviteId: string }>;
}) {
  const { inviteId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Access control"
        title={`Invite ${inviteId}`}
        description="Invite detail should expose token lifecycle, expiry, resend history, and acceptance state."
        backHref="/ops/users/invites"
      />

      <WorkflowNote
        title="Invite lifecycle"
        items={[
          "Created and sent",
          "Resent if necessary",
          "Accepted or expired",
          "Converted into active account"
        ]}
      />
    </div>
  );
}

