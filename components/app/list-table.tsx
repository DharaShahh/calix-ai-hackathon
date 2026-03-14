import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Column<T> = {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
};

type ListTableProps<T> = {
  columns: Column<T>[];
  items: T[];
  getKey: (item: T) => string;
  rowHref?: (item: T) => string | null;
};

export function ListTable<T>({ columns, items, getKey, rowHref }: ListTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-elevated">
      <div
        className="grid grid-cols-1 gap-px bg-border md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
        style={{ ["--cols" as string]: columns.length + (rowHref ? 1 : 0) }}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            className="bg-surface px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink/45"
          >
            {column.header}
          </div>
        ))}
        {rowHref ? (
          <div className="bg-surface px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">
            Open
          </div>
        ) : null}

        {items.flatMap((item) => {
          const href = rowHref?.(item);

          return [
            ...columns.map((column) => (
              <div key={`${getKey(item)}-${column.key}`} className="bg-elevated px-4 py-4 text-sm text-ink/72">
                {column.render(item)}
              </div>
            )),
            ...(href
              ? [
                  <div key={`${getKey(item)}-open`} className="bg-elevated px-4 py-4 text-sm text-ink/72">
                    <Link href={href} className="inline-flex items-center gap-2 font-semibold text-ink transition hover:text-accent">
                      View
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                ]
              : [])
          ];
        })}
      </div>
    </div>
  );
}
