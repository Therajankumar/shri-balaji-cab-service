import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@emailjs/browser", () => ({ default: { send: vi.fn(() => Promise.resolve({ status: 200 })) } }));

import emailjs from "@emailjs/browser";
import { validBooking } from "../test/utils";
import {
  buildWhatsAppLink,
  emptyInquiry,
  isEmailConfigured,
  sendInquiryEmail,
  validateInquiry,
} from "./inquiry";

const withValues = (overrides) => ({ ...emptyInquiry, ...validBooking, ...overrides });

describe("validateInquiry", () => {
  it("accepts a complete booking", () => {
    expect(validateInquiry(withValues({}))).toEqual({});
  });

  it("requires pickup, name and phone on an empty form", () => {
    expect(Object.keys(validateInquiry(emptyInquiry)).sort()).toEqual(["name", "phone", "pickup"]);
  });

  it("does not require drop, date, time, vehicle, email or notes", () => {
    const errors = validateInquiry(
      withValues({ drop: "", date: "", time: "", vehicle: "", email: "", message: "" })
    );
    expect(errors).toEqual({});
  });

  it("rejects names and pickups shorter than 2 characters", () => {
    const errors = validateInquiry(withValues({ name: " A ", pickup: "x" }));
    expect(errors.name).toBeTruthy();
    expect(errors.pickup).toBeTruthy();
  });

  it.each(["9876543210", "98765 43210", "98765-43210", "+919876543210", "919876543210", "09876543210", "6000000000"])(
    "accepts valid Indian mobile number %s",
    (phone) => {
      expect(validateInquiry(withValues({ phone })).phone).toBeUndefined();
    }
  );

  it.each(["", "12345", "5876543210", "98765432", "987654321012", "abcdefghij", "+1 9876543210"])(
    "rejects invalid mobile number %j",
    (phone) => {
      expect(validateInquiry(withValues({ phone })).phone).toMatch(/10-digit/);
    }
  );

  it.each(["not-an-email", "a@b", "a b@c.com"])("rejects invalid email %s", (email) => {
    expect(validateInquiry(withValues({ email })).email).toMatch(/valid email/);
  });
});

describe("buildWhatsAppLink", () => {
  it("links to the business WhatsApp number with all trip details", () => {
    const url = new URL(buildWhatsAppLink(withValues({})));
    expect(url.origin + url.pathname).toBe("https://wa.me/919229129633");

    const text = url.searchParams.get("text");
    expect(text).toContain("Trip: Airport");
    expect(text).toContain("Pickup: Sector 15, Faridabad");
    expect(text).toContain("Drop: IGI Airport T3");
    expect(text).toContain("When: 2026-12-01 05:30");
    expect(text).toContain("Vehicle: Maruti Dzire");
    expect(text).toContain("Name: Test User");
    expect(text).toContain("Phone: 98765 43210");
    expect(text).toContain("Email: test@example.com");
    expect(text).toContain("Notes: 2 bags");
  });

  it("leaves out optional fields that are empty", () => {
    const text = new URL(
      buildWhatsAppLink(withValues({ drop: "", vehicle: "", email: "", message: "", date: "", time: "" }))
    ).searchParams.get("text");
    expect(text).not.toMatch(/Drop:|Vehicle:|Email:|Notes:/);
    expect(text).toContain("When: Not specified");
  });

  it("safely encodes special characters", () => {
    const link = buildWhatsAppLink(withValues({ message: "Return & 2 kids? #urgent" }));
    expect(link).not.toContain(" ");
    expect(new URL(link).searchParams.get("text")).toContain("Notes: Return & 2 kids? #urgent");
  });
});

describe("sendInquiryEmail", () => {
  beforeEach(() => emailjs.send.mockClear());

  it("is not configured when the VITE_EMAILJS_* variables are missing", () => {
    expect(isEmailConfigured).toBe(false);
  });

  it("sends every field as a template variable", async () => {
    await sendInquiryEmail(withValues({}));
    expect(emailjs.send).toHaveBeenCalledTimes(1);

    const params = emailjs.send.mock.calls[0][2];
    expect(params).toMatchObject({
      trip_type: "Airport",
      pickup: "Sector 15, Faridabad",
      drop: "IGI Airport T3",
      travel_date: "2026-12-01",
      travel_time: "05:30",
      vehicle: "Maruti Dzire",
      from_name: "Test User",
      phone: "98765 43210",
      from_email: "test@example.com",
      reply_to: "test@example.com",
      message: "2 bags",
    });
    expect(params.submitted_at).toBeTruthy();
  });

  it("fills sensible defaults for optional fields", async () => {
    await sendInquiryEmail(withValues({ drop: "", date: "", time: "", vehicle: "", email: "", message: "" }));
    expect(emailjs.send.mock.calls[0][2]).toMatchObject({
      drop: "Not specified",
      travel_date: "Not specified",
      travel_time: "Not specified",
      vehicle: "Any",
      from_email: "Not provided",
      reply_to: "",
      message: "—",
    });
  });
});
