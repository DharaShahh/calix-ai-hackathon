type WorkflowNoteProps = {
  title: string;
  items: string[];
};

export function WorkflowNote({ title, items }: WorkflowNoteProps) {
  return (
    <article className="rounded-md border border-border bg-elevated p-5">
      <p className="text-xs uppercase tracking-[0.12em] text-ink/45">{title}</p>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 rounded-md border border-border bg-surface p-4">
            <span className="mt-2 h-2.5 w-2.5 rounded-full bg-secondary" />
            <p className="text-sm leading-7 text-ink/75">{item}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
