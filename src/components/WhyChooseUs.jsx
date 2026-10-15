import { features } from "../data/content";
import Card from "./ui/Card";
import IconBadge from "./ui/IconBadge";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

export default function WhyChooseUs() {
  return (
    <Section id="why-us" tone="light">
      <SectionHeading
        tone="light"
        eyebrow="Why Choose Us"
        title="Your Trusted Travel Partner"
        description="We combine comfort, affordability, and reliability to make every journey safe and memorable."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {features.map((item, index) => (
          <Reveal key={item.title} index={index} className="h-full">
            <Card interactive tone="light" className="group h-full p-8 text-center">
              <IconBadge
                icon={item.icon}
                size="lg"
                variant="tint"
                className="mx-auto transition duration-500 group-hover:rotate-12"
              />
              <h3 className="mt-6 text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
