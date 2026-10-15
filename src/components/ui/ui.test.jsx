import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaPhoneAlt } from "react-icons/fa";
import { describe, expect, it, vi } from "vitest";

import Button from "./Button";
import FormField from "./FormField";
import Img from "./Img";
import SectionHeading from "./SectionHeading";
import { renderWithProviders } from "../../test/utils";

describe("Button", () => {
  it("renders a <button type=button> by default and handles clicks", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Book</Button>);
    const button = screen.getByRole("button", { name: "Book" });
    expect(button).toHaveAttribute("type", "button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders a link when given href; external links open in a new tab", () => {
    render(
      <>
        <Button href="tel:+919229129633" icon={FaPhoneAlt}>Call</Button>
        <Button href="https://wa.me/919229129633">WhatsApp</Button>
      </>
    );
    expect(screen.getByRole("link", { name: "Call" })).not.toHaveAttribute("target");
    const wa = screen.getByRole("link", { name: "WhatsApp" });
    expect(wa).toHaveAttribute("target", "_blank");
    expect(wa).toHaveAttribute("rel", "noreferrer");
  });

  it("allows type=submit and disabled", () => {
    render(<Button type="submit" disabled>Send</Button>);
    const button = screen.getByRole("button", { name: "Send" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
  });
});

describe("FormField", () => {
  it("connects the label to the input and shows the error", () => {
    render(
      <FormField label="Pickup" htmlFor="p" error="Please enter a pickup location.">
        <input id="p" />
      </FormField>
    );
    expect(screen.getByLabelText("Pickup")).toBeInTheDocument();
    expect(screen.getByText("Please enter a pickup location.")).toBeInTheDocument();
  });
});

describe("Img", () => {
  const image = { src: "/a-768w.webp", srcSet: "/a-480w.webp 480w, /a-768w.webp 768w" };

  it("is lazy by default", () => {
    render(<Img image={image} alt="Car" />);
    const img = screen.getByAltText("Car");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("srcset", image.srcSet);
  });

  it("loads eagerly with high priority when priority is set", () => {
    render(<Img image={image} alt="Hero" priority />);
    const img = screen.getByAltText("Hero");
    expect(img).toHaveAttribute("loading", "eager");
    expect(img).toHaveAttribute("fetchpriority", "high");
  });
});

describe("SectionHeading", () => {
  it("renders eyebrow, title (h2) and description", () => {
    renderWithProviders(<SectionHeading eyebrow="Our Fleet" title="Choose Your Ride" description="Clean cars" />);
    expect(screen.getByRole("heading", { level: 2, name: "Choose Your Ride" })).toBeInTheDocument();
    expect(screen.getByText("Our Fleet")).toBeInTheDocument();
    expect(screen.getByText("Clean cars")).toBeInTheDocument();
  });
});
