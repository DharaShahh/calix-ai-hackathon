import { PageHeader } from "@/components/app/page-header";
import { WorkflowNote } from "@/components/app/workflow-note";

export default async function TechnicianTaskDetailPage({
  params
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Technician lite"
        title={`Task ${taskId}`}
        description="Task detail is intentionally constrained so it does not become a full work-order system in v1."
        backHref="/ops/technician/tasks"
      />

      <WorkflowNote
        title="Allowed technician actions"
        items={[
          "View assigned site context.",
          "Update field status: assigned, en route, on site, completed, unresolved.",
          "Submit notes and hand back to engineering or NOC."
        ]}
      />
    </div>
  );
}

