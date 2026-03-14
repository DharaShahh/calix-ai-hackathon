import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function NewConfigTemplatePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Configuration"
        title="Create configuration template"
        description="This route will back controlled template authoring for the narrow supported device set."
        backHref="/ops/config-templates"
        status={{ label: "Form shell", tone: "warning" }}
      />

      <SectionCard title="Template metadata">
        <div className="grid gap-4 md:grid-cols-2">
          {["Template name", "Device family", "Version", "Template body reference", "Validation notes", "Release state"].map(
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

