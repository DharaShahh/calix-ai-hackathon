import { notFound } from "next/navigation";
import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { TimelineList } from "@/components/app/timeline-list";
import { getCustomer, getPlan, getSubscription, provisioningJobs } from "@/lib/data/platform";
import { getCustomerById } from "@/lib/server/repositories/customers";
import { getPlanById } from "@/lib/server/repositories/plans";
import { getSubscriptionById } from "@/lib/server/repositories/subscriptions";

export default async function SubscriptionDetailPage({
  params
}: {
  params: Promise<{ subscriptionId: string }>;
}) {
  const { subscriptionId } = await params;
  const subscription = await getSubscriptionById(subscriptionId);

  if (!subscription) {
    notFound();
  }

  const [customer, plan] = await Promise.all([
    getCustomerById(subscription.customerId),
    getPlanById(subscription.planId)
  ]);
  const jobs = provisioningJobs.filter((job) => job.subscriptionId === subscription.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Subscription detail"
        title={subscription.id}
        description="This view becomes the operational bridge between support, provisioning, billing, and customer-visible service state."
        backHref="/ops/subscriptions"
        status={{
          label: subscription.status,
          tone:
            subscription.status === "Active"
              ? "success"
              : subscription.status.includes("Pending")
                ? "warning"
                : "danger"
        }}
        actions={[
          { label: "Change plan", href: `/ops/subscriptions/${subscription.id}/change-plan` },
          { label: "Billing mapping", href: `/ops/billing/mappings/${subscription.id}`, variant: "secondary" }
        ]}
      />

      <SectionCard title="Subscription summary">
        <DataGrid
          columns={4}
          items={[
            { label: "Customer", value: customer?.name ?? "Unknown" },
            { label: "Plan", value: plan?.name ?? "Unknown" },
            { label: "Speed profile", value: plan?.speed ?? "Pending" },
            { label: "Address", value: subscription.address },
            { label: "Activation", value: subscription.activationDate },
            { label: "Billing ref", value: subscription.billingRef },
            { label: "Provisioning jobs", value: String(jobs.length) },
            { label: "Portal impact", value: "Shown in self-service summary" }
          ]}
        />
      </SectionCard>

      <SectionCard title="Provisioning timeline">
        <TimelineList
          items={
            jobs.length
              ? jobs.map((job) => ({
                  title: `${job.type} job ${job.id}`,
                  detail: `${job.status} using ${job.template}. Requested by ${job.requestedBy}.`,
                  meta: job.status
                }))
              : [
                  {
                    title: "No provisioning history yet",
                    detail: "Provisioning events will appear here when activation or plan change jobs are created.",
                    meta: "Pending"
                  }
                ]
          }
        />
      </SectionCard>
    </div>
  );
}
