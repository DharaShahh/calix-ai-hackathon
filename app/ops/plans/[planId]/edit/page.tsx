import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default async function EditPlanPage({
  params
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Plan catalog"
        title={`Edit ${planId}`}
        description="Edits here should remain tightly controlled because they affect provisioning and billing consistency."
        backHref={`/ops/plans/${planId}`}
        status={{ label: "Form shell", tone: "warning" }}
      />

      <SectionCard title="Editable sections">
        <div className="grid gap-4 md:grid-cols-2">
          {["Commercial metadata", "Speed profile", "Billing codes", "Provisioning mapping", "Lifecycle state", "Notes"].map(
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

