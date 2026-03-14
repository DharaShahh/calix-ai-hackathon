import { LockKeyhole, ShieldCheck } from "lucide-react";
import { SearchMessage } from "@/components/app/search-message";
import { PublicAuthShell } from "@/components/public/public-auth-shell";
import { updatePasswordAction } from "@/app/auth/actions";

export default async function ResetPasswordPage({
  searchParams
}: {
  searchParams?: Promise<{ message?: string; type?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;

  return (
    <PublicAuthShell
      eyebrow="Credential update"
      title="Reset credentials and return to the right workflow."
      description="This step updates credentials while preserving the same account scope, role mapping, and route behavior already assigned to the user."
      notes={[
        "Role access remains unchanged after password updates.",
        "Portal and staff users share the same secure reset surface.",
        "The result feeds directly back into the existing authentication flow."
      ]}
    >
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-3 text-accent">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-secondary">Reset</p>
            <h2 className="mt-1 font-public-display text-3xl text-accent">Set a new password</h2>
          </div>
        </div>
      </div>

      <form className="space-y-4">
        <SearchMessage message={params?.message} type={params?.type} />
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block rounded-2xl border border-border bg-surface px-4 py-4">
            <span className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-secondary">
              <LockKeyhole className="h-4 w-4" />
              New password
            </span>
            <input className="w-full border-none bg-transparent outline-none" name="password" type="password" />
          </label>
          <label className="block rounded-2xl border border-border bg-surface px-4 py-4">
            <span className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-secondary">
              <LockKeyhole className="h-4 w-4" />
              Confirm password
            </span>
            <input
              className="w-full border-none bg-transparent outline-none"
              name="confirmPassword"
              type="password"
            />
          </label>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
          formAction={updatePasswordAction}
        >
          Update password
        </button>
      </form>
    </PublicAuthShell>
  );
}
