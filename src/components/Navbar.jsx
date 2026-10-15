import { useState } from "react";
import { FaBars, FaCalendarCheck, FaPhoneAlt, FaTimes } from "react-icons/fa";

import { formatPhone, primaryPhone, telHref } from "../config/site";
import { useBooking } from "../context/booking-context";
import { navLinks } from "../data/content";
import useActiveSection from "../hooks/useActiveSection";
import useScrolled from "../hooks/useScrolled";
import Button from "./ui/Button";
import Logo from "./ui/Logo";

const sectionIds = navLinks.map((link) => link.id);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const { startBooking } = useBooking();

  const solid = scrolled || menuOpen;

  function book() {
    setMenuOpen(false);
    startBooking();
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        solid ? "border-b border-line bg-ink/85 shadow-lg shadow-black/30 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Logo />

        {/* Desktop */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "page" : undefined}
              className={`relative text-sm font-medium transition hover:text-brand-light
              after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-brand after:transition-all after:duration-300
              ${active === link.id ? "text-brand-light after:w-full" : "text-gray-200 after:w-0 hover:after:w-full"}`}
            >
              {link.title}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={telHref()}
            className="flex items-center gap-2 text-sm font-semibold text-white transition hover:text-brand-light"
          >
            <FaPhoneAlt className="text-brand-light" aria-hidden="true" />
            {formatPhone(primaryPhone)}
          </a>
          <Button size="sm" icon={FaCalendarCheck} onClick={book}>
            Book a Cab
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="text-2xl text-white lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${menuOpen ? "max-h-[32rem]" : "max-h-0"}`}
      >
        <nav className="flex flex-col gap-1 px-5 pb-6" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
              className={`rounded-xl px-4 py-3 font-medium transition hover:bg-white/5 ${
                active === link.id ? "text-brand-light" : "text-gray-200"
              }`}
            >
              {link.title}
            </a>
          ))}

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Button href={telHref()} variant="ghost" icon={FaPhoneAlt}>
              Call
            </Button>
            <Button icon={FaCalendarCheck} onClick={book}>
              Book
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
