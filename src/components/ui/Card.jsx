const tones = {
  dark: "border-line bg-surface",
  light: "border-black/5 bg-white shadow-sm shadow-black/5",
};

// Use tone="light" for cards inside a <Section tone="light">.
export default function Card({ interactive = false, tone = "dark", className = "", children }) {
  return (
    <div
      className={`rounded-3xl border ${tones[tone]} ${
        interactive
          ? "transition duration-300 hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-2xl hover:shadow-brand/5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
