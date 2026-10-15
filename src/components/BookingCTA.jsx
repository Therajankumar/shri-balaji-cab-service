import { motion } from "framer-motion";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import bg from "../assets/contact-bg.png";

export default function BookingCTA() {
  return (
    <section className="py-24 bg-[#050816]">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[40px]"
        >

          {/* Background */}

          <img
            src={bg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/75"></div>

          <div className="relative z-10 px-10 lg:px-20 py-20">

            <div className="max-w-3xl">

              <span className="inline-block bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold">
                Premium Cab Booking
              </span>

              <h2 className="text-5xl lg:text-6xl font-bold text-white mt-8 leading-tight">

                Book Your Ride
                <br />

                <span className="text-yellow-400">

                  Today

                </span>

              </h2>

              <p className="text-gray-300 mt-8 text-lg leading-8">

                Whether it's Airport Pickup,
                Local Travel,
                Delhi NCR,
                Outstation Trips
                or All India Permit,
                Shri Balaji Faridabad Cab Service
                is just one call away.

              </p>

              <div className="grid sm:grid-cols-2 gap-5 mt-10">

                <div className="flex items-center gap-3">

                  <span className="text-yellow-400">✔</span>

                  <span className="text-white">
                    Clean Vehicles
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <span className="text-yellow-400">✔</span>

                  <span className="text-white">
                    Professional Drivers
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <span className="text-yellow-400">✔</span>

                  <span className="text-white">
                    Affordable Pricing
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <span className="text-yellow-400">✔</span>

                  <span className="text-white">
                    24×7 Support
                  </span>

                </div>

              </div>

              <div className="flex flex-wrap gap-6 mt-12">

                <a
                  href="tel:9229129633"
                  className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 px-8 py-4 rounded-full font-bold text-black transition hover:scale-105"
                >

                  <FaPhoneAlt />

                  Call Now

                </a>

                <a
                  href="https://wa.me/919229129633"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 border border-green-500 text-green-400 px-8 py-4 rounded-full font-bold hover:bg-green-500 hover:text-white transition hover:scale-105"
                >

                  <FaWhatsapp />

                  WhatsApp

                </a>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}