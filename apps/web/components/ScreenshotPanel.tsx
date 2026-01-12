"use client";

import { useState } from "react";

export default function ScreenshotPanel({
  imageUrl,
  alt,
}: {
  imageUrl: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);
  const showFallback = failed || !imageUrl;

  return (
    <div
      className="card"
      style={{
        padding: 0,
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        minHeight: 220,
      }}
    >
      {showFallback ? (
        <div
          style={{
            padding: 24,
            textAlign: "center",
            color: "var(--muted)",
          }}
        >
          Screenshot unavailable.
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={alt}
          style={{ width: "100%", display: "block" }}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
