import { cn } from "@/lib/utils";

const STATUS_TONES = {
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-700",
  danger: "border-rose-500/20 bg-rose-500/10 text-rose-700",
  neutral: "border-border bg-surface text-ink/70"
} as const;

type StatusTone = keyof typeof STATUS_TONES;

type StatusBadgeProps = {
  label: string;
  tone?: StatusTone;
};

export function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em]",
        STATUS_TONES[tone]
      )}
    >
      {label}
    </span>
  );
}
