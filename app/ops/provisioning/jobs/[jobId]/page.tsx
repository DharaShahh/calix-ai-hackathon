import { notFound } from "next/navigation";
import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { TimelineList } from "@/components/app/timeline-list";
import { getProvisioningJob } from "@/lib/data/platform";

export default async function ProvisioningJobPage({
  params
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const job = getProvisioningJob(jobId);

  if (!job) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Provisioning job"
        title={job.id}
        description="Provisioning job detail should expose validation, execution events, and failure recovery in a traceable sequence."
        backHref="/ops/provisioning"
        status={{
          label: job.status,
          tone: job.status === "Succeeded" ? "success" : job.status === "Retry Pending" ? "danger" : "warning"
        }}
      />

      <DataGrid
        columns={4}
        items={[
          { label: "Type", value: job.type },
          { label: "Template", value: job.template },
          { label: "Subscription", value: job.subscriptionId },
          { label: "Requested by", value: job.requestedBy }
        ]}
      />

      <TimelineList
        items={[
          { title: "Queued", detail: "Job entered the provisioning worker queue with full subscription context.", meta: "1" },
          { title: "Validation", detail: "Plan, template, and supported device family compatibility checked.", meta: "2" },
          { title: "Execution", detail: `Current state: ${job.status}.`, meta: "3" }
        ]}
      />
    </div>
  );
}
