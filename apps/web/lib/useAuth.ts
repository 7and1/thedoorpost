"use client";

import { useState, useEffect, useCallback } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://api.thedoorpost.com";

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

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    usage: null,
    loading: true,
    error: null,
  });

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        credentials: "include",
      });

      if (res.status === 401) {
        setState({ user: null, usage: null, loading: false, error: null });
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await res.json();
      setState({
        user: data.user,
        usage: data.usage,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState({
        user: null,
        usage: null,
        loading: false,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setState({ user: null, usage: null, loading: false, error: null });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, []);

  const refreshQuota = useCallback(async () => {
    if (!state.user) return;
    try {
      const res = await fetch(`${API_BASE}/auth/quota`, {
        credentials: "include",
      });
      if (res.ok) {
        const quota = await res.json();
        setState((prev) => ({
          ...prev,
          usage: prev.usage ? { ...prev.usage, quota } : null,
        }));
      }
    } catch (err) {
      console.error("Quota refresh failed:", err);
    }
  }, [state.user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const loginUrl = `${API_BASE}/auth/github`;

  return {
    ...state,
    logout,
    refreshQuota,
    loginUrl,
    isAuthenticated: !!state.user,
  };
}
