type SearchMessageProps = {
  message?: string;
  type?: string;
};

export function SearchMessage({ message, type }: SearchMessageProps) {
  if (!message) {
    return null;
  }

  const tone =
    type === "success"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-800"
      : "border-rose-500/20 bg-rose-500/10 text-rose-700";

  return <div className={`rounded-md border px-4 py-3 text-sm ${tone}`}>{message}</div>;
}
