import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/page-header";
import { SectionCard } from "@/components/app/section-card";
import { getCustomer } from "@/lib/data/platform";

export default async function EditCustomerPage({
  params
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;
  const customer = getCustomer(customerId);

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Subscriber workflow"
        title={`Edit ${customer.name}`}
        description="This edit route is reserved for controlled account updates by support and admin roles."
        backHref={`/ops/customers/${customer.id}`}
        status={{ label: "Form shell", tone: "warning" }}
      />

      <SectionCard title="Planned editable sections">
        <div className="grid gap-4 md:grid-cols-2">
          {["Profile", "Contact info", "Service location", "Lifecycle state", "Portal access", "Notes"].map(
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

