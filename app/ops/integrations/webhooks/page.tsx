import { PageHeader } from "@/components/app/page-header";
import { TimelineList } from "@/components/app/timeline-list";

export default function WebhooksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Integrations"
        title="Webhook and event logs"
        description="Integration event visibility becomes the operational audit layer for outbound and inbound automation."
        backHref="/ops/integrations/api-keys"
      />

      <TimelineList
        items={[
          { title: "Billing sync event", detail: "Posted account update to adapter contract successfully.", meta: "200" },
          { title: "Provisioning status callback", detail: "Job prov-002 completion event persisted to timeline.", meta: "Accepted" }
        ]}
      />
    </div>
  );
}

