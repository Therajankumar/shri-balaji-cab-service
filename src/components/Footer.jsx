import { FaArrowUp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import { formatPhone, mailHref, site, telHref, whatsappHref } from "../config/site";
import { navLinks, services } from "../data/content";
import Button from "./ui/Button";
import Logo from "./ui/Logo";
import Img from "./ui/Img";
import { responsiveImage } from "../lib/images";

const background = responsiveImage("backgrounds/footer");

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <Img image={background} className="absolute inset-0 h-full w-full object-cover opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/95 to-ink/90" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.5fr]">
          <div>
            <Logo size="lg" />
            <p className="mt-6 leading-7 text-gray-400">{site.description}</p>
            <Button href={whatsappHref()} variant="whatsapp" icon={FaWhatsapp} className="mt-6">
              Chat on WhatsApp
            </Button>
          </div>

          <FooterColumn title="Quick Links">
            {navLinks.map((link) => (
              <FooterLink key={link.id} href={`#${link.id}`}>
                {link.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Our Services">
            {services.map((service) => (
              <FooterLink key={service.title} href="#services">
                {service.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact Info">
            {site.phones.map((phone) => (
              <FooterLink key={phone} href={telHref(phone)} icon={FaPhoneAlt}>
                {formatPhone(phone)}
              </FooterLink>
            ))}
            <FooterLink href={mailHref(site.emails.main)} icon={FaEnvelope}>
              {site.emails.main}
            </FooterLink>
            <li className="flex items-start gap-3 text-gray-400">
              <FaMapMarkerAlt className="mt-1.5 shrink-0 text-brand-light" aria-hidden="true" />
              {site.serviceArea}
            </li>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 text-center text-sm text-gray-500 md:flex-row md:text-left">
          <div>
            <p>
              © {new Date().getFullYear()} {site.name}. All Rights Reserved.
            </p>
            <p className="mt-1">
              Designed &amp; Developed by{" "}
              <span className="font-semibold text-brand-light">{site.developer.name}</span> ({site.developer.handle})
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FaArrowUp aria-hidden="true" />
          </Button>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="mb-6 text-lg font-bold text-white">{title}</h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, icon: Icon, children }) {
  return (
    <li>
      <a href={href} className="flex items-start gap-3 break-words text-gray-400 transition hover:text-brand-light">
        {Icon && <Icon className="mt-1.5 shrink-0 text-brand-light" aria-hidden="true" />}
        {children}
      </a>
    </li>
  );
}
