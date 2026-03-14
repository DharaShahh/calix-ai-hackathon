import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CreditCard,
  Network,
  RadioTower,
  Router,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { getAppSession } from "@/lib/auth/session";
import { APP_CONFIG } from "@/lib/constants/app-config";
import { PublicHeader } from "@/components/public/public-header";

const solutionCards = [
  {
    title: "Subscriber lifecycle management",
    description: "Onboard customers, assign plans, activate services, and maintain a clear service record from one console.",
    icon: UsersRound
  },
  {
    title: "Provisioning workflows",
    description: "Run template-driven service activation with trackable states, retries, and change controls.",
    icon: RadioTower
  },
  {
    title: "Monitoring and fault response",
    description: "Keep service quality, incidents, and customer impact tied to the same operational context.",
    icon: BarChart3
  }
] as const;

const customerTypes = [
  {
    title: "Regional fiber ISPs",
    detail: "A practical platform for operators that need to move away from spreadsheets, fragmented dashboards, and manual handoffs.",
    icon: Building2
  },
  {
    title: "NOC and support teams",
    detail: "A shared operating surface for service health, subscriber visibility, alert response, and support coordination.",
    icon: Network
  },
  {
    title: "Customer-facing teams",
    detail: "A cleaner customer portal for plan visibility, billing-linked information, usage summaries, and support requests.",
    icon: CreditCard
  }
] as const;

const workflowCards = [
  {
    title: "For operations teams",
    description: "Support, NOC, engineering, and admin users work from the same system of record instead of isolated tools.",
    icon: Network
  },
  {
    title: "For service delivery",
    description: "Service plans, provisioning, monitoring, and incidents remain connected across the entire delivery workflow.",
    icon: Router
  },
  {
    title: "For secure access",
    description: "Invite-based access and role-aware routing keep internal operations and customer access safely separated.",
    icon: ShieldCheck
  }
] as const;

const capabilityList = [
  "Subscriber, plan, and subscription management",
  "Device context and service-linked operational visibility",
  "Provisioning-ready workflow model with traceable status changes",
  "Monitoring, alerts, and fault response in a single product surface",
  "Customer-safe portal for service status, billing, usage, and support",
  "Supabase-native backend foundation with tenant-ready structure"
] as const;

const businessReasons = [
  "Reduce operational friction across support, engineering, provisioning, and customer communication.",
  "Keep subscriber, service, device, and billing-linked state aligned in one operational platform.",
  "Deliver a cleaner service-delivery workflow without building a heavyweight OSS/BSS suite on day one."
] as const;

const insightCards = [
  {
    eyebrow: "Operational planning",
    title: "How subscriber, service, and support workflows should stay connected",
    detail: "Use one platform to move from onboarding and provisioning to monitoring and customer communication without losing context."
  },
  {
    eyebrow: "Platform model",
    title: "Why a focused operations platform is better than trying to build full OSS/BSS at once",
    detail: "A narrower v1 improves delivery speed, reduces implementation risk, and keeps the product aligned to real operator workflows."
  },
  {
    eyebrow: "Customer visibility",
    title: "What customers should see in a safe portal, and what should remain internal",
    detail: "Billing-linked status, usage, plan details, and support belong in the portal. Provisioning and network control do not."
  }
] as const;

const footerColumns = [
  {
    title: "Platform",
    links: ["Subscriber operations", "Provisioning workflows", "Monitoring and faults", "Customer portal"]
  },
  {
    title: "Teams",
    links: ["Operations leadership", "Network engineering", "NOC and support", "Customer-facing teams"]
  },
  {
    title: "Implementation",
    links: ["Single-tenant v1", "Tenant-ready structure", "Supabase backend", "GPON / XGS-PON first"]
  }
] as const;

export default async function HomePage() {
  const session = await getAppSession();

  if (session) {
    redirect(session.userType === "customer" ? "/portal" : "/ops");
  }

  return (
    <main className="public-page min-h-screen bg-mist text-ink">
      <PublicHeader />

      <div className="public-content w-full space-y-12 px-6 py-8 lg:px-10 lg:py-10 2xl:px-16">
        <section
          id="platform"
          className="grid gap-8 rounded-[36px] border border-border bg-elevated px-6 py-10 shadow-[0_18px_44px_rgba(11,42,79,0.06)] lg:grid-cols-[0.96fr_0.7fr] lg:px-10 lg:py-14"
        >
          <div className="animate-enter-up">
            <div className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-xs uppercase tracking-[0.18em] text-secondary">
              Broadband operations platform
            </div>
            <p className="mt-6 text-sm uppercase tracking-[0.18em] text-secondary">
              {APP_CONFIG.companyLabel}
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.04] text-accent md:text-6xl">
              Broadband operations software for providers that need one reliable operating surface.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-ink/74">
              {APP_CONFIG.name} brings together subscriber management, provisioning, service quality
              monitoring, billing-linked visibility, and customer-safe access in one system. It is
              designed for operators that want better control over service delivery without juggling fragmented tools.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Access platform
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#capabilities"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-elevated px-6 py-3.5 text-sm font-semibold text-accent transition hover:bg-surface"
              >
                Explore the platform
              </a>
            </div>
          </div>

          <div className="animate-enter-up-delayed lg:pl-4">
            <div className="overflow-hidden rounded-[28px] border border-border bg-surface p-3 shadow-[0_18px_40px_rgba(11,42,79,0.08)]">
              <div className="overflow-hidden rounded-[22px]">
                <Image
                  src="/illustrations/city-network-hero.svg"
                  alt="Connected city network"
                  width={1200}
                  height={900}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="public-card rounded-[36px] p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-secondary">Why teams choose it</p>
              <h2 className="mt-4 font-display text-4xl text-accent">
                Built to support the real operating model of regional service providers.
              </h2>
              <p className="mt-5 text-base leading-8 text-ink/72">
                The platform is organized around the work operators already do: customer activation,
                service provisioning, device visibility, monitoring, support response, and customer-safe access.
                It gives internal teams a shared system of record instead of disconnected task handoffs.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {solutionCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article key={card.title} className="public-soft-card rounded-[28px] p-5">
                    <div className="w-fit rounded-2xl bg-primary/10 p-3 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-xl text-accent">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink/72">{card.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {customerTypes.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="public-card rounded-[32px] p-6">
                <div className="w-fit rounded-2xl bg-primary/10 p-3 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl text-accent">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/72">{item.detail}</p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {businessReasons.map((item) => (
            <article key={item} className="public-soft-card rounded-[24px] p-5">
              <p className="text-sm leading-7 text-ink/75">{item}</p>
            </article>
          ))}
        </section>

        <section id="capabilities" className="public-card rounded-[36px] p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.18em] text-secondary">Capabilities</p>
            <h2 className="mt-4 font-display text-4xl text-accent">What the platform delivers</h2>
            <p className="mt-4 text-base leading-8 text-ink/72">
              The product is structured around modules that fit together operationally, so teams can
              move from account setup to live service visibility without losing context.
            </p>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="grid gap-4 md:grid-cols-2">
              {capabilityList.map((item) => (
                <article key={item} className="rounded-[28px] border border-border bg-surface p-5">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-primary/10 p-2.5 text-accent">
                      <BadgeCheck className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-7 text-ink/74">{item}</p>
                  </div>
                </article>
              ))}
            </div>

            <div id="workflows" className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
              {workflowCards.map((card, index) => {
                const Icon = card.icon;
                const animationClass =
                  index === 0 ? "animate-enter-up" : index === 1 ? "animate-enter-up-delayed" : "animate-enter-up-late";

                return (
                  <article key={card.title} className={`rounded-[30px] border border-border bg-white p-6 ${animationClass}`}>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-xl text-accent">{card.title}</h3>
                      <div className="rounded-2xl bg-primary/10 p-3 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-ink/72">{card.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="public-card rounded-[36px] p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-secondary">Operational flow</p>
            <h2 className="mt-4 font-display text-3xl text-accent">From subscriber activation to issue resolution</h2>
            <div className="mt-8 space-y-4">
              {[
                "Create the customer and assign the service plan.",
                "Link the service to a device and launch the provisioning workflow.",
                "Track health, alerts, and service posture in the operations console.",
                "Expose customer-safe usage, billing, and support state through the portal."
              ].map((step, index) => (
                <div key={step} className="flex gap-4 rounded-2xl border border-border bg-surface p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-ink/74">{step}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="public-card rounded-[36px] p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-secondary">Business outcomes</p>
            <h2 className="mt-4 font-display text-3xl text-accent">Designed to improve day-to-day service operations</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Lower operational friction across support, NOC, and engineering teams",
                "Improve traceability across provisioning, monitoring, and support resolution",
                "Preserve tenant-ready architecture while delivering a practical single-tenant v1",
                "Give customers a safer view of service, usage, billing, and support"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-surface p-4">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="mt-1 h-4 w-4 shrink-0 text-secondary" />
                    <p className="text-sm leading-7 text-ink/74">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section
          id="access"
          className="rounded-[40px] border border-border bg-[linear-gradient(135deg,rgba(11,42,79,0.98),rgba(26,56,97,0.95))] p-8 text-white shadow-[0_18px_44px_rgba(11,42,79,0.12)] lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/55">Access surface</p>
              <h2 className="mt-4 font-display text-4xl text-white">
                Enter through a secure, role-aware access flow built for staff and customer users.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/78">
                Internal teams move into the operations console. Customers move into a read-heavy portal.
                Both use the same authentication foundation while staying intentionally separated by role, route, and permissions.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-white/90"
              >
                Sign in now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portal"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/14"
              >
                View portal surface
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <article className="public-card rounded-[36px] p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-secondary">Featured perspective</p>
            <h2 className="mt-4 font-display text-3xl text-accent">
              A better broadband operating model starts with clearer product boundaries.
            </h2>
            <p className="mt-5 text-base leading-8 text-ink/72">
              The strongest v1 is not the broadest one. It is the version that gives providers a clean system
              for subscriber operations, provisioning, monitoring, and customer-safe visibility without unnecessary platform sprawl.
            </p>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            {insightCards.map((card) => (
              <article key={card.title} className="public-card rounded-[30px] p-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-secondary">{card.eyebrow}</p>
                <h3 className="mt-4 font-display text-xl leading-8 text-accent">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink/72">{card.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="rounded-[36px] border border-border bg-elevated px-6 py-8 shadow-[0_18px_44px_rgba(11,42,79,0.04)] lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.18em] text-secondary">{APP_CONFIG.shortName}</p>
              <h2 className="mt-4 font-display text-3xl text-accent">{APP_CONFIG.name}</h2>
              <p className="mt-4 text-base leading-8 text-ink/72">
                A business-focused platform for broadband providers that need one cleaner operating surface for
                subscriber workflows, provisioning, service assurance, and customer-safe visibility.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Access platform
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#platform"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-accent transition hover:bg-panel"
                >
                  Back to top
                </a>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <p className="text-xs uppercase tracking-[0.16em] text-secondary">{column.title}</p>
                  <div className="mt-4 space-y-3">
                    {column.links.map((link) => (
                      <p key={link} className="text-sm text-ink/72">
                        {link}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
