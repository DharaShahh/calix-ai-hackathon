import Link from "next/link";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

const templates = [
  { id: "tpl-gpon-home-basic", name: "GPON Home Basic", scope: "ONT / Home", version: "v1.2" },
  { id: "tpl-gpon-home-plus", name: "GPON Home Plus", scope: "ONT / Home", version: "v2.0" },
  { id: "tpl-gpon-business-core", name: "GPON Business Core", scope: "ONT / Business", version: "v1.6" }
] as const;

export default function ConfigTemplatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Configuration"
        title="Configuration templates"
        description="Template-driven device operations reduce variability and are mandatory for tractable provisioning in v1."
        actions={[{ label: "Create template", href: "/ops/config-templates/new" }]}
      />

      <SectionCard title="Templates">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/ops/config-templates/${template.id}`}
              className="rounded-[24px] border border-ink/10 bg-mist/80 p-5 transition hover:border-ink/20 hover:bg-white"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-ink/45">{template.scope}</p>
              <h2 className="mt-4 font-display text-3xl text-ink">{template.name}</h2>
              <p className="mt-3 text-sm text-ink/65">{template.version}</p>
            </Link>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

