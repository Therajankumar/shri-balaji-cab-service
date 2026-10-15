import { features } from "../data/content";
import Card from "./ui/Card";
import IconBadge from "./ui/IconBadge";
import Reveal from "./ui/Reveal";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

export default function WhyChooseUs() {
  return (
    <Section id="why-us" tone="alt">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="Your Trusted Travel Partner"
        description="We combine comfort, affordability, and reliability to make every journey safe and memorable."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {features.map((item, index) => (
          <Reveal key={item.title} index={index} className="h-full">
            <Card interactive className="group h-full p-8 text-center">
              <IconBadge
                icon={item.icon}
                size="lg"
                className="mx-auto transition duration-500 group-hover:rotate-12"
              />
              <h3 className="mt-6 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 leading-7 text-gray-400">{item.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
