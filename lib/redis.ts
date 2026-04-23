import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const freeTierRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(3, "1 h"), // 3 URL additions per hour for free tier
  analytics: true,
});

export const pingRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(1000, "1 m"), // 1000 pings per minute per server
  analytics: true,
});

export async function getCached<T>(key: string): Promise<T | null> {
  return redis.get<T>(key);
}

export async function setCached(key: string, value: unknown, ttlSeconds = 60) {
  return redis.set(key, value, { ex: ttlSeconds });
}

export async function incrementServerCounter() {
  return redis.incr("global:servers:count");
}

export async function getServerCounter(): Promise<number> {
  const count = await redis.get<number>("global:servers:count");
  return count ?? 43201; // Default seed number from landing page
}
