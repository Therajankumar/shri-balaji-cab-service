import { stats } from "../data/content";
import Card from "./ui/Card";
import Reveal from "./ui/Reveal";

export default function HeroStats() {
  return (
    <section className="bg-ink-soft py-14" aria-label="Highlights">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 sm:px-6 md:gap-6 lg:grid-cols-4">
        {stats.map((item, index) => (
          <Reveal key={item.title} index={index}>
            <Card interactive className="px-4 py-7 text-center md:py-9">
              <p className="font-display text-3xl font-semibold text-white md:text-4xl">{item.value}</p>
              <span className="mx-auto mt-3 block h-0.5 w-8 rounded-full bg-brand" />
              <p className="mt-3 text-sm text-gray-400 md:text-base">{item.title}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
