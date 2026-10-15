import { FaQuoteLeft, FaStar } from "react-icons/fa";

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
    <Section id="testimonials" tone="light">
      <SectionHeading
        tone="light"
        eyebrow="Testimonials"
        title="What Our Customers Say"
        description="Customer satisfaction is our priority. Here are a few words from travellers who chose us."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {testimonials.map((item, index) => (
          <Reveal key={item.name} index={index} className="h-full">
            <Card interactive tone="light" className="flex h-full flex-col p-8">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-amber-500" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar key={i} aria-hidden="true" />
                  ))}
                </div>
                <FaQuoteLeft className="text-3xl text-slate-200" aria-hidden="true" />
              </div>

              <blockquote className="mt-6 flex-1 leading-8 text-slate-700">“{item.review}”</blockquote>

              <div className="mt-8 flex items-center gap-4 border-t border-black/5 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-display font-bold text-brand-light">
                  {initials(item.name)}
                </div>
                <div>
                  <p className="font-bold text-ink">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.city}</p>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
