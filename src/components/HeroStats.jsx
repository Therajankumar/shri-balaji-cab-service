import { motion } from "framer-motion";

const stats = [
  {
    value: "1000+",
    title: "Happy Customers",
  },
  {
    value: "5+",
    title: "Vehicle Types",
  },
  {
    value: "24×7",
    title: "Support",
  },
  {
    value: "All India",
    title: "Permit",
  },
];

export default function HeroStats() {
  return (
    <section className="bg-[#09111f] py-16">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {stats.map((item, index) => (

          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * .2,
            }}
            viewport={{ once: true }}
            className="bg-[#111827] border border-yellow-500/20 rounded-3xl p-8 text-center hover:border-yellow-500 hover:-translate-y-2 duration-300"
          >

            <h2 className="text-yellow-400 text-5xl font-bold">

              {item.value}

            </h2>

            <p className="text-gray-400 mt-4">

              {item.title}

            </p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}