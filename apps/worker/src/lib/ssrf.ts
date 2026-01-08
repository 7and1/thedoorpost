const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "metadata.google.internal",
  "169.254.169.254",
]);

const IPV4_PRIVATE_RANGES: Array<[number, number]> = [
  [0x0a000000, 0x0affffff], // 10.0.0.0/8
  [0xac100000, 0xac1fffff], // 172.16.0.0/12
  [0xc0a80000, 0xc0a8ffff], // 192.168.0.0/16
  [0x7f000000, 0x7fffffff], // 127.0.0.0/8
  [0xa9fe0000, 0xa9feffff], // 169.254.0.0/16
  [0x00000000, 0x0000ffff], // 0.0.0.0/16
];

const IPV4_METADATA = "169.254.169.254";

const IPV6_PRIVATE_PREFIXES = ["fc", "fd", "fe80"];
const IPV6_BLOCKED = new Set(["::1", "::"]);

// DNS pinning cache to prevent DNS rebinding attacks
const dnsCache = new Map<string, { ips: string[]; timestamp: number }>();
const DNS_CACHE_TTL = 300000; // 5 minutes
const FETCH_TIMEOUT = 15000; // 15 seconds hard timeout
const MAX_RESPONSE_SIZE = 10 * 1024 * 1024; // 10MB max response size

function ipToInt(ip: string): number | null {
  const parts = ip.split(".").map((p) => Number(p));
  if (
    parts.length !== 4 ||
    parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)
  )
    return null;
  return (
    ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0
  );
}

function isPrivateIpv4(ip: string): boolean {
  if (ip === IPV4_METADATA) return true;
  const int = ipToInt(ip);
  if (int === null) return false;
  return IPV4_PRIVATE_RANGES.some(([start, end]) => int >= start && int <= end);
}

function isIpv6(ip: string): boolean {
  return ip.includes(":");
}

function isPrivateIpv6(ip: string): boolean {
  if (IPV6_BLOCKED.has(ip)) return true;
  const normalized = ip.replace(/^:/, "").toLowerCase();
  const prefix2 = normalized.slice(0, 2);
  const prefix4 = normalized.slice(0, 4);
  return (
    IPV6_PRIVATE_PREFIXES.includes(prefix2) ||
    IPV6_PRIVATE_PREFIXES.includes(prefix4)
  );
}

function isIpAddress(hostname: string): boolean {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname) || isIpv6(hostname);
}

async function resolveHostname(hostname: string): Promise<string[]> {
  // Check DNS pinning cache first to prevent DNS rebinding
  const cached = dnsCache.get(hostname);
  const now = Date.now();
  if (cached && now - cached.timestamp < DNS_CACHE_TTL) {
    return cached.ips;
  }

  const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(hostname)}&type=A`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const res = await fetch(url, {
      headers: { accept: "application/dns-json" },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return [];

    // Enforce response size limit
    const contentLength = res.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_RESPONSE_SIZE) {
      throw new Error("Response too large");
    }

    const data = (await res.json()) as { Answer?: Array<{ data: string }> };
    const ips = (data.Answer ?? []).map((a) => a.data).filter(Boolean);

    // Cache the result for DNS pinning
    dnsCache.set(hostname, { ips, timestamp: now });

    return ips;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("DNS resolution timeout");
    }
    return [];
  }
}

export async function validateUrl(
  input: string,
  enableDoh = true,
): Promise<URL> {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    throw new Error("Invalid URL");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("URL must start with http or https");
  }

  const hostname = url.hostname.toLowerCase();
  if (BLOCKED_HOSTNAMES.has(hostname)) {
    throw new Error("Blocked hostname");
  }

  if (isIpAddress(hostname)) {
    if (isIpv6(hostname)) {
      if (isPrivateIpv6(hostname)) throw new Error("Private IPv6 not allowed");
    } else if (isPrivateIpv4(hostname)) {
      throw new Error("Private IP not allowed");
    }
    return url;
  }

  if (enableDoh) {
    const ips = await resolveHostname(hostname);
    if (ips.some(isPrivateIpv4)) {
      throw new Error("Hostname resolves to private IP");
    }
  }

  return url;
}

export const _private = {
  isPrivateIpv4,
  isPrivateIpv6,
  isIpAddress,
};
