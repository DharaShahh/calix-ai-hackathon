import { ListTable } from "@/components/app/list-table";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { listCustomers } from "@/lib/server/repositories/customers";
import { listPlans } from "@/lib/server/repositories/plans";
import { listSubscriptions } from "@/lib/server/repositories/subscriptions";

export default async function SubscriptionsPage() {
  const [subscriptions, customers, plans] = await Promise.all([
    listSubscriptions(),
    listCustomers(),
    listPlans()
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Subscriptions"
        title="Service lifecycle control"
        description="Subscription records bridge customer accounts, plans, provisioning, billing references, and service assurance."
        actions={[{ label: "Create subscription", href: "/ops/customers/new" }]}
      />

      <SectionCard title="Subscription records">
        <ListTable
          items={subscriptions}
          getKey={(subscription) => subscription.id}
          rowHref={(subscription) => `/ops/subscriptions/${subscription.id}`}
          columns={[
            {
              key: "customer",
              header: "Customer",
              render: (subscription) =>
                customers.find((customer) => customer.id === subscription.customerId)?.name ?? "Unknown"
            },
            {
              key: "plan",
              header: "Plan",
              render: (subscription) =>
                plans.find((plan) => plan.id === subscription.planId)?.name ?? "Unknown"
            },
            { key: "status", header: "Status", render: (subscription) => subscription.status },
            { key: "address", header: "Address", render: (subscription) => subscription.address },
            { key: "billing", header: "Billing ref", render: (subscription) => subscription.billingRef }
          ]}
        />
      </SectionCard>
    </div>
  );
}
