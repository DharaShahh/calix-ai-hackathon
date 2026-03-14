import { ListTable } from "@/components/app/list-table";
import { PageHeader } from "@/components/app/page-header";
import { supportTickets } from "@/lib/data/platform";

const portalTickets = supportTickets.map((ticket) => ({
  id: ticket.id,
  subject: ticket.subject,
  status: ticket.status
}));

export default function PortalSupportPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer portal"
        title="Support"
        description="Customers get a simplified support surface: create requests, view ticket progress, and see if an issue is linked to a wider incident."
        actions={[{ label: "New request", href: "/portal/support/new" }]}
      />

      <ListTable
        items={portalTickets}
        getKey={(ticket) => ticket.id}
        rowHref={(ticket) => `/portal/support/${ticket.id}`}
        columns={[
          { key: "subject", header: "Subject", render: (ticket) => ticket.subject },
          { key: "status", header: "Status", render: (ticket) => ticket.status }
        ]}
      />
    </div>
  );
}

