import { PageHeader } from "@/components/app/page-header";
import { TimelineList } from "@/components/app/timeline-list";

export default function UserInvitesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Access control"
        title="Invites"
        description="Invite state provides the controlled v1 path for staff account creation."
        backHref="/ops/users"
      />

      <TimelineList
        items={[
          { title: "Maya Pillai invited", detail: "Customer Support role assigned. Awaiting invite acceptance.", meta: "Invited" },
          { title: "Anika Rao accepted", detail: "Admin account activated successfully.", meta: "Accepted" }
        ]}
      />
    </div>
  );
}

