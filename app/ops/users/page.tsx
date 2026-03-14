import { ListTable } from "@/components/app/list-table";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { staffUsers } from "@/lib/data/platform";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Access control"
        title="Staff users"
        description="Staff access remains invite-based in v1. Roles and account status need to stay visible and controlled."
        actions={[
          { label: "Create user", href: "/ops/users/new" },
          { label: "Invites", href: "/ops/users/invites", variant: "secondary" }
        ]}
      />

      <SectionCard title="Users">
        <ListTable
          items={[...staffUsers]}
          getKey={(user) => user.id}
          rowHref={(user) => `/ops/users/${user.id}`}
          columns={[
            { key: "name", header: "Name", render: (user) => user.name },
            { key: "email", header: "Email", render: (user) => user.email },
            { key: "role", header: "Role", render: (user) => user.role },
            { key: "status", header: "Status", render: (user) => user.status }
          ]}
        />
      </SectionCard>
    </div>
  );
}

