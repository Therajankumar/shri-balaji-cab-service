import { FaCalendarCheck, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import { site, telHref, whatsappHref } from "../config/site";
import { useBooking } from "../context/booking-context";
import { bookingHighlights } from "../data/content";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import CheckItem from "./ui/CheckItem";
import Reveal from "./ui/Reveal";
import Img from "./ui/Img";
import { responsiveImage } from "../lib/images";

const background = responsiveImage("backgrounds/contact");

export default function BookingCTA() {
  const { startBooking } = useBooking();

  return (
    <section className="bg-paper py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-line">
          <Img image={background} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/50" />

          <div className="relative max-w-3xl px-6 py-14 sm:px-12 lg:px-20 lg:py-20">
            <Badge>Premium Cab Booking</Badge>

            <h2 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Book Your Ride <span className="text-brand-light">Today</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Whether it&apos;s an airport pickup, local travel, Delhi NCR, an outstation trip or All India
              Permit, {site.name} is just one call away.
            </p>

            <ul className="mt-8 grid gap-4 text-white sm:grid-cols-2">
              {bookingHighlights.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" icon={FaCalendarCheck} onClick={() => startBooking()}>
                Book Online
              </Button>
              <Button href={telHref()} variant="ghost" size="lg" icon={FaPhoneAlt}>
                Call Now
              </Button>
              <Button href={whatsappHref()} variant="whatsapp" size="lg" icon={FaWhatsapp}>
                WhatsApp
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
