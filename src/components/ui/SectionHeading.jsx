import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const centered = align === "center";

  return (
    <Reveal className={`mb-12 max-w-2xl md:mb-16 ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-light">
          {eyebrow}
        </span>
      )}

      <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && <p className="mt-4 leading-7 text-gray-400">{description}</p>}
    </Reveal>
  );
}
