# Component Specifications

## AnalyzerForm

Props

- defaultUrl?: string

Behavior

- Validates URL.
- Submits to /api/analyze.
- Shows loading and errors.

States

- idle
- loading
- success
- error

## ReportCard

Props

- report: { overall_score, summary, metrics, fixes[] }

Behavior

- Displays total score, metrics, and fixes.
- Shows upgrade CTA for low score.

## ScreenshotPanel

Props

- imageUrl: string
- alt: string

Behavior

- Image lazy load.
- Fallback placeholder.

## PricingCTA

Props

- plan: string
- price: string
- features[]

Behavior

- Static CTA blocks for landing and report pages.

## IndustryLandingBlock

Props

- industry: string
- benefits[]

Behavior

- Used in programmatic SEO pages.

## ProgressStepper

Props

- progress: number
- message: string

Behavior

- Visual progress with labeled steps.
- Used during analysis to reduce bounce.
