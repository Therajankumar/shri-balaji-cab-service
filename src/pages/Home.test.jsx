import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { fleet, navLinks, services } from "../data/content";
import { renderWithProviders } from "../test/utils";
import Home from "./Home";

describe("Home page (integration)", () => {
  it("renders every section the navbar links to", () => {
    const { container } = renderWithProviders(<Home />);
    navLinks.forEach((link) => expect(container.querySelector(`#${link.id}`)).not.toBeNull());
  });

  it("has exactly one h1", () => {
    renderWithProviders(<Home />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders a card for every vehicle and service", () => {
    renderWithProviders(<Home />);
    fleet.forEach((car) => expect(screen.getByRole("heading", { name: car.name })).toBeInTheDocument());
    services.forEach((s) => expect(screen.getByRole("heading", { name: s.title })).toBeInTheDocument());
  });

  it("fleet 'Book Now' pre-selects that vehicle in the hero booking form", async () => {
    const { container } = renderWithProviders(<Home />);
    const heroForm = container.querySelector("#book");

    const buttons = screen.getAllByRole("button", { name: "Book Now" });
    await userEvent.click(buttons[3]); // Kia Carens

    expect(within(heroForm).getByLabelText("Vehicle")).toHaveValue(fleet[3].name);
  });

  it("service 'Book … Ride' pre-selects that trip type", async () => {
    const { container } = renderWithProviders(<Home />);
    await userEvent.click(screen.getByRole("button", { name: /Book Outstation Ride/ }));

    const heroForm = container.querySelector("#book");
    expect(within(heroForm).getByRole("radio", { name: /Outstation/ })).toHaveAttribute("aria-checked", "true");
  });

  it("mobile menu button toggles the menu", async () => {
    renderWithProviders(<Home />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  });

  it("all phone, email and WhatsApp links point to the business", () => {
    renderWithProviders(<Home />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    hrefs.filter((h) => h.startsWith("tel:")).forEach((h) => expect(h).toMatch(/^tel:\+91(9229129633|8383043915)$/));
    hrefs.filter((h) => h.includes("wa.me")).forEach((h) => expect(h).toMatch(/^https:\/\/wa\.me\/919229129633/));
    hrefs.filter((h) => h.startsWith("mailto:")).forEach((h) => expect(h).toMatch(/@gmail\.com$/));
  });
});
