const sizes = {
  sm: "h-10 w-10 text-base",
  md: "h-14 w-14 text-xl",
  lg: "h-16 w-16 text-2xl",
};

const variants = {
  // Default: subtle tinted badge, so yellow stays reserved for main actions.
  soft: "bg-brand/10 text-brand-light ring-1 ring-brand/25",
  solid: "bg-brand text-ink",
  // For light sections.
  tint: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
};

const shapes = {
  circle: "rounded-full",
  square: "rounded-2xl",
};

export default function IconBadge({ icon: Icon, size = "md", variant = "soft", shape = "circle", className = "" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center ${sizes[size]} ${variants[variant]} ${shapes[shape]} ${className}`}
    >
      <Icon aria-hidden="true" />
    </div>
  );
}
