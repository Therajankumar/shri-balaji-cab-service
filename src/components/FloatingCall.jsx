import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import { telHref, whatsappHref } from "../config/site";

export default function FloatingCall() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-lg shadow-black/40 transition hover:scale-110 hover:bg-green-600"
      >
        <FaWhatsapp />
      </a>

      <a
        href={telHref()}
        aria-label="Call now"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand text-xl text-ink shadow-lg shadow-black/40 transition hover:scale-110 hover:bg-brand-light"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" />
        <FaPhoneAlt className="relative" />
      </a>
    </div>
  );
}
