// Responsive, lazy-loaded image. `image` comes from responsiveImage().
// `sizes` tells the browser how wide the image is shown so it can pick the smallest file.
export default function Img({ image, sizes = "100vw", alt = "", priority = false, ...props }) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      {...props}
    />
  );
}
