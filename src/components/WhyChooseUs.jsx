import { motion } from "framer-motion";
import {
  FaUserShield,
  FaClock,
  FaRupeeSign,
  FaMapMarkedAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUserShield />,
    title: "Safe & Trusted",
    desc: "Experienced drivers with customer safety as the highest priority.",
  },
  {
    icon: <FaClock />,
    title: "24×7 Available",
    desc: "Book your cab anytime for local, airport, or outstation travel.",
  },
  {
    icon: <FaRupeeSign />,
    title: "Affordable Pricing",
    desc: "Transparent pricing with no hidden charges.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "All India Permit",
    desc: "Travel anywhere across India with reliable and comfortable rides.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#09111f]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-yellow-400 uppercase tracking-[4px] font-semibold">
            Why Choose Us
          </span>

          <h2 className="text-5xl font-bold text-white mt-4">
            Your Trusted Travel Partner
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            We combine comfort, affordability, and reliability to make every
            journey safe and memorable.
          </p>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-20">

          {features.map((item, index) => (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              className="group bg-[#111827] border border-white/10 rounded-3xl p-8 text-center hover:border-yellow-500 hover:-translate-y-3 transition duration-500"
            >

              <div className="w-20 h-20 rounded-full bg-yellow-500 text-black flex items-center justify-center text-3xl mx-auto group-hover:rotate-12 transition duration-500">

                {item.icon}

              </div>

              <h3 className="text-2xl font-bold text-white mt-8">
                {item.title}
              </h3>

              <p className="text-gray-400 mt-4 leading-7">
                {item.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}