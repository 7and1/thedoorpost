import { describe, it, expect } from "vitest";
import { app } from "../src/index";
import { createMockEnv, createExecutionCtx } from "./helpers";

describe("analyze flow", () => {
  it("queues and completes a mock job", async () => {
    const env = createMockEnv({ MOCK_ANALYZE: "true" });
    const ctx = createExecutionCtx();

    const res = await app.fetch(
      new Request("http://worker/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "https://example.com" }),
      }),
      env,
      ctx as any,
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("queued");

    await ctx.waitForTasks();

    const jobRes = await app.fetch(
      new Request(`http://worker/api/jobs/${body.job_id}`),
      env,
      ctx as any,
    );

    const job = await jobRes.json();
    expect(job.status).toBe("complete");
    expect(job.result?.data?.overall_score).toBeDefined();
  });
});
