const tones = {
  base: "bg-ink",
  alt: "bg-ink-soft",
};

export default function Section({
  id,
  tone = "base",
  background,
  className = "",
  children,
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 overflow-hidden py-20 md:py-28 ${tones[tone]} ${className}`}
    >
      {background}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">{children}</div>
    </section>
  );
}
