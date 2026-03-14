import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function SettingsPlatformPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Platform settings"
        description="This route is reserved for admin-managed system-level settings, refresh intervals, branding, and integration toggles."
      />

      <SectionCard title="System-level config">
        <div className="grid gap-4 md:grid-cols-2">
          {["Dashboard refresh defaults", "Branding tokens", "Alert severity labels", "Billing adapter mode", "Supported device matrix", "Portal defaults"].map(
            (item) => (
              <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
                {item}
              </div>
            )
          )}
        </div>
      </SectionCard>
    </div>
  );
}
