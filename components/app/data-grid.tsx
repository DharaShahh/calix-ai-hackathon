import { cn } from "@/lib/utils";

type DataGridProps = {
  items: {
    label: string;
    value: string;
    detail?: string;
  }[];
  columns?: 2 | 3 | 4;
};

const GRID_MAP = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 xl:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4"
} as const;

export function DataGrid({ items, columns = 3 }: DataGridProps) {
  return (
    <div className={cn("grid gap-4", GRID_MAP[columns])}>
      {items.map((item) => (
        <article key={item.label} className="rounded-md border border-border bg-elevated p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-ink/45">{item.label}</p>
          <p className="mt-4 text-xl font-semibold text-ink">{item.value}</p>
          {item.detail ? <p className="mt-3 text-sm leading-7 text-ink/65">{item.detail}</p> : null}
        </article>
      ))}
    </div>
  );
}
