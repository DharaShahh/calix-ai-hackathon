import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function PortalProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer portal"
        title="Profile"
        description="Portal profile management stays limited to basic subscriber-owned details in v1."
      />

      <SectionCard title="Editable profile fields">
        <div className="grid gap-4 md:grid-cols-2">
          {["Contact email", "Phone number", "Notification preference", "Password update"].map((item) => (
            <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

