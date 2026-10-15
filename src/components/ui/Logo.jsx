import logoMark from "../../assets/logo-mark.png";
import { site } from "../../config/site";

const sizes = {
  md: { img: "h-12 w-12", title: "text-lg", sub: "text-xs" },
  lg: { img: "h-16 w-16", title: "text-2xl", sub: "text-sm" },
};

export default function Logo({ size = "md", href = "#home" }) {
  const s = sizes[size];

  return (
    <a href={href} className="flex items-center gap-3" aria-label={`${site.name} – home`}>
      <img
        src={logoMark}
        alt=""
        className={`${s.img} rounded-full border border-brand/40 object-cover`}
      />
      <span className="leading-tight">
        <span className={`block font-bold text-white ${s.title}`}>{site.shortName}</span>
        <span className={`block text-gray-400 ${s.sub}`}>{site.tagline}</span>
      </span>
    </a>
  );
}
