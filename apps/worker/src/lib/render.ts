import puppeteer from "@cloudflare/puppeteer";
import type { Env } from "../env";

export type RenderResult = {
  full: Uint8Array;
  ai: Uint8Array;
  contentType: string;
};

function toUint8Array(buf: ArrayBuffer | Uint8Array): Uint8Array {
  return buf instanceof Uint8Array ? buf : new Uint8Array(buf);
}

async function takeScreenshot(page: puppeteer.Page, type: "webp" | "png") {
  const options: puppeteer.ScreenshotOptions =
    type === "webp" ? { type: "webp", quality: 80 } : { type: "png" };
  const shot = await page.screenshot(options);
  return toUint8Array(shot as ArrayBuffer | Uint8Array);
}

export async function renderScreenshot(
  env: Env,
  url: string,
): Promise<RenderResult> {
  const browser = await puppeteer.launch(env.MYBROWSER);
  let page: puppeteer.Page | null = null;
  const startTime = Date.now();
  try {
    page = await browser.newPage();
    page.setDefaultNavigationTimeout(15000);
    page.setDefaultTimeout(15000);

    await page.route("**/*", (route) => {
      const type = route.request().resourceType();
      if (type === "media" || type === "font") {
        return route.abort();
      }
      return route.continue();
    });

    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 15000 });
    } catch (gotoErr) {
      // Track hung jobs for monitoring
      const duration = Date.now() - startTime;
      console.error(
        `[RENDER] Timeout navigating to ${url} after ${duration}ms:`,
        gotoErr,
      );
      if (page) {
        try {
          await page.close();
        } catch {}
        page = null;
      }
      throw new Error(`Page load timeout: ${url}`);
    }

    let contentType: string = "image/webp";
    let full: Uint8Array;
    try {
      full = await takeScreenshot(page, "webp");
    } catch {
      contentType = "image/png";
      full = await takeScreenshot(page, "png");
    }

    await page.setViewport({ width: 1024, height: 720, deviceScaleFactor: 1 });
    const ai = await takeScreenshot(
      page,
      contentType === "image/webp" ? "webp" : "png",
    );

    return { full, ai, contentType };
  } finally {
    // Clean up page explicitly if it exists
    if (page) {
      try {
        await page.close();
      } catch {}
    }
    await browser.close();
  }
}
