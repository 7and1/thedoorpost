import type { Env } from "../env";

type TurnstileResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
  action?: string;
  cdata?: string;
};

export async function verifyTurnstile(
  env: Env,
  token: string | undefined,
  remoteIp?: string | null,
) {
  if (env.TURNSTILE_SKIP_VERIFY === "true") return true;
  if (!env.TURNSTILE_SECRET) return true;
  if (!token) return false;

  const formData = new FormData();
  formData.append("secret", env.TURNSTILE_SECRET);
  formData.append("response", token);
  if (remoteIp) {
    formData.append("remoteip", remoteIp);
  }

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    },
  );

  if (!res.ok) return false;
  const data = (await res.json()) as TurnstileResponse;
  return data.success;
}
