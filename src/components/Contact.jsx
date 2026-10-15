import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import bg from "../assets/contact-bg.png";
import {
  BUSINESS_PHONE,
  buildWhatsAppLink,
  emptyInquiry,
  isEmailConfigured,
  sendInquiryEmail,
  validateInquiry,
} from "../lib/inquiry";

export default function Contact() {
  const [values, setValues] = useState(emptyInquiry);
  const [errors, setErrors] = useState({});
  // idle | sending | success | whatsapp | error
  const [status, setStatus] = useState("idle");
  const [whatsappLink, setWhatsappLink] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateInquiry(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const link = buildWhatsAppLink(values);
    setWhatsappLink(link);

    // Without EmailJS credentials, deliver the inquiry through WhatsApp instead.
    if (!isEmailConfigured) {
      window.open(link, "_blank", "noopener,noreferrer");
      setStatus("whatsapp");
      return;
    }

    setStatus("sending");
    try {
      await sendInquiryEmail(values);
      setStatus("success");
      setValues(emptyInquiry);
    } catch (err) {
      console.error("Failed to send inquiry:", err);
      setStatus("error");
    }
  }

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
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#111827]/80 backdrop-blur-xl rounded-3xl p-10 border border-white/10"
          >

            <Field error={errors.name}>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Your Name *"
                autoComplete="name"
                className={inputClass(errors.name)}
              />
            </Field>

            <Field error={errors.email}>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email Address"
                autoComplete="email"
                className={inputClass(errors.email)}
              />
            </Field>

            <Field error={errors.phone}>
              <input
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                placeholder="Phone Number *"
                autoComplete="tel"
                className={inputClass(errors.phone)}
              />
            </Field>

            <Field error={errors.message}>
              <textarea
                rows="6"
                name="message"
                value={values.message}
                onChange={handleChange}
                placeholder="Tell us about your trip... (pickup, drop, date, vehicle) *"
                className={`${inputClass(errors.message)} resize-none`}
              ></textarea>
            </Field>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-3 w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-bold transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Inquiry"}
            </button>

            {status === "success" && (
              <p className="mt-5 text-green-400" role="status">
                Thank you! Your inquiry has been sent. We will call you back shortly.
              </p>
            )}

            {status === "whatsapp" && (
              <p className="mt-5 text-green-400" role="status">
                Your inquiry has been opened in WhatsApp — just press send.
                {" "}
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="underline">
                  Open again
                </a>
              </p>
            )}

            {status === "error" && (
              <p className="mt-5 text-red-400" role="alert">
                Sorry, we couldn't send your inquiry right now.
                {" "}
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="underline text-green-400">
                  Send it on WhatsApp
                </a>
                {" "}or call{" "}
                <a href={`tel:${BUSINESS_PHONE}`} className="underline text-yellow-400">
                  +91 {BUSINESS_PHONE}
                </a>.
              </p>
            )}

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
function Field({ error, children }) {
  return (
    <div className="mb-5">
      {children}
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return `w-full bg-[#1b2333] p-4 rounded-xl text-white outline-none border ${
    error ? "border-red-500" : "border-transparent focus:border-yellow-500"
  }`;
}
