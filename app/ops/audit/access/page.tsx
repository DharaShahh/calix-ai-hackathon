import { PageHeader } from "@/components/app/page-header";
import { TimelineList } from "@/components/app/timeline-list";

export default function AccessAuditPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Audit"
        title="Access audit"
        description="Sensitive account and role changes must remain visible for operational trust and compliance readiness."
        backHref="/ops/users"
      />

      <TimelineList
        items={[
          { title: "Role assignment changed", detail: "Engineer role granted to karthik.sen@isp.local.", meta: "Admin action" },
          { title: "Portal access enabled", detail: "Customer portal invite issued for AC-10482.", meta: "Support action" }
        ]}
      />
    </div>
  );
}

