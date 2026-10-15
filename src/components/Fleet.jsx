import {
  FaCalendarCheck,
  FaPhoneAlt,
  FaSnowflake,
  FaSuitcase,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

import { telHref } from "../config/site";
import { useBooking } from "../context/booking-context";
import { fleet } from "../data/content";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

export default function Fleet() {
  const { startBooking } = useBooking();

  return (
    <Section
      id="fleet"
      background={<div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-brand/10 blur-[140px]" />}
    >
      <SectionHeading
        eyebrow="Our Fleet"
        title="Choose Your Perfect Ride"
        description="From comfortable sedans to spacious tempo travellers, we provide clean, well-maintained vehicles for every trip."
      />

      <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
        {fleet.map((car, index) => (
          <Reveal
            key={car.name}
            index={index}
            className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.334rem)]"
          >
            <Card interactive className="group flex h-full flex-col overflow-hidden">
              <div className="relative aspect-[3/2] overflow-hidden bg-black">
                <img
                  src={car.image}
                  alt={car.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full border border-brand/30 bg-ink/80 px-3 py-1 text-xs font-semibold text-brand-light backdrop-blur">
                  {car.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-white">{car.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{car.idealFor}</p>

                <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-300">
                  <Spec icon={FaUsers}>{car.seats}</Spec>
                  <Spec icon={FaSnowflake}>Air Conditioned</Spec>
                  <Spec icon={FaSuitcase}>Luggage Space</Spec>
                  <Spec icon={FaUserTie}>Expert Driver</Spec>
                </ul>

                <div className="mt-auto flex gap-3 pt-6">
                  <Button block icon={FaCalendarCheck} onClick={() => startBooking({ vehicle: car.name })}>
                    Book Now
                  </Button>
                  <Button href={telHref()} variant="ghost" size="icon" aria-label={`Call to book ${car.name}`}>
                    <FaPhoneAlt aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Spec({ icon: Icon, children }) {
  return (
    <li className="flex items-center gap-2">
      <Icon className="shrink-0 text-brand-light" aria-hidden="true" />
      {children}
    </li>
  );
}
