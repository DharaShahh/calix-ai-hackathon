import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default async function ProvisioningTemplateDetailPage({
  params
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Provisioning"
        title={templateId}
        description="Template detail will later expose compatibility, versioning, and rollout history."
        backHref="/ops/provisioning/templates"
      />

      <SectionCard title="Template concerns">
        <div className="space-y-4">
          {["Compatible plans", "Supported device models", "Validation rules", "Version history"].map((item) => (
            <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

