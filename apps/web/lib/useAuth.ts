"use client";

export interface AuthUser {
  id: string;
  github_login: string;
  github_name: string | null;
  github_email: string | null;
  github_avatar_url: string | null;
  tier: "free" | "pro";
}

export interface UsageStats {
  today: number;
  this_month: number;
  total: number;
  quota: {
    allowed: boolean;
    remaining: number;
    limit: number;
    reset_at: number;
    tier: string;
  };
}

export interface AuthState {
  user: AuthUser | null;
  usage: UsageStats | null;
  loading: boolean;
  error: string | null;
}

// Login-free mode stub for backward compatibility.
export function useAuth() {
  const state: AuthState = {
    user: null,
    usage: null,
    loading: false,
    error: null,
  };

  return {
    ...state,
    logout: async () => {},
    refreshQuota: async () => {},
    loginUrl: "/analyze",
    isAuthenticated: false,
  };
}
