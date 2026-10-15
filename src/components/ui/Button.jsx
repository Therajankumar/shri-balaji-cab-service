const variants = {
  primary: "bg-brand text-ink hover:bg-brand-light shadow-lg shadow-brand/20",
  outline: "border border-brand/70 text-brand-light hover:bg-brand hover:text-ink",
  whatsapp: "border border-green-500 text-green-400 hover:bg-green-500 hover:text-white",
  ghost: "border border-line bg-white/5 text-white hover:border-brand/60 hover:text-brand-light",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3",
  lg: "px-8 py-4",
  icon: "h-12 w-12 shrink-0",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  icon: Icon,
  block = false,
  className = "",
  children,
  ...props
}) {
  const classes = [
    "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap",
    "transition duration-300 hover:-translate-y-0.5",
    "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
    variants[variant],
    sizes[size],
    block && "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {Icon && <Icon aria-hidden="true" />}
      {children}
    </>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: "_blank", rel: "noreferrer" })}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
