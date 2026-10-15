import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

import bg from "../assets/contact-bg.png";
import { formatPhone, mailHref, site, telHref } from "../config/site";
import BookingForm from "./booking/BookingForm";
import Card from "./ui/Card";
import IconBadge from "./ui/IconBadge";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

const contactItems = [
  {
    icon: FaPhoneAlt,
    title: "Phone Numbers",
    links: site.phones.map((phone) => ({ label: formatPhone(phone), href: telHref(phone) })),
  },
  {
    icon: FaEnvelope,
    title: "Email",
    links: Object.values(site.emails).map((email) => ({ label: email, href: mailHref(email) })),
  },
  { icon: FaMapMarkerAlt, title: "Service Area", text: site.serviceArea },
  { icon: FaClock, title: "Availability", text: site.hours },
];

export default function Contact() {
  return (
    <Section
      id="contact"
      background={
        <>
          <img src={bg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-ink/85" />
        </>
      }
    >
      <SectionHeading
        eyebrow="Contact Us"
        title="Book Your Cab Today"
        description={`Contact ${site.name} for airport transfers, local rides, Delhi NCR travel, and outstation journeys.`}
      />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="grid content-start gap-4">
          {contactItems.map((item, index) => (
            <Reveal key={item.title} index={index}>
              <Card className="flex gap-5 p-6">
                <IconBadge icon={item.icon} />
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  {item.links ? (
                    item.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="mt-1 block break-words text-gray-400 transition hover:text-brand-light"
                      >
                        {link.label}
                      </a>
                    ))
                  ) : (
                    <p className="mt-1 text-gray-400">{item.text}</p>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <BookingForm
            id="contact-form"
            variant="full"
            title="Send an Inquiry"
            subtitle="Share your trip details and we'll get back to you with the best fare."
          />
        </Reveal>
      </div>
    </Section>
  );
}
