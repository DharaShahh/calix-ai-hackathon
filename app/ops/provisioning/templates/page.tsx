import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function ProvisioningTemplatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Provisioning"
        title="Provisioning templates"
        description="Templates are versioned workflow definitions that turn plan and device compatibility into a controlled activation path."
        backHref="/ops/provisioning"
      />

      <SectionCard title="Template strategy">
        <div className="space-y-4">
          {[
            "Map each supported plan to a supported device family.",
            "Version templates instead of mutating them in place.",
            "Keep retry and failure reasons visible to support and engineering."
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

