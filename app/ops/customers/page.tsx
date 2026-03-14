import { DataGrid } from "@/components/app/data-grid";
import { ListTable } from "@/components/app/list-table";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { listCustomers } from "@/lib/server/repositories/customers";

export default async function CustomersPage() {
  const customers = await listCustomers();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Subscribers"
        title="Customer lifecycle and service visibility"
        description="This module anchors support operations: customer records, portal access, subscription state, and linked service context."
        actions={[
          { label: "Create customer", href: "/ops/customers/new" },
          { label: "Support tickets", href: "/ops/support-tickets", variant: "secondary" }
        ]}
      />

      <SectionCard
        title="Subscriber posture"
        description="A focused v1 view of activation state, billing state, portal access, and the service context needed for support-led execution."
      >
        <DataGrid
          columns={4}
          items={[
            { label: "Customer records", value: "18.4K", detail: "single-tenant operating footprint for the initial rollout" },
            { label: "Pending activations", value: "42", detail: "queue driving provisioning coordination" },
            { label: "Portal enabled", value: "91%", detail: "customers with invite or active portal access" },
            { label: "Suspended accounts", value: "1.8%", detail: "mix of billing and service-related lifecycle holds" }
          ]}
        />
      </SectionCard>

      <SectionCard title="Customer list">
        <ListTable
          items={customers}
          getKey={(customer) => customer.id}
          rowHref={(customer) => `/ops/customers/${customer.id}`}
          columns={[
            { key: "name", header: "Customer", render: (customer) => customer.name },
            { key: "account", header: "Account", render: (customer) => customer.accountNumber },
            { key: "location", header: "Location", render: (customer) => customer.location },
            { key: "status", header: "Lifecycle", render: (customer) => customer.status },
            { key: "service", header: "Service", render: (customer) => customer.serviceStatus },
            { key: "billing", header: "Billing", render: (customer) => customer.billingStatus },
            { key: "portal", header: "Portal", render: (customer) => customer.portalAccess }
          ]}
        />
      </SectionCard>
    </div>
  );
}
