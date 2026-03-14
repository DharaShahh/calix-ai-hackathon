import { PageHeader } from "@/components/app/page-header";
import { TimelineList } from "@/components/app/timeline-list";

export default function BillingSyncEventsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Billing"
        title="Billing sync events"
        description="Sync event visibility is the operational safeguard when the billing provider is abstracted behind an adapter."
        backHref="/ops/billing"
      />

      <TimelineList
        items={[
          { title: "Subscription sync", detail: "sub-001 updated in billing adapter successfully.", meta: "Synced" },
          { title: "Activation queue", detail: "sub-002 awaiting first successful sync after provisioning completion.", meta: "Pending" }
        ]}
      />
    </div>
  );
}

