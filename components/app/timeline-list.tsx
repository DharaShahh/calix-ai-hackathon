type TimelineListProps = {
  items: {
    title: string;
    detail: string;
    meta?: string;
  }[];
};

export function TimelineList({ items }: TimelineListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article
          key={`${item.title}-${item.detail}`}
          className="grid gap-3 rounded-md border border-border bg-elevated p-4 md:grid-cols-[1fr_auto]"
        >
          <div>
            <p className="text-sm font-semibold text-ink">{item.title}</p>
            <p className="mt-2 text-sm leading-7 text-ink/66">{item.detail}</p>
          </div>
          {item.meta ? <p className="text-xs uppercase tracking-[0.12em] text-ink/42">{item.meta}</p> : null}
        </article>
      ))}
    </div>
  );
}
