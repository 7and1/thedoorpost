import "./globals.css";
import { Space_Grotesk, Newsreader } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import ErrorBoundary from "../components/ErrorBoundary";
import CookieConsent from "../components/CookieConsent";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = Newsreader({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "TheDoorpost — Above-the-Fold Analyzer",
  description:
    "Instant CRO analysis for your hero section. Scores, screenshots, and fixes in seconds.",
  metadataBase: new URL("https://thedoorpost.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TheDoorpost — Above-the-Fold Analyzer",
    description: "Score your hero section and get actionable CRO fixes.",
    url: "https://thedoorpost.com",
    siteName: "TheDoorpost",
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheDoorpost — Above-the-Fold Analyzer",
    description: "Score your hero section and get actionable CRO fixes.",
    images: ["/og.svg"],
    site: "@thedoorpost",
    creator: "@thedoorpost",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  authors: [{ name: "TheDoorpost Team", url: "https://thedoorpost.com/about" }],
  keywords: [
    "above the fold analyzer",
    "landing page CRO",
    "hero section analysis",
    "conversion rate optimization",
    "landing page audit",
    "CRO tool",
    "landing page critique",
    "homepage optimization",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        url: "https://thedoorpost.com",
        name: "TheDoorpost",
        description:
          "Instant CRO analysis for your hero section. Scores, screenshots, and fixes in seconds.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://thedoorpost.com/analyze?url={search_term_string}",
          "query-input": "required name=url",
        },
      },
      {
        "@type": "Organization",
        name: "TheDoorpost",
        url: "https://thedoorpost.com",
        logo: "https://thedoorpost.com/logo.svg",
        description:
          "Above-the-fold analyzer for conversion rate optimization.",
        sameAs: [],
      },
      {
        "@type": "Product",
        name: "TheDoorpost Hero Analyzer",
        description:
          "Analyze your landing page hero section for conversion optimization.",
        url: "https://thedoorpost.com",
        brand: {
          "@type": "Organization",
          name: "TheDoorpost",
        },
        offers: {
          "@type": "Offer",
          url: "https://thedoorpost.com/pricing",
          priceCurrency: "USD",
          price: "0",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Person",
        "@id": "https://thedoorpost.com/#author",
        name: "TheDoorpost Team",
        jobTitle: "CRO Specialists",
        description:
          "Conversion rate optimization experts with 10+ years of experience analyzing landing pages for startups and Fortune 500 companies.",
        url: "https://thedoorpost.com/about",
        worksFor: {
          "@type": "Organization",
          name: "TheDoorpost",
        },
        knowsAbout: [
          "Conversion Rate Optimization",
          "Landing Page Design",
          "A/B Testing",
          "User Experience",
          "Above-the-Fold Analysis",
          "Hero Section Optimization",
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
        <CookieConsent />
        {/* Cloudflare Web Analytics
          Token: Set NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN in .env
          Get token: https://dash.cloudflare.com/[account-id]/analytics/web
          Privacy: Cloudflare Web Analytics is cookie-free and GDPR compliant
        */}
        {process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN}"}`}
            defer
          />
        )}
      </body>
    </html>
  );
}
