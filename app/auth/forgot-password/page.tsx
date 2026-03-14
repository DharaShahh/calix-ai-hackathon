import Link from "next/link";
import { Mail, MoveRight, ShieldCheck } from "lucide-react";
import { SearchMessage } from "@/components/app/search-message";
import { PublicAuthShell } from "@/components/public/public-auth-shell";
import { forgotPasswordAction } from "@/app/auth/actions";

export default async function ForgotPasswordPage({
  searchParams
}: {
  searchParams?: Promise<{ message?: string; type?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;

  return (
    <PublicAuthShell
      eyebrow="Account recovery"
      title="Recover access without breaking the account lifecycle."
      description="Password reset remains part of the controlled access model. Recovery links are sent through the shared authentication surface and later feed back into the same role-aware routes."
      notes={[
        "Recovery is available for both staff and customer accounts.",
        "Access remains invite-driven even when credentials are reset.",
        "Operational permissions are not changed by the reset flow."
      ]}
    >
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-3 text-accent">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-secondary">Recovery</p>
            <h2 className="mt-1 font-public-display text-3xl text-accent">Forgot password</h2>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-ink/68">
          Enter the email tied to your account and the recovery flow will send the next step.
        </p>
      </div>

      <form className="rounded-[28px] border border-border bg-surface p-6">
        <SearchMessage message={params?.message} type={params?.type} />
        <label className="block rounded-2xl border border-border bg-elevated px-4 py-4">
          <span className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-secondary">
            <Mail className="h-4 w-4" />
            Email
          </span>
          <input
            className="w-full border-none bg-transparent outline-none"
            name="email"
            placeholder="name@example.com"
            type="email"
          />
        </label>
        <button
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
          formAction={forgotPasswordAction}
        >
          Send reset link
          <MoveRight className="h-4 w-4" />
        </button>
      </form>

      <Link href="/auth/login" className="mt-6 inline-block text-sm font-semibold text-ink/70 transition hover:text-accent">
        Back to login
      </Link>
    </PublicAuthShell>
  );
}
