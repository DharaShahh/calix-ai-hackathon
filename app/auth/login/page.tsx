import Link from "next/link";
import { redirect } from "next/navigation";
import { Building2, LockKeyhole, Mail, MoveRight } from "lucide-react";
import { SearchMessage } from "@/components/app/search-message";
import { PublicAuthShell } from "@/components/public/public-auth-shell";
import { signInAction } from "@/app/auth/actions";
import { getAppSession } from "@/lib/auth/session";

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<{ message?: string; type?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const session = await getAppSession();

  if (session) {
    redirect(session.userType === "customer" ? "/portal" : "/ops");
  }

  return (
    <PublicAuthShell
      eyebrow="Secure platform access"
      title="Sign in to the broadband operations platform."
      description="This shared access layer is used by internal staff and customer portal users. Identity stays controlled, invite-driven, and scoped to the right operational surface."
      notes={[
        "Staff access is role-aware across support, engineering, NOC, and admin workflows.",
        "Customer access remains read-heavy and limited to self-scoped service visibility.",
        "Authentication is backed by Supabase with separate operational and portal routing."
      ]}
    >
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-3 text-accent">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-secondary">Login</p>
            <h2 className="mt-1 font-display text-3xl text-accent">Platform sign in</h2>
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-ink/68">
          Use one of the provisioned accounts to enter the system. Staff users route to the
          operations console, while customers route to the portal.
        </p>
      </div>

      <form className="space-y-4">
        <SearchMessage message={params?.message} type={params?.type} />
        <label className="block rounded-2xl border border-border bg-surface px-4 py-3">
          <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-secondary">
            <Mail className="h-4 w-4" />
            Email
          </span>
          <input
            name="email"
            className="w-full border-none bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
            placeholder="operator@isp.example"
            type="email"
          />
        </label>

        <label className="block rounded-2xl border border-border bg-surface px-4 py-3">
          <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-secondary">
            <LockKeyhole className="h-4 w-4" />
            Password
          </span>
          <input
            name="password"
            className="w-full border-none bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
            placeholder="Enter your password"
            type="password"
          />
        </label>

        <button
          formAction={signInAction}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Continue
          <MoveRight className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-ink/60">
        <Link href="/auth/forgot-password" className="font-medium text-ink transition hover:text-accent">
          Forgot password
        </Link>
        <Link href="/" className="font-medium text-ink transition hover:text-accent">
          Back to site
        </Link>
        <Link href="/portal" className="font-medium text-ink transition hover:text-accent">
          Open portal
        </Link>
      </div>
    </PublicAuthShell>
  );
}
