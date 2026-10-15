// Single source of truth for business details used across the site.
export const site = {
  name: "Shri Balaji Faridabad Cab Service",
  shortName: "Shri Balaji",
  tagline: "Faridabad Cab Service",
  motto: "Safe Journey, Every Time",
  description:
    "Premium taxi service for airport transfers, local rides, Delhi NCR and outstation trips with All India Permit vehicles.",
  phones: ["9229129633", "8383043915"],
  whatsapp: "919229129633",
  emails: {
    main: "shribalajicabservices.fbd@gmail.com",
    alternate: "rkramankmr1@gmail.com",
  },
  serviceArea: "Faridabad • Delhi NCR • All India Permit",
  hours: "24 Hours • 7 Days a Week",
  developer: {
    name: "Rajan Kumar",
    handle: "@the_rajan_thakur",
  },
};

export const primaryPhone = site.phones[0];

export function formatPhone(phone) {
  return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
}

export function telHref(phone = primaryPhone) {
  return `tel:+91${phone}`;
}

export function mailHref(email) {
  return `mailto:${email}`;
}

export function whatsappHref(text) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
