import type { Env } from "../env";
import type { ReportData } from "@thedoorpost/shared";

export type BestReport = {
  id: string;
  url: string;
  score: number;
  summary: string;
  image: string;
};

export async function getBestReports(
  env: Env,
  limit = 12,
): Promise<BestReport[]> {
  const rows = await env.DB.prepare(
    `SELECT id, url, score, summary, screenshot_path
     FROM reports WHERE score >= 90
     ORDER BY score DESC, created_at DESC
     LIMIT ?`,
  )
    .bind(limit)
    .all();

  const base = env.R2_PUBLIC_BASE_URL || "https://r2.thedoorpost.com";
  return (rows.results ?? []).map((row: any) => ({
    id: row.id,
    url: row.url,
    score: row.score ?? 0,
    summary: row.summary ?? "",
    image: `${base.replace(/\/$/, "")}/${row.screenshot_path}`,
  }));
}

export async function getCommonMistakes(env: Env, limit = 50) {
  const rows = await env.DB.prepare(
    `SELECT full_report_json FROM reports WHERE score <= 50
     ORDER BY created_at DESC LIMIT ?`,
  )
    .bind(limit)
    .all();

  const counts = new Map<string, number>();
  for (const row of rows.results ?? []) {
    try {
      const data = JSON.parse(row.full_report_json) as ReportData;
      for (const fix of data.fixes ?? []) {
        const key = fix.title.trim();
        if (!key) continue;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    } catch {
      // ignore bad json
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([title, count]) => ({ title, count }));
}
