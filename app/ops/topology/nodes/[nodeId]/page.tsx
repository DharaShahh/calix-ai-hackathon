import { notFound } from "next/navigation";
import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { getTopologyNode } from "@/lib/data/platform";

export default async function TopologyNodePage({
  params
}: {
  params: Promise<{ nodeId: string }>;
}) {
  const { nodeId } = await params;
  const node = getTopologyNode(nodeId);

  if (!node) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Topology node"
        title={node.name}
        description="Node detail will link health overlays, downstream devices, and impacted subscribers."
        backHref="/ops/topology"
      />

      <DataGrid
        columns={3}
        items={[
          { label: "Node type", value: node.type },
          { label: "Status", value: node.status },
          { label: "Scope", value: "Operational topology only" }
        ]}
      />
    </div>
  );
}

