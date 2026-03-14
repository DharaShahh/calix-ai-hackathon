import Link from "next/link";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { topologyLinks, topologyNodes } from "@/lib/data/platform";

export default function TopologyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Topology"
        title="Operational network map"
        description="The topology view is intentionally operational, not GIS-heavy. It links nodes, links, devices, and subscriber paths needed for troubleshooting."
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Nodes">
          <div className="grid gap-4 md:grid-cols-2">
            {topologyNodes.map((node) => (
              <Link
                key={node.id}
                href={`/ops/topology/nodes/${node.id}`}
                className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 transition hover:border-ink/20 hover:bg-white"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-ink/45">{node.type}</p>
                <h2 className="mt-4 font-display text-3xl text-ink">{node.name}</h2>
                <p className="mt-3 text-sm text-ink/65">{node.status}</p>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Links">
          <div className="space-y-4">
            {topologyLinks.map((link) => (
              <Link
                key={link.id}
                href={`/ops/topology/links/${link.id}`}
                className="block rounded-[22px] border border-ink/10 bg-mist/80 p-5 transition hover:border-ink/20 hover:bg-white"
              >
                <p className="text-sm font-semibold text-ink">{link.id}</p>
                <p className="mt-2 text-sm leading-7 text-ink/68">
                  {link.source} to {link.target} · {link.capacity} · {link.status}
                </p>
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

