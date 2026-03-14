import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { WorkflowNote } from "@/components/app/workflow-note";

export default async function ChangePlanPage({
  params
}: {
  params: Promise<{ subscriptionId: string }>;
}) {
  const { subscriptionId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Plan change"
        title={`Request change for ${subscriptionId}`}
        description="Customer plan changes remain request-driven in v1. Support or admin initiates the change, then provisioning and billing follow through controlled workflows."
        backHref={`/ops/subscriptions/${subscriptionId}`}
        status={{ label: "Request-driven", tone: "warning" }}
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Planned form inputs">
          <div className="grid gap-4 md:grid-cols-2">
            {["Current plan", "Requested plan", "Effective date", "Approval notes", "Billing impact", "Provisioning mapping"].map(
              (item) => (
                <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
                  {item}
                </div>
              )
            )}
          </div>
        </SectionCard>

        <WorkflowNote
          title="Workflow constraints"
          items={[
            "No autonomous customer-triggered reprovisioning in v1.",
            "Billing and provisioning must both confirm compatibility before activation.",
            "Customer portal raises requests; staff executes the change."
          ]}
        />
      </div>
    </div>
  );
}
