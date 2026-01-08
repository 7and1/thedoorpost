import type { Env } from "../src/env";

export class MemoryKV implements KVNamespace {
  private store = new Map<string, string>();

  async get(key: string): Promise<string | null> {
    return this.store.get(key) ?? null;
  }

  async put(key: string, value: string): Promise<void> {
    this.store.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async list(): Promise<KVNamespaceListResult> {
    return { keys: [], list_complete: true, cursor: "" };
  }
}

export class MockD1 implements D1Database {
  prepare(_query: string): D1PreparedStatement {
    return {
      bind: (..._args: unknown[]) => ({
        run: async () => ({ success: true, meta: {} as any }) as D1Result,
        first: async () => undefined,
        all: async () => ({ results: [] }) as D1Result,
      }),
    } as unknown as D1PreparedStatement;
  }
}

export function createMockEnv(overrides: Partial<Env> = {}): Env {
  return {
    MYBROWSER: {} as any,
    MY_BUCKET: {
      put: async () => ({}) as any,
    } as R2Bucket,
    DB: new MockD1(),
    KV: new MemoryKV(),
    OPENAI_API_KEY: "test",
    OPENAI_MODEL: "gpt-4o",
    R2_PUBLIC_BASE_URL: "https://r2.example.com",
    JOB_TTL_SECONDS: "3600",
    REPORT_CACHE_TTL_SECONDS: "60",
    ENABLE_DOH_CHECK: "false",
    OPENAI_STREAM: "false",
    MOCK_ANALYZE: "true",
    ...overrides,
  };
}

export function createExecutionCtx() {
  const tasks: Promise<unknown>[] = [];
  return {
    waitUntil(promise: Promise<unknown>) {
      tasks.push(promise);
    },
    async waitForTasks() {
      await Promise.all(tasks);
    },
  };
}
