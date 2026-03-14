import { notFound } from "next/navigation";
import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { getCustomer, getSupportTicket } from "@/lib/data/platform";

export default async function SupportTicketDetailPage({
  params
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;
  const ticket = getSupportTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  const customer = getCustomer(ticket.customerId);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Support ticket"
        title={ticket.subject}
        description="Support tickets provide the customer-facing lens. They can later attach to operational incidents without exposing internal fault detail directly in the portal."
        backHref="/ops/support-tickets"
        status={{ label: ticket.status, tone: ticket.status === "Linked to Incident" ? "warning" : "neutral" }}
      />

      <SectionCard title="Ticket context">
        <DataGrid
          items={[
            { label: "Ticket id", value: ticket.id },
            { label: "Customer", value: customer?.name ?? "Unknown" },
            { label: "Status", value: ticket.status },
            { label: "Linked fault", value: ticket.linkedFaultId ?? "None" }
          ]}
          columns={4}
        />
      </SectionCard>
    </div>
  );
}

