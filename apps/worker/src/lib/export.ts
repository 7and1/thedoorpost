import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { ReportResult } from "@thedoorpost/shared";

function csvEscape(value: string) {
  const needsEscape = /[",\n]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsEscape ? `"${escaped}"` : escaped;
}

export function buildReportCsv(report: ReportResult, sourceUrl?: string) {
  const metrics = report.data.metrics || {
    value_prop: 0,
    cta_visibility: 0,
    trust_design: 0,
  };
  const fixes = (report.data.fixes ?? [])
    .map((fix) => `${fix.title} - ${fix.description} (${fix.impact ?? ""})`)
    .join(" | ");
  const fields = [
    "id",
    "url",
    "screenshot",
    "overall_score",
    "value_prop",
    "cta_visibility",
    "trust_design",
    "summary",
    "fixes",
  ];

  const row = [
    report.id,
    sourceUrl ?? "",
    report.image,
    String(report.data.overall_score),
    String(metrics.value_prop),
    String(metrics.cta_visibility),
    String(metrics.trust_design),
    report.data.summary || "",
    fixes,
  ];

  return `${fields.join(",")}
${row.map((value) => csvEscape(value)).join(",")}
`;
}

function wrapText(text: string, maxChars: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

export async function buildReportPdf(report: ReportResult) {
  const metrics = report.data.metrics || {
    value_prop: 0,
    cta_visibility: 0,
    trust_design: 0,
  };
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const margin = 48;
  const lineHeight = 16;
  let y = 792 - margin;

  const drawText = (text: string, opts?: { bold?: boolean; size?: number }) => {
    const size = opts?.size ?? 12;
    const fontToUse = opts?.bold ? fontBold : font;
    page.drawText(text, {
      x: margin,
      y,
      size,
      font: fontToUse,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= lineHeight + (opts?.size ? 4 : 0);
  };

  drawText("TheDoorpost Report", { bold: true, size: 18 });
  drawText(`Report ID: ${report.id}`);
  drawText(`Score: ${report.data.overall_score}/100`, { bold: true });
  drawText("Summary:", { bold: true });
  for (const line of wrapText(report.data.summary || "", 80)) {
    drawText(line);
  }

  y -= 8;
  drawText("Key Metrics", { bold: true });
  drawText(`Value Proposition: ${metrics.value_prop}`);
  drawText(`CTA Visibility: ${metrics.cta_visibility}`);
  drawText(`Trust Design: ${metrics.trust_design}`);

  y -= 8;
  drawText("Top Fixes", { bold: true });
  (report.data.fixes ?? []).forEach((fix, index) => {
    drawText(`${index + 1}. ${fix.title} (${fix.impact ?? ""})`, {
      bold: true,
    });
    for (const line of wrapText(fix.description, 80)) {
      drawText(line);
    }
    y -= 4;
  });

  return pdf.save();
}
