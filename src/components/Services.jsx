import { motion } from "framer-motion";

import airport from "../assets/icons/airport.png";
import local from "../assets/icons/local.png";
import outstation from "../assets/icons/outstation.png";
import reliable from "../assets/icons/reliable.png";

const services = [
  {
    title: "Airport Pickup & Drop",
    desc: "Reliable airport transfers with punctual pickups and comfortable rides.",
    image: airport,
  },
  {
    title: "Local City Rides",
    desc: "Affordable local travel within Faridabad and Delhi NCR.",
    image: local,
  },
  {
    title: "Outstation Trips",
    desc: "Enjoy hassle-free journeys across India with experienced drivers.",
    image: outstation,
  },
  {
    title: "Safe & Reliable Service",
    desc: "Professional drivers, sanitized vehicles and 24×7 customer support.",
    image: reliable,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#09111f] py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-yellow-400 uppercase tracking-[4px]">
            Our Services
          </span>

          <h2 className="text-5xl font-bold text-white mt-3">
            Premium Travel Solutions
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Whether you're travelling locally or across India,
            Shri Balaji Faridabad Cab Service offers comfortable,
            safe and affordable rides.
          </p>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-20">

          {services.map((service, index) => (

            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .5,
                delay: index * .15,
              }}
              viewport={{ once: true }}
              className="group bg-[#111827] rounded-3xl border border-white/10
              overflow-hidden hover:border-yellow-500 transition duration-300
              hover:-translate-y-3"
            >

              <div className="overflow-hidden">

                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                />

              </div>

              <div className="p-6">

                <h3 className="text-white text-2xl font-bold">

                  {service.title}

                </h3>

                <p className="text-gray-400 mt-4 leading-7">

                  {service.desc}

                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}