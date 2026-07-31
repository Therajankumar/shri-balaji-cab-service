import { useState } from "react";
import { FaBars, FaTimes, FaCarSide, FaPhoneAlt } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { title: "Home", href: "#home" },
    { title: "Services", href: "#services" },
    { title: "Fleet", href: "#fleet" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <div className="bg-yellow-500 p-3 rounded-full">
            <FaCarSide className="text-black text-xl" />
          </div>

          <div>
            <h1 className="text-white text-lg font-bold">
              Shri Balaji
            </h1>

            <p className="text-gray-300 text-sm">
              Faridabad Cab Service
            </p>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">

          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="relative text-white font-medium hover:text-yellow-400 transition duration-300
              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-0 after:bg-yellow-400 after:transition-all after:duration-300
              hover:after:w-full"
            >
              {link.title}
            </a>
          ))}

          <a
            href="tel:9229129633"
            className="flex items-center gap-2 bg-yellow-500 text-black px-5 py-3 rounded-full
            font-semibold hover:bg-yellow-400 hover:scale-105 transition duration-300"
          >
            <FaPhoneAlt />
            Book Now
          </a>

        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-black transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-5 gap-5">

          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-yellow-400"
            >
              {link.title}
            </a>
          ))}

          <a
            href="tel:9229129633"
            className="bg-yellow-500 text-black text-center py-3 rounded-full font-semibold"
          >
            Book Now
          </a>

        </div>
      </div>
    </header>
  );
}