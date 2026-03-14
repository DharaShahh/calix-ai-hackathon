import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function NewLocationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Service location"
        title="Add service location"
        description="Service locations attach a subscriber to a physical address and later become the provisioning and topology context."
        backHref="/ops/customers"
        status={{ label: "Workflow shell", tone: "warning" }}
      />

      <SectionCard title="Location data model">
        <div className="grid gap-4 md:grid-cols-2">
          {["Address lines", "City and postal code", "Geocoordinates", "Coverage/serviceability", "Linked subscription", "Install notes"].map(
            (item) => (
              <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
                {item}
              </div>
            )
          )}
        </div>
      </SectionCard>
    </div>
  );
}

