const buckets = new Map<string, { count: number; expiresAt: number }>();

export interface RateLimitOptions {
    identifier: string;
    limitId: string;
    windowMs?: number;
    max?: number;
}

const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX_ATTEMPTS = 10;

type HeaderValue = string | string[] | undefined | null;

function normalizeHeaderValue(value: HeaderValue): string | undefined {
    if (!value) return undefined;
    if (Array.isArray(value)) return value[0];
    return value;
}

export type HeaderLike =
    | Headers
    | Record<string, HeaderValue>
    | null
    | undefined;

export function resolveClientIdentifier(
    headers: HeaderLike,
    fallback: string | null | undefined
): string {
    if (headers instanceof Headers) {
        const forwarded = headers.get("x-forwarded-for");
        if (forwarded) return forwarded.split(",")[0]?.trim() || fallback || "unknown";
        const realIp = headers.get("x-real-ip");
        if (realIp) return realIp;
    } else if (headers && typeof headers === "object") {
        const forwarded = normalizeHeaderValue((headers as Record<string, HeaderValue>)["x-forwarded-for"]);
        if (forwarded) return forwarded.split(",")[0]?.trim() || fallback || "unknown";
        const realIp = normalizeHeaderValue((headers as Record<string, HeaderValue>)["x-real-ip"]);
        if (realIp) return realIp;
    }

    if (fallback) return fallback;
    return "unknown";
}

export function checkRateLimit({
    identifier,
    limitId,
    windowMs = DEFAULT_WINDOW_MS,
    max = DEFAULT_MAX_ATTEMPTS,
}: RateLimitOptions): { success: boolean; remaining: number; reset: number } {
    const key = `${limitId}:${identifier}`;
    const now = Date.now();
    const bucket = buckets.get(key);

    if (!bucket || bucket.expiresAt <= now) {
        buckets.set(key, { count: 1, expiresAt: now + windowMs });
        return { success: true, remaining: max - 1, reset: now + windowMs };
    }

    if (bucket.count >= max) {
        return { success: false, remaining: 0, reset: bucket.expiresAt };
    }

    bucket.count += 1;
    buckets.set(key, bucket);

    return { success: true, remaining: max - bucket.count, reset: bucket.expiresAt };
}
