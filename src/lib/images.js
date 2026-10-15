// Every image in src/assets/images exists in several widths, named like
// "fleet/dezire-480w.webp" and "fleet/dezire-768w.webp".
// responsiveImage("fleet/dezire") returns { src, srcSet } so the browser can
// download only the size it needs for the visitor's screen.
const files = import.meta.glob("../assets/images/**/*.webp", {
  eager: true,
  import: "default",
});

export function responsiveImage(name) {
  const sources = Object.entries(files)
    .map(([path, url]) => {
      const match = path.match(/images\/(.+)-(\d+)w\.webp$/);
      return match && match[1] === name ? { url, width: Number(match[2]) } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.width - b.width);

  if (sources.length === 0) {
    throw new Error(`Image "${name}" not found in src/assets/images`);
  }

  return {
    src: sources[sources.length - 1].url,
    srcSet: sources.map((s) => `${s.url} ${s.width}w`).join(", "),
  };
}
