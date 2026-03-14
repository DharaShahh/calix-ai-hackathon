import type { ReactNode } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { PublicHeader } from "@/components/public/public-header";

type PublicAuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  notes: string[];
};

export function PublicAuthShell({
  eyebrow,
  title,
  description,
  children,
  notes
}: PublicAuthShellProps) {
  return (
    <main className="public-page min-h-screen overflow-hidden bg-mist text-ink">
      <PublicHeader />
      <div className="public-content min-h-[calc(100vh-81px)]">
        <div className="grid min-h-[calc(100vh-81px)] lg:grid-cols-[1.08fr_0.92fr]">
          <section className="relative overflow-hidden bg-[linear-gradient(150deg,rgba(11,42,79,0.98),rgba(15,36,63,0.96))] px-6 py-6 text-white lg:px-10 lg:py-8 2xl:px-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,116,159,0.22),transparent_28%),linear-gradient(to_bottom,transparent,rgba(255,255,255,0.03))]" />

            <div className="relative z-10 flex min-h-full flex-col">
              <div className="grid flex-1 gap-8 py-8 lg:grid-rows-[auto_1fr_auto]">
                <div className="animate-enter-up max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/55">{eyebrow}</p>
                  <h1 className="mt-4 font-display text-4xl leading-tight text-white md:text-[2.9rem]">
                    {title}
                  </h1>
                  <p className="mt-4 max-w-xl text-base leading-7 text-white/78">{description}</p>
                </div>

                <div className="animate-enter-up-delayed self-stretch">
                  <div className="h-full overflow-hidden rounded-[30px] border border-white/12 bg-white/6 p-3 shadow-[0_18px_44px_rgba(0,0,0,0.16)] backdrop-blur-sm">
                    <div className="h-full min-h-[340px] overflow-hidden rounded-[24px] lg:min-h-[420px]">
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

                <div className="grid gap-3 md:grid-cols-2">
                  {notes.slice(0, 2).map((note) => (
                    <div key={note} className="rounded-[24px] border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                      <div className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#B3C8F2]" />
                        <p className="text-sm leading-6 text-white/78">{note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="animate-enter-up-late flex items-center bg-[color:var(--color-surface)] px-6 py-8 lg:px-10 lg:py-10 2xl:px-14">
            <div className="mx-auto w-full max-w-[520px]">
              <div className="rounded-[32px] border border-border bg-elevated p-6 shadow-[0_18px_44px_rgba(11,42,79,0.08)] md:p-8">
                {children}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
