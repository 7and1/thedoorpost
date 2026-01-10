import { describe, it, expect } from "vitest";
import workerExport, { app } from "../src/index";
import { createMockEnv, createExecutionCtx, type MockQueue } from "./helpers";

interface AnalyzeJobMessage {
  jobId: string;
  url: string;
  userEmail?: string;
  webhookUrl?: string;
  webhookSecret?: string;
}

describe("analyze flow", () => {
  it("queues and completes a mock job", async () => {
    const env = createMockEnv({ MOCK_ANALYZE: "true" });
    const ctx = createExecutionCtx();

    const res = await app.fetch(
      new Request("http://worker/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "test-api-key",
        },
        body: JSON.stringify({ url: "https://example.com" }),
      }),
      env,
      ctx as any,
    );

    expect(res.status).toBe(200);
    const body = (await res.json()) as { status: string; job_id: string };
    expect(body.status).toBe("queued");

    // Process the queued job through the queue handler
    const mockQueue = env.JOBS_QUEUE as unknown as MockQueue;
    expect(mockQueue.messages.length).toBe(1);

    // Create mock message batch for queue handler
    const mockBatch = {
      messages: mockQueue.messages.map((msg) => ({
        body: msg as AnalyzeJobMessage,
        ack: () => {},
        retry: () => {},
      })),
    };

    await workerExport.queue(mockBatch as any, env, ctx as any);
    await ctx.waitForTasks();

    const jobRes = await app.fetch(
      new Request(`http://worker/api/jobs/${body.job_id}`, {
        headers: { "X-API-Key": "test-api-key" },
      }),
      env,
      ctx as any,
    );

    const job = (await jobRes.json()) as { status: string; result?: { data?: { overall_score?: number } } };
    expect(job.status).toBe("complete");
    expect(job.result?.data?.overall_score).toBeDefined();
  });
});
