import { motion } from "framer-motion";
import { FaUsers, FaSnowflake, FaSuitcase, FaPhoneAlt } from "react-icons/fa";

import dezire from "../assets/fleet/dezire.png";
import ertiga from "../assets/fleet/ertiga.png";
import innova from "../assets/fleet/innova-crysta.png";
import carens from "../assets/fleet/kia-carens.png";
import traveller from "../assets/fleet/tempo-traveller.png";

const fleet = [
  {
    name: "Maruti Dzire",
    seats: "4 + 1 Seater",
    image: dezire,
  },
  {
    name: "Maruti Ertiga",
    seats: "6 + 1 Seater",
    image: ertiga,
  },
  {
    name: "Toyota Innova Crysta",
    seats: "6 + 1 Seater",
    image: innova,
  },
  {
    name: "Kia Carens",
    seats: "6 + 1 Seater",
    image: carens,
  },
  {
    name: "Tempo Traveller",
    seats: "9 / 12 / 16 Seater",
    image: traveller,
  },
];

export default function Fleet() {
  return (
    <section
      id="fleet"
      className="bg-[#050816] py-24 relative overflow-hidden"
    >
      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Heading */}

        <div className="text-center">

          <span className="text-yellow-400 uppercase tracking-[4px] font-semibold">
            Our Fleet
          </span>

          <h2 className="text-5xl font-bold text-white mt-4">
            Choose Your Perfect Ride
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mt-5">
            From comfortable sedans to spacious tempo travellers,
            we provide clean, well-maintained vehicles for every trip.
          </p>

        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-20">

          {fleet.map((car, index) => (

            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.12,
                duration: .6,
              }}
              viewport={{ once: true }}
              className="group rounded-3xl bg-[#111827]
              border border-white/10 overflow-hidden
              hover:border-yellow-500
              hover:-translate-y-3
              duration-500"
            >

              {/* Image */}

              <div className="overflow-hidden bg-gradient-to-b from-[#1c2333] to-[#0b0d18]">

                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-64 object-contain p-5
                  group-hover:scale-110
                  transition duration-700"
                />

              </div>

              {/* Content */}

              <div className="p-7">

                <h3 className="text-2xl font-bold text-white">

                  {car.name}

                </h3>

                <div className="inline-block mt-3 bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold">

                  {car.seats}

                </div>

                {/* Features */}

                <div className="grid grid-cols-2 gap-4 mt-7">

                  <Feature
                    icon={<FaUsers />}
                    text="Comfort"
                  />

                  <Feature
                    icon={<FaSnowflake />}
                    text="AC"
                  />

                  <Feature
                    icon={<FaSuitcase />}
                    text="Luggage"
                  />

                  <Feature
                    icon="✔"
                    text="Driver"
                  />

                </div>

                {/* Button */}

                <a
                  href="tel:9229129633"
                  className="mt-8 flex justify-center items-center gap-3
                  bg-yellow-500
                  text-black
                  font-bold
                  py-4
                  rounded-full
                  hover:bg-yellow-400
                  hover:scale-105
                  transition"
                >

                  <FaPhoneAlt />

                  Book Now

                </a>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-gray-300">

      <span className="text-yellow-400">
        {icon}
      </span>

      <span>{text}</span>

    </div>
  );
}