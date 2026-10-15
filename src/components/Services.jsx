import { FaArrowRight } from "react-icons/fa";

import { useBooking } from "../context/booking-context";
import { services, tripTypes } from "../data/content";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Img from "./ui/Img";
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
              <Card interactive className="group flex h-full flex-col overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-black">
                  <Img
                    image={service.image}
                    alt={service.title}
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-gray-400">{service.desc}</p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-6 self-start"
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
