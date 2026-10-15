import Reveal from "./Reveal";

const tones = {
  dark: { eyebrow: "text-brand-light", title: "text-white", description: "text-gray-400" },
  light: { eyebrow: "text-amber-700", title: "text-ink", description: "text-slate-600" },
};

// Use tone="light" inside a <Section tone="light">.
export default function SectionHeading({ eyebrow, title, description, align = "center", tone = "dark" }) {
  const centered = align === "center";
  const colors = tones[tone];

  return (
    <Reveal className={`mb-12 max-w-2xl md:mb-16 ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className={`text-sm font-semibold uppercase tracking-[0.25em] ${colors.eyebrow}`}>
          {eyebrow}
        </span>
      )}

      <h2 className={`mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${colors.title}`}>
        {title}
      </h2>

      {description && <p className={`mt-4 leading-7 ${colors.description}`}>{description}</p>}
    </Reveal>
  );
}
