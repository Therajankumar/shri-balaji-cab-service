import { m } from "framer-motion";

// Consistent fade-up entrance animation for any block of content.
export default function Reveal({ index = 0, delay = 0, y = 40, className, children }) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: delay + index * 0.1 }}
      className={className}
    >
      {children}
    </m.div>
  );
}
