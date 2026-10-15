import { motion } from "framer-motion";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import heroCar from "../assets/hero-car.png";
import { site, telHref, whatsappHref } from "../config/site";
import { BOOKING_FORM_ID } from "../context/BookingProvider";
import { useBooking } from "../context/booking-context";
import { heroHighlights } from "../data/content";
import BookingForm from "./booking/BookingForm";
import Button from "./ui/Button";

export default function Hero() {
  const { prefill } = useBooking();

  return (
    <section id="home" className="relative overflow-hidden bg-ink pb-20 pt-32 lg:min-h-screen lg:pt-36">
      {/* Background */}
      <img
        src={heroCar}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[65%_center] opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Copy */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand-light">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
            {site.name}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Reliable Cabs in <span className="text-brand-light">Faridabad</span>, Delhi NCR &amp; Across India
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">{site.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={telHref()} size="lg" icon={FaPhoneAlt}>
              Call Now
            </Button>
            <Button href={whatsappHref()} variant="whatsapp" size="lg" icon={FaWhatsapp}>
              WhatsApp
            </Button>
          </div>

          <ul className="mt-10 grid max-w-lg grid-cols-2 gap-4">
            {heroHighlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-gray-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-brand-light ring-1 ring-line">
                  <Icon aria-hidden="true" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Booking */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <BookingForm id={BOOKING_FORM_ID} prefill={prefill} />
        </motion.div>
      </div>
    </section>
  );
}
