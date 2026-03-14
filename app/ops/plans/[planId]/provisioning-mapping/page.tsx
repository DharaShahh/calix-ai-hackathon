import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default async function PlanMappingPage({
  params
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Plan mapping"
        title={`Provisioning mapping for ${planId}`}
        description="This route links commercial plans to the narrow supported provisioning template matrix."
        backHref={`/ops/plans/${planId}`}
        status={{ label: "Critical config", tone: "warning" }}
      />

      <SectionCard title="Mapping requirements">
        <div className="space-y-4">
          {[
            "Provisioning template per supported device family",
            "Speed and QoS profile compatibility",
            "Billing code consistency with external adapter mappings"
          ].map((item) => (
            <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

