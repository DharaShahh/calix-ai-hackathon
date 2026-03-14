import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function NewDevicePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Device management"
        title="Register device"
        description="Device registration will connect the supported vendor/model matrix to topology, provisioning, and health tracking."
        backHref="/ops/devices"
        status={{ label: "Form shell", tone: "warning" }}
      />

      <SectionCard title="Required device fields">
        <div className="grid gap-4 md:grid-cols-2">
          {["Serial number", "Vendor and model", "Device type", "Management IP", "Topology node", "Customer linkage"].map(
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

