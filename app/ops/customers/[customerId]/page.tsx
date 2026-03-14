import { notFound } from "next/navigation";
import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { TimelineList } from "@/components/app/timeline-list";
import { supportTickets } from "@/lib/data/platform";
import { getCustomerById } from "@/lib/server/repositories/customers";
import { getPlanById } from "@/lib/server/repositories/plans";
import { getSubscriptionById } from "@/lib/server/repositories/subscriptions";

export default async function CustomerDetailPage({
  params
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  const customer = await getCustomerById(customerId);

  if (!customer) {
    notFound();
  }

  const [plan, subscription] = await Promise.all([
    customer.planId ? getPlanById(customer.planId) : Promise.resolve(null),
    customer.subscriptionId ? getSubscriptionById(customer.subscriptionId) : Promise.resolve(null)
  ]);
  const tickets = supportTickets.filter((ticket) => ticket.customerId === customer.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer detail"
        title={customer.name}
        description={`Account ${customer.accountNumber} with ${customer.status.toLowerCase()} lifecycle state, ${customer.portalAccess.toLowerCase()} portal access, and service visibility for support and engineering.`}
        backHref="/ops/customers"
        status={{
          label: customer.status,
          tone:
            customer.status === "Active"
              ? "success"
              : customer.status === "Pending Activation"
                ? "warning"
                : "danger"
        }}
        actions={[
          { label: "Edit account", href: `/ops/customers/${customer.id}/edit` },
          { label: "Portal access", href: `/ops/customers/${customer.id}/portal-access`, variant: "secondary" }
        ]}
      />

      <SectionCard title="Account summary">
        <DataGrid
          columns={4}
          items={[
            { label: "Email", value: customer.email },
            { label: "Phone", value: customer.phone },
            { label: "Service location", value: customer.location },
            { label: "Billing status", value: customer.billingStatus },
            { label: "Portal access", value: customer.portalAccess },
            { label: "Plan", value: plan?.name ?? "Unassigned" },
            { label: "Speed profile", value: plan?.speed ?? "Pending" },
            { label: "Subscription state", value: subscription?.status ?? "Pending" }
          ]}
        />
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Subscription and support context">
          <TimelineList
            items={[
              {
                title: "Subscription linked",
                detail: subscription
                  ? `${subscription.id} at ${subscription.address}`
                  : "Subscription not created yet",
                meta: subscription?.status ?? "Pending"
              },
              {
                title: "Portal posture",
                detail: `${customer.portalAccess} access with invite-based lifecycle control.`,
                meta: "Portal"
              },
              {
                title: "Active support threads",
                detail:
                  tickets.length > 0
                    ? `${tickets.length} support ticket(s) currently attached to the customer account.`
                    : "No open customer-facing support requests.",
                meta: "Support"
              }
            ]}
          />
        </SectionCard>

        <SectionCard title="Next intended actions">
          <div className="space-y-4">
            {[
              "Route into subscription detail for plan change, provisioning, and billing-linked state.",
              "Expose device linkage and service path once the device and topology slices are connected.",
              "Keep customer-facing status summaries narrower than internal fault and alert objects."
            ].map((item) => (
              <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/68">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
