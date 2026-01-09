export type ReportFix = {
  title: string;
  description: string;
  impact?: "low" | "medium" | "high";
};

export type ReportMetrics = {
  value_prop: number;
  cta_visibility: number;
  trust_design: number;
};

export type ReportData = {
  overall_score: number;
  metrics: ReportMetrics;
  summary: string;
  fixes: ReportFix[];
  notes?: string[];
};

export type ReportResult = {
  id: string;
  data: ReportData;
  image: string;
};

export type JobStatus = {
  id: string;
  status: "queued" | "running" | "complete" | "error";
  progress: number;
  message: string;
  url: string;
  created_at: number;
  result?: ReportResult;
  partial_score?: number;
  error?: string;
  timings?: {
    render_ms?: number;
    ai_ms?: number;
    storage_ms?: number;
    total_ms?: number;
  };
};
