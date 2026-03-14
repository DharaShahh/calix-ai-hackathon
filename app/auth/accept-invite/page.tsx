import { UserCheck } from "lucide-react";
import { PublicAuthShell } from "@/components/public/public-auth-shell";

export default function AcceptInvitePage() {
  return (
    <PublicAuthShell
      eyebrow="Invite onboarding"
      title="Complete account setup through the controlled invite flow."
      description="Staff and portal accounts are activated through invites in v1. This keeps access deliberate, auditable, and scoped to the correct surface from the first login."
      notes={[
        "Invite acceptance is the default path for new access.",
        "Account activation is separated from public self-signup.",
        "Permissions and routing are attached before the first session begins."
      ]}
    >
      <p className="text-xs uppercase tracking-[0.16em] text-secondary">Invite</p>
      <h2 className="mt-3 font-public-display text-3xl text-accent">Accept invite</h2>
      <p className="mt-4 text-sm leading-7 text-ink/68">
        This route will validate the invite token, allow the user to set credentials, and transition
        the account into an active state.
      </p>

      <div className="mt-8 rounded-[28px] border border-border bg-surface p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-accent/15 p-3 text-accent">
            <UserCheck className="h-5 w-5" />
          </div>
          <p className="text-sm leading-7 text-ink/72">
            Invite-based onboarding is used for both staff users and portal-linked subscribers in the current release.
          </p>
        </div>
      </div>
    </PublicAuthShell>
  );
}
