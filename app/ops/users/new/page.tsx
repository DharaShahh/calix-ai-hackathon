import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Access control"
        title="Create staff user"
        description="Staff users are admin-created and invite-driven in v1."
        backHref="/ops/users"
        status={{ label: "Invite-based", tone: "warning" }}
      />

      <SectionCard title="Required fields">
        <div className="grid gap-4 md:grid-cols-2">
          {["Name", "Email", "Role", "Invite status", "Optional notes", "Account state"].map((item) => (
            <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

