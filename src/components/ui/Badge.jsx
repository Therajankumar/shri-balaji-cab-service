// Small pill label, e.g. above a heading. `pulse` adds a live dot.
export default function Badge({ pulse = false, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand-light">
      {pulse && <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />}
      {children}
    </span>
  );
}
