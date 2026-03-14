import { notFound } from "next/navigation";
import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { getTopologyLink } from "@/lib/data/platform";

export default async function TopologyLinkPage({
  params
}: {
  params: Promise<{ linkId: string }>;
}) {
  const { linkId } = await params;
  const link = getTopologyLink(linkId);

  if (!link) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Topology link"
        title={link.id}
        description="Link detail keeps capacity and health visible without overbuilding a digital twin in v1."
        backHref="/ops/topology"
      />

      <DataGrid
        columns={4}
        items={[
          { label: "Source", value: link.source },
          { label: "Target", value: link.target },
          { label: "Capacity", value: link.capacity },
          { label: "Status", value: link.status }
        ]}
      />
    </div>
  );
}

