import Link from "next/link";
import { Ban } from "lucide-react";
import { PublicAuthShell } from "@/components/public/public-auth-shell";

export default function AccessDeniedPage() {
  return (
    <PublicAuthShell
      eyebrow="Access control"
      title="This account does not have permission for the requested route."
      description="The platform separates staff and customer experiences and applies role-aware route control. If this screen appears unexpectedly, the assigned role or entry surface needs review."
      notes={[
        "Portal and staff surfaces are intentionally separated.",
        "Route access is governed by role and user type.",
        "Unexpected access failures usually point to account mapping or navigation issues."
      ]}
    >
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-accent">
          <Ban className="h-6 w-6" />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.16em] text-secondary">Access denied</p>
        <h2 className="mt-3 font-public-display text-3xl text-accent">Permission boundary reached</h2>
        <p className="mt-4 text-sm leading-7 text-ink/68">
          Return to the login surface or use the correct entry point for your assigned role.
        </p>
        <Link
          href="/auth/login"
          className="mt-8 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
        >
          Return to login
        </Link>
      </div>
    </PublicAuthShell>
  );
}
