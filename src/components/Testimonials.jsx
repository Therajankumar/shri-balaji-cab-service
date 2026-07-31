import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

import bg from "../assets/testimonial-bg.png";

const testimonials = [
  {
    name: "Amit Sharma",
    city: "Faridabad",
    review:
      "Very professional service. The cab arrived on time, the driver was polite, and the journey was comfortable. Highly recommended!",
  },
  {
    name: "Priya Verma",
    city: "Delhi",
    review:
      "Booked an airport pickup at 4 AM. The driver reached before time and the ride was smooth. Excellent experience.",
  },
  {
    name: "Rahul Singh",
    city: "Gurugram",
    review:
      "Affordable pricing with clean vehicles. I booked an Innova Crysta for a family trip and everything was perfect.",
  },
];

export default function Testimonials() {
  return (
    <section
      className="relative py-24 bg-[#050816] overflow-hidden"
      id="testimonials"
    >
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-yellow-400 uppercase tracking-[4px] font-semibold">
            Testimonials
          </span>

          <h2 className="text-5xl font-bold text-white mt-4">
            What Our Customers Say
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Customer satisfaction is our priority. Here are a few words from
            travelers who chose Shri Balaji Faridabad Cab Service.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {testimonials.map((item, index) => (

            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
              }}
              viewport={{ once: true }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-yellow-500 transition duration-500 hover:-translate-y-2"
            >

              <FaQuoteLeft className="text-yellow-400 text-4xl mb-6" />

              <p className="text-gray-300 leading-8">
                "{item.review}"
              </p>

              <div className="flex gap-1 text-yellow-400 mt-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <h3 className="text-white text-xl font-bold mt-8">
                {item.name}
              </h3>

              <p className="text-gray-400">
                {item.city}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}