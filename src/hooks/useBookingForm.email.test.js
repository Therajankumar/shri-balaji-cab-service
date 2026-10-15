import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Simulate a site where the EmailJS keys ARE configured.
const sendInquiryEmail = vi.fn();
vi.mock("../lib/inquiry", async (importOriginal) => ({
  ...(await importOriginal()),
  isEmailConfigured: true,
  sendInquiryEmail: (...args) => sendInquiryEmail(...args),
}));

import { validBooking } from "../test/utils";
import useBookingForm from "./useBookingForm";

const submitEvent = () => ({ preventDefault: vi.fn() });

async function submitValid() {
  const hook = renderHook(() => useBookingForm());
  act(() => Object.entries(validBooking).forEach(([k, v]) => hook.result.current.setField(k, v)));
  await act(() => hook.result.current.handleSubmit(submitEvent()));
  return hook.result;
}

describe("useBookingForm (EmailJS configured)", () => {
  beforeEach(() => sendInquiryEmail.mockReset());

  it("emails the booking, shows success and resets the form", async () => {
    sendInquiryEmail.mockResolvedValue({ status: 200 });
    const open = vi.spyOn(window, "open").mockImplementation(() => null);

    const result = await submitValid();

    expect(sendInquiryEmail).toHaveBeenCalledWith(expect.objectContaining({ name: "Test User" }));
    expect(result.current.status).toBe("success");
    expect(result.current.values.name).toBe("");
    expect(open).not.toHaveBeenCalled();
  });

  it("shows an error with a WhatsApp fallback link when sending fails", async () => {
    sendInquiryEmail.mockRejectedValue(new Error("network down"));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await submitValid();

    expect(result.current.status).toBe("error");
    expect(result.current.whatsappLink).toMatch(/^https:\/\/wa\.me\//);
    expect(result.current.values.name).toBe("Test User"); // user's input is kept
  });
});
