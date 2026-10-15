import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import { BUSINESS_PHONE, BUSINESS_WHATSAPP } from "../lib/inquiry";

export default function FloatingCall() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

      <a
        href={`https://wa.me/${BUSINESS_WHATSAPP}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white text-2xl flex items-center justify-center shadow-lg transition hover:scale-110"
      >
        <FaWhatsapp />
      </a>

      <a
        href={`tel:${BUSINESS_PHONE}`}
        aria-label="Call now"
        className="w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black text-xl flex items-center justify-center shadow-lg transition hover:scale-110 animate-bounce"
      >
        <FaPhoneAlt />
      </a>

    </div>
  );
}
