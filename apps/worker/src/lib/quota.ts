import type { Env } from "../env";
import type { User } from "./oauth";

// Quota limits
export const QUOTA_LIMITS = {
  free: {
    daily: 10,
    monthly: 0, // Not used for free tier
  },
  pro: {
    daily: 0, // Not used for pro tier
    monthly: 500,
  },
  anonymous: {
    // For users without login, use IP-based rate limiting
    perMinute: 10,
  },
};

export interface QuotaResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  reset_at: number;
  tier: string;
}

function getDayStart(): number {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  return now.getTime();
}

function getMonthStart(): number {
  const now = new Date();
  now.setUTCDate(1);
  now.setUTCHours(0, 0, 0, 0);
  return now.getTime();
}

function getDayEnd(): number {
  const now = new Date();
  now.setUTCHours(23, 59, 59, 999);
  return now.getTime();
}

function getMonthEnd(): number {
  const now = new Date();
  now.setUTCMonth(now.getUTCMonth() + 1);
  now.setUTCDate(0); // Last day of current month
  now.setUTCHours(23, 59, 59, 999);
  return now.getTime();
}

export async function checkUserQuota(
  env: Env,
  user: User,
): Promise<QuotaResult> {
  const now = Date.now();

  if (user.tier === "pro") {
    // Pro users: monthly quota
    const monthStart = getMonthStart();
    const monthEnd = getMonthEnd();

    const usage = await env.DB.prepare(
      `SELECT COUNT(*) as count FROM usage_logs
       WHERE user_id = ? AND created_at >= ? AND created_at <= ?`,
    )
      .bind(user.id, monthStart, monthEnd)
      .first<{ count: number }>();

    const used = usage?.count || 0;
    const limit = user.monthly_quota || QUOTA_LIMITS.pro.monthly;
    const remaining = Math.max(0, limit - used);

    return {
      allowed: used < limit,
      remaining,
      limit,
      reset_at: monthEnd,
      tier: "pro",
    };
  }

  // Free users: daily quota
  const dayStart = getDayStart();
  const dayEnd = getDayEnd();

  const usage = await env.DB.prepare(
    `SELECT COUNT(*) as count FROM usage_logs
     WHERE user_id = ? AND created_at >= ? AND created_at <= ?`,
  )
    .bind(user.id, dayStart, dayEnd)
    .first<{ count: number }>();

  const used = usage?.count || 0;
  const limit = user.daily_quota || QUOTA_LIMITS.free.daily;
  const remaining = Math.max(0, limit - used);

  return {
    allowed: used < limit,
    remaining,
    limit,
    reset_at: dayEnd,
    tier: "free",
  };
}

export async function recordUsage(
  env: Env,
  userId: string,
  action: string = "analyze",
): Promise<void> {
  const id = crypto.randomUUID();
  const now = Date.now();

  await env.DB.prepare(
    `INSERT INTO usage_logs (id, user_id, action, created_at) VALUES (?, ?, ?, ?)`,
  )
    .bind(id, userId, action, now)
    .run();
}

export async function getUserUsageStats(
  env: Env,
  user: User,
): Promise<{
  today: number;
  this_month: number;
  total: number;
  quota: QuotaResult;
}> {
  const dayStart = getDayStart();
  const monthStart = getMonthStart();

  const [todayResult, monthResult, totalResult] = await Promise.all([
    env.DB.prepare(
      `SELECT COUNT(*) as count FROM usage_logs WHERE user_id = ? AND created_at >= ?`,
    )
      .bind(user.id, dayStart)
      .first<{ count: number }>(),
    env.DB.prepare(
      `SELECT COUNT(*) as count FROM usage_logs WHERE user_id = ? AND created_at >= ?`,
    )
      .bind(user.id, monthStart)
      .first<{ count: number }>(),
    env.DB.prepare(`SELECT COUNT(*) as count FROM usage_logs WHERE user_id = ?`)
      .bind(user.id)
      .first<{ count: number }>(),
  ]);

  const quota = await checkUserQuota(env, user);

  return {
    today: todayResult?.count || 0,
    this_month: monthResult?.count || 0,
    total: totalResult?.count || 0,
    quota,
  };
}
