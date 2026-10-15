import emailjs from "@emailjs/browser";

import { whatsappHref } from "../config/site";
import { tripTypes } from "../data/content";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const isEmailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export const emptyInquiry = {
  tripType: "local",
  pickup: "",
  drop: "",
  date: "",
  time: "",
  vehicle: "",
  name: "",
  phone: "",
  email: "",
  message: "",
};

export function validateInquiry(values) {
  const errors = {};
  const email = values.email.trim();
  const phone = values.phone.replace(/[\s-]/g, "");

  if (values.pickup.trim().length < 2) errors.pickup = "Please enter a pickup location.";
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";

  if (!/^(\+?91|0)?[6-9]\d{9}$/.test(phone)) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

function tripLabel(id) {
  return tripTypes.find((t) => t.id === id)?.label ?? id;
}

function formatWhen(values) {
  return [values.date, values.time].filter(Boolean).join(" ") || "Not specified";
}

export function buildWhatsAppLink(values) {
  const text = [
    "*New Cab Booking Request*",
    `Trip: ${tripLabel(values.tripType)}`,
    `Pickup: ${values.pickup.trim()}`,
    values.drop.trim() && `Drop: ${values.drop.trim()}`,
    `When: ${formatWhen(values)}`,
    values.vehicle && `Vehicle: ${values.vehicle}`,
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    values.email.trim() && `Email: ${values.email.trim()}`,
    values.message.trim() && `Notes: ${values.message.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  return whatsappHref(text);
}

// Sends the booking request by email via EmailJS. Template variables available:
// {{trip_type}}, {{pickup}}, {{drop}}, {{travel_date}}, {{travel_time}}, {{vehicle}},
// {{from_name}}, {{phone}}, {{from_email}}, {{reply_to}}, {{message}}, {{submitted_at}}
export function sendInquiryEmail(values) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      trip_type: tripLabel(values.tripType),
      pickup: values.pickup.trim(),
      drop: values.drop.trim() || "Not specified",
      travel_date: values.date || "Not specified",
      travel_time: values.time || "Not specified",
      vehicle: values.vehicle || "Any",
      from_name: values.name.trim(),
      phone: values.phone.trim(),
      from_email: values.email.trim() || "Not provided",
      reply_to: values.email.trim(),
      message: values.message.trim() || "—",
      submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    },
    { publicKey: PUBLIC_KEY }
  );
}
