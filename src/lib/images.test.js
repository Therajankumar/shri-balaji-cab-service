import { describe, expect, it } from "vitest";

import { responsiveImage } from "./images";

describe("responsiveImage", () => {
  it("returns a srcset with every width, smallest first", () => {
    const image = responsiveImage("fleet/dezire");
    const widths = image.srcSet.split(", ").map((entry) => Number(entry.split(" ")[1].replace("w", "")));
    expect(widths).toEqual([480, 768]);
  });

  it("uses the largest file as the fallback src", () => {
    const image = responsiveImage("fleet/dezire");
    expect(image.src).toContain("dezire-768w");
  });

  it("throws a helpful error for a missing image", () => {
    expect(() => responsiveImage("fleet/does-not-exist")).toThrow(/not found/);
  });
});
