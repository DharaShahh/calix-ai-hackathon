import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function PortalSupportNewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer portal"
        title="New support request"
        description="Portal support requests stay simple and may later be linked to internal incidents."
        backHref="/portal/support"
      />

      <SectionCard title="Planned request fields">
        <div className="grid gap-4 md:grid-cols-2">
          {["Category", "Issue summary", "Detailed description", "Preferred callback", "Attachment support later", "Consent and submission"].map(
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

