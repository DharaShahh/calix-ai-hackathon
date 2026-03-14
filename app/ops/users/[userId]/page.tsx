import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default async function UserDetailPage({
  params
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Access control"
        title={`User ${userId}`}
        description="User detail will show role assignments, invite history, and account status controls."
        backHref="/ops/users"
        actions={[{ label: "Security", href: `/ops/users/${userId}/security`, variant: "secondary" }]}
      />

      <SectionCard title="User detail scope">
        <div className="space-y-4">
          {["Profile metadata", "Role assignments", "Invite lifecycle", "Account status history"].map((item) => (
            <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

