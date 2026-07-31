// import { motion } from "framer-motion";
// import {
//   FaPhoneAlt,
//   FaWhatsapp,
//   FaMapMarkerAlt,
//   FaPlaneDeparture,
//   FaShieldAlt,
//   FaClock,
// } from "react-icons/fa";

// import heroCar from "../assets/hero-car.png";
// import heroBg from "../assets/hero-bg-pattern.png";

// export default function Hero() {
//   return (
//     <section
//       id="home"
//       className="relative min-h-screen overflow-hidden bg-[#050816]"
//     >
//       {/* Background Pattern */}

//       <img
//         src={heroBg}
//         alt=""
//         className="absolute inset-0 w-full h-full object-cover opacity-20"
//       />

//       {/* Overlay */}

//       <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/95 via-[#050816]/85 to-transparent" />

//       <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 items-center gap-16">

//         {/* LEFT */}

//         <motion.div
//           initial={{ opacity: 0, x: -70 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: .8 }}
//         >

//           <span className="inline-block bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full">

//             🚖 Trusted Cab Service

//           </span>

//           <h1 className="mt-8 text-6xl lg:text-7xl font-black leading-tight text-white">

//             Safe & Reliable

//             <span className="text-yellow-400">

//               {" "}Cab Service

//             </span>

//             <br />

//             Across India

//           </h1>

//           <p className="mt-8 text-gray-300 text-lg leading-8 max-w-xl">

//             Experience premium travel with
//             Shri Balaji Faridabad Cab Service.

//             Airport Pickup,
//             Local Rides,
//             Delhi NCR,
//             Outstation Trips,
//             and All India Permit.

//           </p>

//           <div className="flex flex-wrap gap-5 mt-10">

//             <a
//               href="tel:9229129633"
//               className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold flex items-center gap-3 hover:scale-105 duration-300"
//             >
//               <FaPhoneAlt />

//               Call Now

//             </a>

//             <a
//               href="https://wa.me/919229129633"
//               target="_blank"
//               rel="noreferrer"
//               className="border border-green-500 text-green-400 px-8 py-4 rounded-full font-semibold flex items-center gap-3 hover:bg-green-500 hover:text-white duration-300"
//             >
//               <FaWhatsapp />

//               WhatsApp

//             </a>

//           </div>

//           <div className="grid grid-cols-2 gap-6 mt-14">

//             <Feature
//               icon={<FaMapMarkerAlt />}
//               text="All India Permit"
//             />

//             <Feature
//               icon={<FaPlaneDeparture />}
//               text="Airport Pickup"
//             />

//             <Feature
//               icon={<FaClock />}
//               text="24 × 7 Service"
//             />

//             <Feature
//               icon={<FaShieldAlt />}
//               text="Safe Journey"
//             />

//           </div>

//         </motion.div>

//         {/* RIGHT */}

//         <motion.div
//           initial={{ opacity: 0, x: 80 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: .9 }}
//           className="relative"
//         >

//           <img
//             src={heroCar}
//             alt="Cab"
//             className="w-full hover:scale-105 duration-700"
//           />

//         </motion.div>

//       </div>

//     </section>
//   );
// }

// function Feature({ icon, text }) {
//   return (
//     <div className="flex items-center gap-3">

//       <div className="text-yellow-400 text-xl">

//         {icon}

//       </div>

//       <span className="text-gray-300">

//         {text}

//       </span>

//     </div>
//   );
// }
// export default function Hero() {
//   return (
//     <section className="min-h-screen flex items-center justify-center bg-black text-white">
//       <h1 className="text-5xl font-bold">Hero Working ✅</h1>
//     </section>
//   );
// }
import { motion } from "framer-motion";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import heroCar from "../assets/hero-car.png";
import heroBg from "../assets/hero-bg-pattern.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#070B16] pt-24"
    >
      {/* Background */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-7xl mx-auto px-6 min-h-screen grid lg:grid-cols-2 items-center gap-10">

        {/* Left */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold">
            🚖 Premium Cab Service
          </span>

          <h1 className="mt-8 text-6xl font-bold text-white leading-tight">
            Shri Balaji
            <br />
            <span className="text-yellow-400">
              Faridabad Cab Service
            </span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg leading-8">
            Airport Pickup • Local Trips • Delhi NCR •
            Outstation • All India Permit
          </p>

          <div className="flex gap-5 mt-10">

            <a
              href="tel:9229129633"
              className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold flex items-center gap-3 hover:scale-105 transition"
            >
              <FaPhoneAlt />
              Call Now
            </a>

            <a
              href="https://wa.me/919229129633"
              target="_blank"
              rel="noreferrer"
              className="border border-green-500 text-green-400 px-8 py-4 rounded-full font-semibold flex items-center gap-3 hover:bg-green-500 hover:text-white transition"
            >
              <FaWhatsapp />
              WhatsApp
            </a>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={heroCar}
            alt="Cab"
            className="w-full hover:scale-105 transition duration-700"
          />
        </motion.div>

      </div>
    </section>
  );
}