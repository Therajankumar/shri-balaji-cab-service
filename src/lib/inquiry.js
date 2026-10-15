import emailjs from "@emailjs/browser";

export const BUSINESS_PHONE = "9229129633";
export const BUSINESS_WHATSAPP = "919229129633";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const isEmailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export const emptyInquiry = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function validateInquiry(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.replace(/[\s-]/g, "");
  const message = values.message.trim();

  if (name.length < 2) errors.name = "Please enter your name.";

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!/^(\+?91|0)?[6-9]\d{9}$/.test(phone)) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }

  if (message.length < 5) errors.message = "Please tell us a little about your trip.";

  return errors;
}

export function buildWhatsAppLink(values) {
  const text = [
    "New Cab Inquiry",
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    values.email.trim() && `Email: ${values.email.trim()}`,
    `Trip: ${values.message.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

// Sends the inquiry by email via EmailJS. Template variables available:
// {{from_name}}, {{from_email}}, {{phone}}, {{message}}, {{submitted_at}}
export function sendInquiryEmail(values) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: values.name.trim(),
      from_email: values.email.trim() || "Not provided",
      reply_to: values.email.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
      submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    },
    { publicKey: PUBLIC_KEY }
  );
}
