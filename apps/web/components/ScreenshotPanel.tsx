export default function ScreenshotPanel({
  imageUrl,
  alt,
}: {
  imageUrl: string;
  alt: string;
}) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <img
        src={imageUrl}
        alt={alt}
        style={{ width: "100%", display: "block" }}
        loading="lazy"
      />
    </div>
  );
}
