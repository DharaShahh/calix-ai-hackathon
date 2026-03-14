import { PageHeader } from "@/components/app/page-header";
import { TimelineList } from "@/components/app/timeline-list";
import { OPS_TIMELINE } from "@/lib/data/mock";

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dashboard activity"
        title="Recent platform activity"
        description="This route captures the live operational thread behind the dashboard."
        backHref="/ops"
      />
      <TimelineList
        items={OPS_TIMELINE.map((event) => ({
          title: event.title,
          detail: event.detail,
          meta: event.time
        }))}
      />
    </div>
  );
}

