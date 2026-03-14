import { DataGrid } from "@/components/app/data-grid";
import { PageHeader } from "@/components/app/page-header";
import { USER_ROLES } from "@/lib/constants/roles";

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Access control"
        title="Roles"
        description="v1 uses a constrained role model rather than exposing fully custom policy management from the start."
        backHref="/ops/users"
      />

      <DataGrid
        columns={3}
        items={Object.values(USER_ROLES).map((role) => ({
          label: role,
          value: "Defined in centralized constants",
          detail: "Permissions stay explicit and route-safe."
        }))}
      />
    </div>
  );
}

