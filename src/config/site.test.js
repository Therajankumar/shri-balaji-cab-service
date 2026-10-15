import { describe, expect, it } from "vitest";

import { formatPhone, mailHref, primaryPhone, site, telHref, whatsappHref } from "./site";

describe("site config helpers", () => {
  it("formats phone numbers for display", () => {
    expect(formatPhone("9229129633")).toBe("+91 92291 29633");
  });

  it("builds tel: links with the country code", () => {
    expect(telHref()).toBe(`tel:+91${primaryPhone}`);
    expect(telHref("8383043915")).toBe("tel:+918383043915");
  });

  it("builds mailto: links", () => {
    expect(mailHref(site.emails.main)).toBe("mailto:shribalajicabservices.fbd@gmail.com");
  });

  it("builds WhatsApp links with and without a message", () => {
    expect(whatsappHref()).toBe("https://wa.me/919229129633");
    expect(whatsappHref("Hi there")).toBe("https://wa.me/919229129633?text=Hi%20there");
  });

  it("has valid 10-digit phone numbers", () => {
    site.phones.forEach((phone) => expect(phone).toMatch(/^[6-9]\d{9}$/));
  });
});
