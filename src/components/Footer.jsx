import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaArrowUp,
  FaCarSide,
} from "react-icons/fa";

import logo from "../assets/logo.png";
import footerBg from "../assets/footer-pattern.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#030712]">

      {/* Background */}

      <img
        src={footerBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/95 to-[#030712]/90"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Company */}

          <div>

            <img
              src={logo}
              alt="Logo"
              className="h-20 mb-6"
            />

            <p className="text-gray-400 leading-8">

              Shri Balaji Faridabad Cab Service provides
              premium taxi services including
              Local Rides,
              Airport Pickup & Drop,
              Delhi NCR,
              Outstation Travel,
              and All India Permit journeys.

            </p>

            <a
              href="https://wa.me/919229129633"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 mt-8 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold text-white transition hover:scale-105"
            >
              <FaWhatsapp />
              WhatsApp
            </a>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-white text-2xl font-bold mb-7">
              Quick Links
            </h3>

            <FooterLink href="#home">Home</FooterLink>
            <FooterLink href="#services">Services</FooterLink>
            <FooterLink href="#fleet">Fleet</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>

          </div>

          {/* Services */}

          <div>

            <h3 className="text-white text-2xl font-bold mb-7">
              Our Services
            </h3>

            <FooterItem>Airport Pickup & Drop</FooterItem>
            <FooterItem>Local City Travel</FooterItem>
            <FooterItem>Delhi NCR Cab</FooterItem>
            <FooterItem>Outstation Trips</FooterItem>
            <FooterItem>All India Permit</FooterItem>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-white text-2xl font-bold mb-7">
              Contact Info
            </h3>

            <ContactItem
              icon={<FaPhoneAlt />}
              text="+91 9229129633"
            />

            <ContactItem
              icon={<FaPhoneAlt />}
              text="+91 8383043915"
            />

            <ContactItem
              icon={<FaEnvelope />}
              text="shribalajicabservices.fbd@gmail.com"
            />

            <ContactItem
              icon={<FaMapMarkerAlt />}
              text="Faridabad • Delhi NCR • All India"
            />

          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-yellow-500/20 my-14"></div>

        {/* Bottom */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

          <div>

            <p className="text-gray-400 text-center lg:text-left">

              © {new Date().getFullYear()} Shri Balaji Faridabad Cab Service.

              All Rights Reserved.

            </p>

            <p className="text-sm text-gray-500 mt-3 text-center lg:text-left">

              Designed & Developed with ❤️ by

              <span className="text-yellow-400 font-semibold">
                {" "}Rajan Kumar
              </span>

              {" "}(@the_rajan_thakur)

            </p>

          </div>

          {/* Developer Card */}

          <div className="bg-[#111827] border border-yellow-500/20 rounded-2xl px-8 py-5 flex items-center gap-5">

            <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center text-black text-2xl">

              <FaCarSide />

            </div>

            <div>

              <h4 className="text-white font-bold">

                Built using React.js

              </h4>

              <p className="text-gray-400 text-sm">

                Crafted with Performance & Modern UI

              </p>

            </div>

          </div>

          {/* Scroll Button */}

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black flex items-center justify-center transition hover:-translate-y-1"
          >
            <FaArrowUp />
          </button>

        </div>

      </div>

    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="block text-gray-400 hover:text-yellow-400 transition mb-4"
    >
      {children}
    </a>
  );
}

function FooterItem({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">

      <span className="text-yellow-400">✔</span>

      <span className="text-gray-400">
        {children}
      </span>

    </div>
  );
}

function ContactItem({ icon, text }) {
  return (
    <div className="flex items-start gap-4 mb-5">

      <div className="text-yellow-400 mt-1">

        {icon}

      </div>

      <span className="text-gray-400 leading-7">

        {text}

      </span>

    </div>
  );
}