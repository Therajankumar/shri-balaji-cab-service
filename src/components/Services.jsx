import { FaArrowRight } from "react-icons/fa";

import { useBooking } from "../context/booking-context";
import { services, tripTypes } from "../data/content";
import Button from "./ui/Button";
import Card from "./ui/Card";
import CheckItem from "./ui/CheckItem";
import IconBadge from "./ui/IconBadge";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

export default function Services() {
  const { startBooking } = useBooking();

  return (
    <Section id="services" tone="alt">
      <SectionHeading
        eyebrow="Our Services"
        title="Premium Travel Solutions"
        description="Whether you're travelling locally or across India, we offer comfortable, safe and affordable rides."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {services.map((service, index) => {
          const trip = tripTypes.find((t) => t.id === service.tripType);

          return (
            <Reveal key={service.title} index={index} className="h-full">
              <Card interactive className="group relative flex h-full flex-col overflow-hidden p-7">
                {/* Soft glow that brightens on hover */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/5 blur-2xl transition duration-500 group-hover:bg-brand/15" />

                <div className="relative flex items-start justify-between">
                  <IconBadge icon={service.icon} size="lg" shape="square" />
                  <span className="font-display text-4xl font-bold text-white/5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-6 text-xl font-semibold text-white">{service.title}</h3>
                <p className="relative mt-3 leading-7 text-gray-400">{service.desc}</p>

                <ul className="relative mt-5 space-y-2.5 text-sm text-gray-300">
                  {service.points.map((point) => (
                    <CheckItem key={point}>{point}</CheckItem>
                  ))}
                </ul>

                <div className="relative mt-auto pt-7">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startBooking(trip ? { tripType: trip.id } : {})}
                  >
                    {trip ? `Book ${trip.label} Ride` : "Book a Ride"}
                    <FaArrowRight aria-hidden="true" className="text-xs" />
                  </Button>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
