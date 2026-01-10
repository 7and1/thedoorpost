import type { Env } from "../env";
import { getJob } from "./jobs";

const encoder = new TextEncoder();
const MAX_STREAM_DURATION = 90000; // 90 seconds max connection time
const SSE_HEARTBEAT_INTERVAL = 1000; // 1 second between polls

function formatSse(event: string, data: unknown) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Server-Sent Events stream for job progress updates.
 *
 * Memory leak prevention:
 * - 90-second hard timeout on connections
 * - Immediate cleanup on client disconnect
 * - Backpressure handling via desiredSize check
 */
export function streamJob(env: Env, id: string, origin?: string) {
  let active = true;
  let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const startTime = Date.now();

      // Set up hard timeout to prevent hanging connections
      timeoutHandle = setTimeout(() => {
        if (active) {
          try {
            controller.enqueue(
              encoder.encode(formatSse("error", { message: "Stream timeout" })),
            );
            controller.close();
          } catch {
            // Controller already closed
          }
          active = false;
        }
      }, MAX_STREAM_DURATION);

      try {
        controller.enqueue(encoder.encode("retry: 1000\n\n"));

        while (active) {
          // Check elapsed time for additional safety
          const elapsed = Date.now() - startTime;
          if (elapsed >= MAX_STREAM_DURATION) {
            controller.enqueue(
              encoder.encode(formatSse("error", { message: "Stream timeout" })),
            );
            break;
          }

          // Backpressure check: if client can't keep up, pause briefly
          if (controller.desiredSize !== null && controller.desiredSize <= 0) {
            await sleep(100);
            continue;
          }

          const job = await getJob(env, id);
          if (!job) {
            controller.enqueue(
              encoder.encode(formatSse("error", { message: "Job not found" })),
            );
            break;
          }

          controller.enqueue(
            encoder.encode(
              formatSse("progress", {
                progress: job.progress,
                message: job.message,
                partial_score: job.partial_score ?? null,
              }),
            ),
          );

          if (job.status === "complete") {
            controller.enqueue(
              encoder.encode(formatSse("complete", job.result)),
            );
            break;
          }

          if (job.status === "error") {
            controller.enqueue(
              encoder.encode(
                formatSse("error", { message: job.error || job.message }),
              ),
            );
            break;
          }

          await sleep(SSE_HEARTBEAT_INTERVAL);
        }
      } catch (err) {
        // Client disconnected or stream error - cleanup and exit gracefully
        console.error("[SSE] Stream error:", err);
      } finally {
        // Ensure cleanup happens on all exit paths
        if (timeoutHandle) {
          clearTimeout(timeoutHandle);
        }
        active = false;
        try {
          controller.close();
        } catch {
          // Already closed
        }
      }
    },
    cancel() {
      active = false;
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": origin || "*",
      "X-Accel-Buffering": "no", // Disable nginx buffering
    },
  });
}
