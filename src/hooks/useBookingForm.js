import { useState } from "react";

import {
  buildWhatsAppLink,
  emptyInquiry,
  isEmailConfigured,
  sendInquiryEmail,
  validateInquiry,
} from "../lib/inquiry";

function pickPrefill({ tripType, vehicle } = {}) {
  return {
    ...(tripType && { tripType }),
    ...(vehicle !== undefined && { vehicle }),
  };
}

// Form state, validation and submission for a booking / inquiry form.
// `prefill` ({ tripType?, vehicle?, nonce }) is merged into the form whenever its nonce changes.
export default function useBookingForm(prefill) {
  const [values, setValues] = useState(() => ({ ...emptyInquiry, ...pickPrefill(prefill) }));
  const [errors, setErrors] = useState({});
  // idle | sending | success | whatsapp | error
  const [status, setStatus] = useState("idle");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [appliedNonce, setAppliedNonce] = useState(prefill?.nonce);

  if (prefill && prefill.nonce !== appliedNonce) {
    setAppliedNonce(prefill.nonce);
    setValues((prev) => ({ ...prev, ...pickPrefill(prefill) }));
    setStatus("idle");
  }

  function setField(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }

  function handleChange(e) {
    setField(e.target.name, e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateInquiry(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const link = buildWhatsAppLink(values);
    setWhatsappLink(link);

    // Without EmailJS credentials, deliver the request through WhatsApp instead.
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
      console.error("Failed to send booking request:", err);
      setStatus("error");
    }
  }

  return { values, errors, status, whatsappLink, setField, handleChange, handleSubmit };
}
