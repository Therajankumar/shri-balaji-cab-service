export default function Card({ interactive = false, className = "", children }) {
  return (
    <div
      className={`rounded-3xl border border-line bg-surface ${
        interactive
          ? "transition duration-300 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-2xl hover:shadow-brand/5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
