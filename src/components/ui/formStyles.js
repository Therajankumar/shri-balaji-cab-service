export function inputClass(error) {
  return [
    "w-full rounded-xl border bg-surface-raised px-4 py-3 text-white placeholder:text-gray-500",
    "outline-none transition focus:ring-2",
    error
      ? "border-red-500 focus:ring-red-500/30"
      : "border-transparent focus:border-brand focus:ring-brand/20",
  ].join(" ");
}
