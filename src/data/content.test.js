import { describe, expect, it } from "vitest";

import { features, fleet, navLinks, services, stats, testimonials, tripTypes } from "./content";

describe("content data", () => {
  it("only uses trip types that exist", () => {
    const ids = tripTypes.map((t) => t.id);
    services.filter((s) => s.tripType).forEach((s) => expect(ids).toContain(s.tripType));
  });

  it("has unique keys (titles/names/ids)", () => {
    const unique = (list) => new Set(list).size === list.length;
    expect(unique(fleet.map((c) => c.name))).toBe(true);
    expect(unique(services.map((s) => s.title))).toBe(true);
    expect(unique(navLinks.map((l) => l.id))).toBe(true);
    expect(unique(features.map((f) => f.title))).toBe(true);
    expect(unique(testimonials.map((t) => t.name))).toBe(true);
    expect(unique(stats.map((s) => s.title))).toBe(true);
  });

  it("gives every vehicle an image, seats and category", () => {
    fleet.forEach((car) => {
      expect(car.image.src).toBeTruthy();
      expect(car.image.srcSet).toBeTruthy();
      expect(car.seats).toMatch(/Seater/);
      expect(car.category).toBeTruthy();
    });
  });

  it("gives every service an icon and 3 key points", () => {
    services.forEach((service) => {
      expect(service.icon).toBeTypeOf("function");
      expect(service.points).toHaveLength(3);
    });
  });
});
