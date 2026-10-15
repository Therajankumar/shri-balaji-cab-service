import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { validBooking } from "../test/utils";
import useBookingForm from "./useBookingForm";

const submitEvent = () => ({ preventDefault: vi.fn() });

function fill(result, values) {
  act(() => {
    Object.entries(values).forEach(([name, value]) => result.current.setField(name, value));
  });
}

describe("useBookingForm (EmailJS not configured)", () => {
  it("starts empty with the Local trip type", () => {
    const { result } = renderHook(() => useBookingForm());
    expect(result.current.values.tripType).toBe("local");
    expect(result.current.values.pickup).toBe("");
    expect(result.current.status).toBe("idle");
  });

  it("shows errors and does not submit when required fields are missing", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const { result } = renderHook(() => useBookingForm());

    await act(() => result.current.handleSubmit(submitEvent()));

    expect(Object.keys(result.current.errors).sort()).toEqual(["name", "phone", "pickup"]);
    expect(result.current.status).toBe("idle");
    expect(open).not.toHaveBeenCalled();
  });

  it("clears a field's error as soon as the user edits it", async () => {
    const { result } = renderHook(() => useBookingForm());
    await act(() => result.current.handleSubmit(submitEvent()));
    expect(result.current.errors.name).toBeTruthy();

    act(() => result.current.handleChange({ target: { name: "name", value: "Ravi" } }));
    expect(result.current.errors.name).toBeUndefined();
    expect(result.current.values.name).toBe("Ravi");
  });

  it("falls back to WhatsApp with the booking pre-filled", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const { result } = renderHook(() => useBookingForm());
    fill(result, validBooking);

    await act(() => result.current.handleSubmit(submitEvent()));

    expect(result.current.status).toBe("whatsapp");
    expect(open).toHaveBeenCalledTimes(1);
    expect(open.mock.calls[0][0]).toMatch(/^https:\/\/wa\.me\/919229129633\?text=/);
    expect(result.current.whatsappLink).toBe(open.mock.calls[0][0]);
  });

  it("applies a prefill (vehicle / trip type) whenever its nonce changes, keeping typed values", () => {
    const { result, rerender } = renderHook(({ prefill }) => useBookingForm(prefill), {
      initialProps: { prefill: { nonce: 0 } },
    });
    fill(result, { name: "Asha" });

    rerender({ prefill: { vehicle: "Kia Carens", nonce: 1 } });
    expect(result.current.values.vehicle).toBe("Kia Carens");
    expect(result.current.values.name).toBe("Asha");

    rerender({ prefill: { tripType: "outstation", nonce: 2 } });
    expect(result.current.values.tripType).toBe("outstation");
    expect(result.current.values.vehicle).toBe("Kia Carens");
  });
});
