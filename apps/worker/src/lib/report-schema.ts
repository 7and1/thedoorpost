import { z } from "zod";
import type { ReportData, ReportFix, ReportMetrics } from "@thedoorpost/shared";

const scoreSchema = z.coerce.number().min(0).max(100);

const fixSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(400),
  impact: z.enum(["low", "medium", "high"]).optional(),
});

const reportSchema = z
  .object({
    overall_score: scoreSchema,
    metrics: z.object({
      value_prop: scoreSchema,
      cta_visibility: scoreSchema,
      trust_design: scoreSchema,
    }),
    summary: z.string().min(1).max(1000),
    fixes: z.array(fixSchema).min(1).max(5),
    notes: z.array(z.string().min(1).max(200)).max(10).optional(),
  })
  .strict();

const partialReportSchema = z.object({
  overall_score: scoreSchema.optional(),
  metrics: z
    .object({
      value_prop: scoreSchema.optional(),
      cta_visibility: scoreSchema.optional(),
      trust_design: scoreSchema.optional(),
    })
    .partial()
    .optional(),
  summary: z.string().optional(),
  fixes: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        impact: z.enum(["low", "medium", "high"]).optional(),
      }),
    )
    .optional(),
  notes: z.array(z.string()).optional(),
});

function clampScore(value: number | undefined, fallback: number) {
  const safe = Number.isFinite(value) ? value : fallback;
  return Math.min(100, Math.max(0, Math.round(safe)));
}

function normalizeMetrics(input?: Partial<ReportMetrics>): ReportMetrics {
  const valueProp = clampScore(input?.value_prop, 0);
  const ctaVisibility = clampScore(input?.cta_visibility, 0);
  const trustDesign = clampScore(input?.trust_design, 0);
  return {
    value_prop: valueProp,
    cta_visibility: ctaVisibility,
    trust_design: trustDesign,
  };
}

function defaultFixes(): ReportFix[] {
  return [
    {
      title: "Clarify the main value proposition",
      description:
        "Make the primary outcome obvious in the headline and reinforce it with a short supporting line.",
      impact: "high",
    },
    {
      title: "Increase CTA contrast",
      description:
        "Ensure the primary CTA is visually dominant with higher contrast and clear spacing.",
      impact: "medium",
    },
    {
      title: "Add a trust signal near the CTA",
      description:
        "Include a logo row, rating, or proof statement close to the action area to reduce friction.",
      impact: "medium",
    },
  ];
}

function normalizeFixes(input?: Array<Partial<ReportFix>>): ReportFix[] {
  const cleaned = (input ?? [])
    .map((fix) => {
      const title = fix.title?.trim();
      const description = fix.description?.trim();
      if (!title || !description) return null;
      return {
        title: title.slice(0, 120),
        description: description.slice(0, 400),
        impact: fix.impact,
      } satisfies ReportFix;
    })
    .filter(Boolean) as ReportFix[];

  if (cleaned.length >= 3) {
    return cleaned.slice(0, 5);
  }

  const defaults = defaultFixes();
  while (cleaned.length < 3 && cleaned.length < defaults.length) {
    cleaned.push(defaults[cleaned.length]);
  }
  return cleaned;
}

export function parseReportData(input: unknown): ReportData {
  const parsed = reportSchema.safeParse(input);
  if (parsed.success) {
    return parsed.data;
  }

  const partial = partialReportSchema.safeParse(input);
  if (!partial.success) {
    throw new Error("AI response failed schema validation");
  }

  const metrics = normalizeMetrics(partial.data.metrics);
  const computedScore =
    (metrics.value_prop + metrics.cta_visibility + metrics.trust_design) / 3;
  const overallScore = clampScore(partial.data.overall_score, computedScore);

  const rawSummary = partial.data.summary?.trim();
  const summary =
    rawSummary && rawSummary.length > 0
      ? rawSummary.slice(0, 600)
      : "Analysis complete. Review the priority fixes to improve above-the-fold clarity.";

  const fixes = normalizeFixes(partial.data.fixes);
  const notes = partial.data.notes?.slice(0, 10);

  return {
    overall_score: overallScore,
    metrics,
    summary,
    fixes,
    ...(notes && notes.length > 0 ? { notes } : {}),
  };
}
