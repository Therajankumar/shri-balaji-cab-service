import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import bg from "../assets/contact-bg.png";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 bg-[#050816] overflow-hidden"
    >
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="uppercase tracking-[4px] text-yellow-400 font-semibold">
            Contact Us
          </span>

          <h2 className="text-5xl font-bold text-white mt-4">
            Book Your Cab Today
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Contact Shri Balaji Faridabad Cab Service for airport transfers,
            local rides, Delhi NCR travel, and outstation journeys.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-14 mt-20">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
            className="space-y-8"
          >

            <Info
              icon={<FaPhoneAlt />}
              title="Phone Numbers"
              text={
                <>
                  +91 9229129633
                  <br />
                  +91 8383043915
                </>
              }
            />

            <Info
              icon={<FaEnvelope />}
              title="Main Email"
              text="shribalajicabservices.fbd@gmail.com"
            />

            <Info
              icon={<FaEnvelope />}
              title="Alternate Email"
              text="rkramankmr1@gmail.com"
            />

            <Info
              icon={<FaMapMarkerAlt />}
              title="Service Area"
              text="Faridabad • Delhi NCR • All India Permit"
            />

            <Info
              icon={<FaClock />}
              title="Availability"
              text="24 Hours • 7 Days a Week"
            />

          </motion.div>

          {/* RIGHT */}

          <motion.form
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
            className="bg-[#111827]/80 backdrop-blur-xl rounded-3xl p-10 border border-white/10"
          >

            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-[#1b2333] p-4 rounded-xl text-white outline-none mb-5"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-[#1b2333] p-4 rounded-xl text-white outline-none mb-5"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full bg-[#1b2333] p-4 rounded-xl text-white outline-none mb-5"
            />

            <textarea
              rows="6"
              placeholder="Tell us about your trip..."
              className="w-full bg-[#1b2333] p-4 rounded-xl text-white outline-none resize-none"
            ></textarea>

            <button
              className="mt-8 w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-bold transition"
            >
              Send Inquiry
            </button>

          </motion.form>

        </div>

      </div>
    </section>
  );
}

function Info({ icon, title, text }) {
  return (
    <div className="flex gap-5">

      <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-black text-2xl">
        {icon}
      </div>

      <div>

        <h3 className="text-white text-xl font-bold">
          {title}
        </h3>

        <p className="text-gray-400 mt-2 leading-7">
          {text}
        </p>

      </div>

    </div>
  );
}