import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function NewPlanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Plan catalog"
        title="Create plan"
        description="Plan creation stays admin-controlled so billing mappings and provisioning templates remain consistent."
        backHref="/ops/plans"
        status={{ label: "Form shell", tone: "warning" }}
      />

      <SectionCard title="Required plan fields">
        <div className="grid gap-4 md:grid-cols-2">
          {["Plan name", "Speed profile", "Billing code", "Provisioning template", "Customer segment", "Commercial status"].map(
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

