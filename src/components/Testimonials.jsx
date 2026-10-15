import { FaQuoteLeft, FaStar } from "react-icons/fa";

import bg from "../assets/testimonial-bg.png";
import { testimonials } from "../data/content";
import Card from "./ui/Card";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      background={
        <>
          <img src={bg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-ink/80" />
        </>
      }
    >
      <SectionHeading
        eyebrow="Testimonials"
        title="What Our Customers Say"
        description="Customer satisfaction is our priority. Here are a few words from travellers who chose us."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {testimonials.map((item, index) => (
          <Reveal key={item.name} index={index} className="h-full">
            <Card interactive className="flex h-full flex-col bg-surface/70 p-8 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-brand-light" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar key={i} aria-hidden="true" />
                  ))}
                </div>
                <FaQuoteLeft className="text-3xl text-brand/30" aria-hidden="true" />
              </div>

              <blockquote className="mt-6 flex-1 leading-8 text-gray-300">“{item.review}”</blockquote>

              <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 font-bold text-brand-light ring-1 ring-brand/40">
                  {initials(item.name)}
                </div>
                <div>
                  <p className="font-bold text-white">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.city}</p>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
