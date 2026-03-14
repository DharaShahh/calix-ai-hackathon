import { PageHeader } from "@/components/app/page-header";
import { WorkflowNote } from "@/components/app/workflow-note";

export default async function UserSecurityPage({
  params
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Access control"
        title={`Security settings for ${userId}`}
        description="Only security-safe metadata should surface here. Raw passwords or password history should never be exposed."
        backHref={`/ops/users/${userId}`}
      />

      <WorkflowNote
        title="Tracked security metadata"
        items={[
          "Invite sent and accepted timestamps",
          "Password reset request and completion timestamps",
          "Last login and account lock status"
        ]}
      />
    </div>
  );
}

