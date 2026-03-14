import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Settings" title="Profile settings" description="User profile management stays intentionally narrow in v1." />
      <SectionCard title="Editable profile fields">
        <div className="grid gap-4 md:grid-cols-2">
          {["Display name", "Email", "Phone", "Notification preferences"].map((item) => (
            <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

