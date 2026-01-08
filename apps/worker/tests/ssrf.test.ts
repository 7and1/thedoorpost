import { describe, it, expect } from "vitest";
import { validateUrl } from "../src/lib/ssrf";

describe("validateUrl", () => {
  it("rejects private IP", async () => {
    await expect(validateUrl("http://127.0.0.1", false)).rejects.toThrow();
  });

  it("accepts public URL", async () => {
    const url = await validateUrl("https://example.com", false);
    expect(url.hostname).toBe("example.com");
  });
});
