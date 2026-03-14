import { PageHeader } from "@/components/app/page-header";
import { WorkflowNote } from "@/components/app/workflow-note";

export default function PortalPlanChangeRequestPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer portal"
        title="Request a plan change"
        description="Customer plan changes stay mediated by internal operations in v1."
        backHref="/portal/plan"
        status={{ label: "Request-only", tone: "warning" }}
      />

      <WorkflowNote
        title="What happens next"
        items={[
          "Customer submits a request.",
          "Support reviews eligibility and commercial impact.",
          "Billing and provisioning are triggered internally after approval."
        ]}
      />
    </div>
  );
}

