import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function BillingErrorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Billing"
        title="Billing error queue"
        description="Repeated sync failures should surface here for manual review without blocking the broader operator workflow."
        backHref="/ops/billing"
      />

      <SectionCard title="Error handling posture">
        <div className="space-y-4">
          {["Retry pending", "Manual review required", "Payload mismatch", "External adapter unavailable"].map(
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

