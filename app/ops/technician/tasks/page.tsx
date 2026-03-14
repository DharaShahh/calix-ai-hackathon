import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";

export default function TechnicianTasksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Technician lite"
        title="Assigned field tasks"
        description="This route remains intentionally light in v1: task visibility, status updates, and field notes only."
        backHref="/ops/faults"
        status={{ label: "Optional v1 slice", tone: "warning" }}
      />

      <SectionCard title="Task scope">
        <div className="space-y-4">
          {["Assigned issue context", "On-site status updates", "Resolution notes", "Return-to-NOC signal"].map(
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

