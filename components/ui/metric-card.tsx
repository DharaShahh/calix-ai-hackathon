type MetricCardProps = {
  label: string;
  value: string;
  change: string;
};

export function MetricCard({ label, value, change }: MetricCardProps) {
  const positive = change.startsWith("+");

  return (
    <article className="rounded-md border border-border bg-elevated p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-secondary">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <strong className="font-display text-3xl text-accent">{value}</strong>
        <span
          className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
            positive ? "bg-emerald-500/10 text-emerald-700" : "bg-rose-500/10 text-rose-700"
          }`}
        >
          {change}
        </span>
      </div>
    </article>
  );
}
