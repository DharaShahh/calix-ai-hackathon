import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default async function RoleDetailPage({
  params
}: {
  params: Promise<{ roleId: string }>;
}) {
  const { roleId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Access control"
        title={`Role ${roleId}`}
        description="Role detail will later bind route access, record scope, and allowed actions."
        backHref="/ops/roles"
      />

      <SectionCard title="Role model">
        <div className="space-y-4">
          {["Module visibility", "Record scope", "Allowed actions", "Audit expectations"].map((item) => (
            <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

