export default function FormField({ label, htmlFor, error, className = "", children }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400">
          {label}
        </label>
      )}
      {children}
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
}
