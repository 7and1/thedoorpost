import type { Env } from "../env";
import { sha256 } from "./hash";

// GitHub OAuth configuration
const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user";
const GITHUB_EMAILS_URL = "https://api.github.com/user/emails";

// Session configuration
const SESSION_TTL = 7 * 24 * 60 * 60; // 7 days in seconds
const STATE_TTL = 600; // 10 minutes for OAuth state

export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
}

export interface User {
  id: string;
  github_id: number;
  github_login: string;
  github_name: string | null;
  github_email: string | null;
  github_avatar_url: string | null;
  tier: "free" | "pro";
  daily_quota: number;
  monthly_quota: number;
  created_at: number;
  updated_at: number;
}

export interface SessionData {
  user_id: string;
  created_at: number;
}

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSign(secret: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

async function hmacVerify(
  secret: string,
  data: string,
  signature: string,
): Promise<boolean> {
  const expected = await hmacSign(secret, data);
  if (expected.length !== signature.length) return false;
  let result = 0;
  for (let i = 0; i < expected.length; i++) {
    result |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return result === 0;
}

export async function generateOAuthState(env: Env): Promise<string> {
  const nonce = randomHex(32);
  const signature = await hmacSign(env.SESSION_SECRET!, nonce);
  const state = `${nonce}.${signature}`;

  // Store nonce in KV with TTL
  await env.KV.put(`oauth:state:${nonce}`, "1", { expirationTtl: STATE_TTL });

  return state;
}

export async function verifyAndConsumeState(
  env: Env,
  state: string,
): Promise<boolean> {
  const [nonce, signature] = state.split(".");
  if (!nonce || !signature) return false;

  // Verify signature
  const valid = await hmacVerify(env.SESSION_SECRET!, nonce, signature);
  if (!valid) return false;

  // Check and consume state (one-time use)
  const exists = await env.KV.get(`oauth:state:${nonce}`);
  if (!exists) return false;

  await env.KV.delete(`oauth:state:${nonce}`);
  return true;
}

export function getGitHubAuthUrl(env: Env, state: string): string {
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID!,
    redirect_uri: env.GITHUB_REDIRECT_URI!,
    scope: "read:user user:email",
    state,
    allow_signup: "true",
  });
  return `${GITHUB_AUTHORIZE_URL}?${params}`;
}

export async function exchangeCodeForToken(
  env: Env,
  code: string,
): Promise<string | null> {
  const response = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: env.GITHUB_REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    console.error("[OAuth] Token exchange failed:", response.status);
    return null;
  }

  const data = (await response.json()) as { access_token?: string };
  return data.access_token || null;
}

export async function fetchGitHubUser(
  token: string,
): Promise<GitHubUser | null> {
  const [userRes, emailsRes] = await Promise.all([
    fetch(GITHUB_USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "TheDoorpost-OAuth",
      },
    }),
    fetch(GITHUB_EMAILS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "TheDoorpost-OAuth",
      },
    }),
  ]);

  if (!userRes.ok) {
    console.error("[OAuth] User fetch failed:", userRes.status);
    return null;
  }

  const user = (await userRes.json()) as GitHubUser;

  // Try to get primary verified email
  if (emailsRes.ok) {
    const emails = (await emailsRes.json()) as Array<{
      email: string;
      primary: boolean;
      verified: boolean;
    }>;
    const primaryEmail = emails.find((e) => e.primary && e.verified);
    if (primaryEmail) {
      user.email = primaryEmail.email;
    }
  }

  return user;
}

export async function upsertUser(
  env: Env,
  ghUser: GitHubUser,
): Promise<User | null> {
  const now = Date.now();

  // Check if user exists
  const existing = await env.DB.prepare(
    "SELECT * FROM users WHERE github_id = ?",
  )
    .bind(ghUser.id)
    .first<User>();

  if (existing) {
    // Update user info
    await env.DB.prepare(
      `UPDATE users SET
        github_login = ?,
        github_name = ?,
        github_email = ?,
        github_avatar_url = ?,
        updated_at = ?
       WHERE github_id = ?`,
    )
      .bind(
        ghUser.login,
        ghUser.name,
        ghUser.email,
        ghUser.avatar_url,
        now,
        ghUser.id,
      )
      .run();

    return {
      ...existing,
      github_login: ghUser.login,
      github_name: ghUser.name,
      github_email: ghUser.email,
      github_avatar_url: ghUser.avatar_url,
      updated_at: now,
    };
  }

  // Create new user
  const userId = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO users (
      id, github_id, github_login, github_name, github_email,
      github_avatar_url, tier, daily_quota, monthly_quota, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, 'free', 10, 0, ?, ?)`,
  )
    .bind(
      userId,
      ghUser.id,
      ghUser.login,
      ghUser.name,
      ghUser.email,
      ghUser.avatar_url,
      now,
      now,
    )
    .run();

  return {
    id: userId,
    github_id: ghUser.id,
    github_login: ghUser.login,
    github_name: ghUser.name,
    github_email: ghUser.email,
    github_avatar_url: ghUser.avatar_url,
    tier: "free",
    daily_quota: 10,
    monthly_quota: 0,
    created_at: now,
    updated_at: now,
  };
}

export async function createSession(env: Env, userId: string): Promise<string> {
  const token = randomHex(32);
  const sessionData: SessionData = {
    user_id: userId,
    created_at: Date.now(),
  };

  await env.KV.put(`session:${token}`, JSON.stringify(sessionData), {
    expirationTtl: SESSION_TTL,
  });

  return token;
}

export async function getSessionUser(
  env: Env,
  token: string,
): Promise<User | null> {
  if (!token) return null;

  const sessionRaw = await env.KV.get(`session:${token}`);
  if (!sessionRaw) return null;

  try {
    const session = JSON.parse(sessionRaw) as SessionData;
    const user = await env.DB.prepare("SELECT * FROM users WHERE id = ?")
      .bind(session.user_id)
      .first<User>();
    return user;
  } catch {
    return null;
  }
}

export async function deleteSession(env: Env, token: string): Promise<void> {
  await env.KV.delete(`session:${token}`);
}

export function parseSessionCookie(
  cookieHeader: string | undefined,
): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/doorpost_session=([^;]+)/);
  return match ? match[1] : null;
}

export function buildSessionCookie(
  token: string,
  domain: string,
  secure: boolean = true,
): string {
  const maxAge = SESSION_TTL;
  const parts = [
    `doorpost_session=${token}`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Max-Age=${maxAge}`,
  ];
  if (domain && !domain.includes("localhost")) {
    parts.push(`Domain=${domain}`);
  }
  if (secure) {
    parts.push("Secure");
  }
  return parts.join("; ");
}

export function buildLogoutCookie(
  domain: string,
  secure: boolean = true,
): string {
  const parts = [
    `doorpost_session=`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Max-Age=0`,
  ];
  if (domain && !domain.includes("localhost")) {
    parts.push(`Domain=${domain}`);
  }
  if (secure) {
    parts.push("Secure");
  }
  return parts.join("; ");
}
