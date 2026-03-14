import { ListTable } from "@/components/app/list-table";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { customers, supportTickets } from "@/lib/data/platform";

export default function SupportTicketsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Support"
        title="Support ticket queue"
        description="Customer-facing requests remain simpler than internal faults, but can link into incident workflows when service issues are confirmed."
      />

      <SectionCard title="Tickets">
        <ListTable
          items={[...supportTickets]}
          getKey={(ticket) => ticket.id}
          rowHref={(ticket) => `/ops/support-tickets/${ticket.id}`}
          columns={[
            { key: "subject", header: "Subject", render: (ticket) => ticket.subject },
            {
              key: "customer",
              header: "Customer",
              render: (ticket) =>
                customers.find((customer) => customer.id === ticket.customerId)?.name ?? "Unknown"
            },
            { key: "status", header: "Status", render: (ticket) => ticket.status },
            { key: "incident", header: "Linked fault", render: (ticket) => ticket.linkedFaultId ?? "None" }
          ]}
        />
      </SectionCard>
    </div>
  );
}

