import { PageHeader } from "@/components/app/page-header";
import { TimelineList } from "@/components/app/timeline-list";

export const dynamic = "force-dynamic";

export default async function PortalSupportDetailPage({
  params
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer portal"
        title={`Ticket ${ticketId}`}
        description="Customers see a simplified timeline focused on progress, not internal operational detail."
        backHref="/portal/support"
      />

      <TimelineList
        items={[
          { title: "Request submitted", detail: "Your support request was received successfully.", meta: "Open" },
          { title: "Reviewed by support", detail: "The issue is being assessed for service impact.", meta: "In review" }
        ]}
      />
    </div>
  );
}
