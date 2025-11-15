import { createClient, type RedisClientType } from "redis";

export interface RateLimitOptions {
    identifier: string;
    limitId: string;
    windowMs?: number;
    max?: number;
}

const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX_ATTEMPTS = 10;

const memoryBuckets = new Map<string, { count: number; expiresAt: number }>();

const redisUrl = process.env.REDIS_URL ?? process.env.REDIS_TLS_URL ?? null;

let redisClientPromise: Promise<RedisClientType | null> | null = null;

async function getRedisClient(): Promise<RedisClientType | null> {
    if (!redisUrl) {
        return null;
    }

    if (redisClientPromise) {
        return redisClientPromise;
    }

    redisClientPromise = (async () => {
        try {
            const client = createClient({ url: redisUrl });
            client.on("error", (error) => {
                console.error("Redis client error:", error);
            });
            await client.connect();
            return client as RedisClientType;
        } catch (error) {
            console.error("Redis connection failed:", error);
            redisClientPromise = null;
            return null;
        }
    })();

    return redisClientPromise;
}

type HeaderValue = string | string[] | undefined | null;

function normalizeHeaderValue(value: HeaderValue): string | undefined {
    if (!value) return undefined;
    if (Array.isArray(value)) return value[0];
    return value;
}

export type HeaderLike = Headers | Record<string, HeaderValue> | null | undefined;

// This function now just gets the IP
function getClientIp(headers: HeaderLike): string | null {
    if (headers instanceof Headers) {
        const forwarded = headers.get("x-forwarded-for");
        if (forwarded) return forwarded.split(",")[0]?.trim();
        const realIp = headers.get("x-real-ip");
        if (realIp) return realIp;
    } else if (headers && typeof headers === "object") {
        const forwarded = normalizeHeaderValue(
            (headers as Record<string, HeaderValue>)["x-forwarded-for"]
        );
        if (forwarded) return forwarded.split(",")[0]?.trim();
        const realIp = normalizeHeaderValue(
            (headers as Record<string, HeaderValue>)["x-real-ip"]
        );
        if (realIp) return realIp;
    }
    return null;
}

export function resolveClientIdentifier(
    headers: HeaderLike,
    fallback: string | null | undefined
): string {
    // Use IP as the primary identifier for rate limiting
    return getClientIp(headers) || fallback || "unknown";
}

function checkRateLimitInMemory({
    identifier,
    limitId,
    windowMs,
    max,
}: {
    identifier: string;
    limitId: string;
    windowMs: number;
    max: number;
}): { success: boolean; remaining: number; reset: number } {
        const key = `ratelimit:${limitId}:${identifier}`;
        const now = Date.now();
        const bucket = memoryBuckets.get(key);

        if (!bucket || bucket.expiresAt <= now) {
            memoryBuckets.set(key, { count: 1, expiresAt: now + windowMs });
            return { success: true, remaining: max - 1, reset: now + windowMs };
        }

        if (bucket.count >= max) {
            return { success: false, remaining: 0, reset: bucket.expiresAt };
        }

        bucket.count += 1;
        memoryBuckets.set(key, bucket);
        return { success: true, remaining: max - bucket.count, reset: bucket.expiresAt };
    }

    // This function is now ASYNC
    export async function checkRateLimit({
        identifier,
        limitId,
        windowMs = DEFAULT_WINDOW_MS,
        max = DEFAULT_MAX_ATTEMPTS,
    }: RateLimitOptions): Promise<{
        success: boolean;
        remaining: number;
        reset: number;
    }> {
    const now = Date.now();

    try {
        const client = await getRedisClient();

        if (client) {
        const key = `ratelimit:${limitId}:${identifier}`;
        const current = await client.incr(key);
        let ttl = await client.pTTL(key);

        if (current === 1 || ttl < 0) {
            await client.pExpire(key, windowMs);
            ttl = windowMs;
        }

        const reset = now + (ttl > 0 ? ttl : windowMs);

        if (current > max) {
            return { success: false, remaining: 0, reset };
        }

        return { success: true, remaining: Math.max(0, max - current), reset };
        }
    } catch (error) {
        console.error("Redis rate limit error:", error);
    }

    // Fallback to in-memory buckets if Redis is unavailable
    return checkRateLimitInMemory({
        identifier,
        limitId,
        windowMs,
        max,
    });
}