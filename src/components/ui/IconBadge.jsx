const sizes = {
  sm: "h-10 w-10 text-base",
  md: "h-14 w-14 text-xl",
  lg: "h-20 w-20 text-3xl",
};

export default function IconBadge({ icon: Icon, size = "md", className = "" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-brand text-ink ${sizes[size]} ${className}`}
    >
      <Icon aria-hidden="true" />
    </div>
  );
}
