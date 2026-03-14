import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default async function ConfigTemplateDetailPage({
  params
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Configuration"
        title={templateId}
        description="Template detail combines metadata, intended device scope, and release history."
        backHref="/ops/config-templates"
      />

      <SectionCard title="Template overview">
        <div className="space-y-4">
          {["Versioned metadata", "Supported device mapping", "Release notes and audit trail"].map((item) => (
            <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
