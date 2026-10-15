import { FaCheckCircle } from "react-icons/fa";

export default function CheckItem({ icon: Icon = FaCheckCircle, children, className = "" }) {
  return (
    <li className={`flex items-center gap-3 ${className}`}>
      <Icon className="shrink-0 text-brand-light" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}
