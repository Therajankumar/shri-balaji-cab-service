import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { fleet } from "../../data/content";
import { renderWithProviders } from "../../test/utils";
import BookingForm from "./BookingForm";

describe("BookingForm", () => {
  it("shows trip type tabs with Local selected, and can switch", async () => {
    renderWithProviders(<BookingForm id="t" />);
    const group = screen.getByRole("radiogroup", { name: "Trip type" });
    expect(within(group).getByRole("radio", { name: /Local/ })).toHaveAttribute("aria-checked", "true");

    await userEvent.click(within(group).getByRole("radio", { name: /Airport/ }));
    expect(within(group).getByRole("radio", { name: /Airport/ })).toHaveAttribute("aria-checked", "true");
    expect(within(group).getByRole("radio", { name: /Local/ })).toHaveAttribute("aria-checked", "false");
    // Airport trips suggest an airport as drop location
    expect(screen.getByLabelText("Drop")).toHaveAttribute("placeholder", "e.g. IGI Airport T3");
  });

  it("lists every fleet vehicle plus 'any vehicle'", () => {
    renderWithProviders(<BookingForm id="t" />);
    const options = within(screen.getByLabelText("Vehicle")).getAllByRole("option");
    expect(options).toHaveLength(fleet.length + 1);
  });

  it("does not allow past dates", () => {
    renderWithProviders(<BookingForm id="t" />);
    expect(screen.getByLabelText("Date").getAttribute("min")).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("compact variant hides email & notes; full variant shows them", () => {
    const { unmount } = renderWithProviders(<BookingForm id="a" />);
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
    unmount();

    renderWithProviders(<BookingForm id="b" variant="full" title="Send an Inquiry" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Notes")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Send an Inquiry" })).toBeInTheDocument();
  });

  it("shows validation messages when submitted empty", async () => {
    renderWithProviders(<BookingForm id="t" />);
    await userEvent.click(screen.getByRole("button", { name: /Request Booking/ }));
    expect(screen.getByText("Please enter a pickup location.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid 10-digit mobile number.")).toBeInTheDocument();
  });

  it("submits a valid booking to WhatsApp and confirms to the user", async () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    renderWithProviders(<BookingForm id="t" />);

    await userEvent.type(screen.getByLabelText("Pickup *"), "Sector 21, Faridabad");
    await userEvent.type(screen.getByLabelText("Your Name *"), "Neha");
    await userEvent.type(screen.getByLabelText("Mobile Number *"), "9811122233");
    await userEvent.selectOptions(screen.getByLabelText("Vehicle"), "Toyota Innova Crysta");
    await userEvent.click(screen.getByRole("button", { name: /Request Booking/ }));

    expect(open).toHaveBeenCalledTimes(1);
    const text = new URL(open.mock.calls[0][0]).searchParams.get("text");
    expect(text).toContain("Pickup: Sector 21, Faridabad");
    expect(text).toContain("Vehicle: Toyota Innova Crysta");
    expect(screen.getByText(/opened in WhatsApp/)).toBeInTheDocument();
  });

  it("offers a call link while idle", () => {
    renderWithProviders(<BookingForm id="t" />);
    expect(screen.getByRole("link", { name: /Call \+91 92291 29633/ })).toHaveAttribute("href", "tel:+919229129633");
  });
});
