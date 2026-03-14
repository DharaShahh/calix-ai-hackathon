import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { WorkflowNote } from "@/components/app/workflow-note";

export default function NewCustomerPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Subscribers"
        title="Create customer"
        description="V1 keeps customer creation support-led. This workflow will later connect to schema-backed forms, portal access enablement, and subscription setup."
        backHref="/ops/customers"
        status={{ label: "Workflow shell", tone: "warning" }}
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Intended form sections">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Profile details",
              "Primary contact",
              "Service location",
              "Portal access preference",
              "Initial plan assignment",
              "Billing reference mapping"
            ].map((item) => (
              <div key={item} className="rounded-[22px] border border-ink/10 bg-mist/80 p-5 text-sm leading-7 text-ink/70">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>

        <WorkflowNote
          title="Execution notes"
          items={[
            "Support owns customer creation in v1.",
            "Portal access stays invite-driven, not public signup.",
            "Subscription and provisioning follow after the customer record is created."
          ]}
        />
      </div>
    </div>
  );
}

