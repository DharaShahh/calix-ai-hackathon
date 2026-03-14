import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default async function LocationDetailPage({
  params
}: {
  params: Promise<{ locationId: string }>;
}) {
  const { locationId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Service location"
        title={`Location ${locationId}`}
        description="A dedicated service location view will combine address data, linked subscription state, and network path context."
        backHref="/ops/customers"
        status={{ label: "Ready for schema wiring", tone: "warning" }}
      />

      <SectionCard title="Location scope">
        <div className="space-y-4">
          {[
            "Customer and subscription linkage",
            "Provisioning readiness and topology anchor",
            "Coverage, installation, and access notes"
          ].map((item) => (
            <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

