"use client";

import { useState } from "react";

interface ShareButtonsProps {
  reportUrl: string;
}

export default function ShareButtons({ reportUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const isAbsolute = reportUrl.startsWith("http");
  const fullUrl =
    typeof window !== "undefined"
      ? isAbsolute
        ? reportUrl
        : `${window.location.origin}${reportUrl}`
      : isAbsolute
        ? reportUrl
        : `https://thedoorpost.com${reportUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        window.prompt("Copy report link:", fullUrl);
      } catch {
        // no-op
      }
    }
  };

  const shareText = "Check out this above-the-fold analysis from TheDoorpost";
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        marginBottom: 24,
      }}
    >
      <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Share:</span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="button secondary"
        style={{ padding: "8px 14px", fontSize: "0.9rem" }}
      >
        X / Twitter
      </a>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="button secondary"
        style={{ padding: "8px 14px", fontSize: "0.9rem" }}
      >
        LinkedIn
      </a>
      <button
        onClick={handleCopy}
        className="button secondary"
        style={{ padding: "8px 14px", fontSize: "0.9rem" }}
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
