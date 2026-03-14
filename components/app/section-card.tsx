import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function SectionCard({ title, description, children, className }: SectionCardProps) {
  return (
    <section className={cn("rounded-md border border-border bg-elevated p-5", className)}>
      <div className="mb-6">
        <h2 className="font-display text-2xl text-accent">{title}</h2>
        {description ? <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/68">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
