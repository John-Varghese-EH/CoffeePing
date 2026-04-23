import { prisma } from "./db";
import { redis } from "./redis";

export interface PingResult {
  serverId: string;
  success: boolean;
  statusCode: number | null;
  responseTimeMs: number;
  keywordMatch: boolean;
  errorMessage?: string;
  region: string;
}

export interface PingJob {
  serverId: string;
  url: string;
  expectedStatus: number;
  successKeywords: string[];
  timeoutMs: number;
  headers?: Record<string, string>;
  followRedirects: boolean;
}

/**
 * Human-like jitter to prevent platform detection.
 * Adds a randomized delay (0-30% of interval) and shifts timing slightly.
 */
export function calculateJitteredDelay(intervalMinutes: number): number {
  const baseMs = intervalMinutes * 60 * 1000;
  const jitterMax = baseMs * 0.3; // up to 30% jitter
  const jitter = Math.floor(Math.random() * jitterMax);
  // Also add a small sine-wave-like daily drift so pings don't land at exact minutes
  const now = new Date();
  const minuteOfDay = now.getHours() * 60 + now.getMinutes();
  const drift = Math.sin((minuteOfDay / 1440) * Math.PI * 2) * 5000; // +/- 5s daily drift
  return Math.max(0, jitter + drift);
}

export async function fetchServer(job: PingJob, region = "us-east-1"): Promise<PingResult> {
  const start = performance.now();
  let statusCode: number | null = null;
  let success = false;
  let keywordMatch = true;
  let errorMessage: string | undefined;
  let responseBody = "";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), job.timeoutMs);

  try {
    const res = await fetch(job.url, {
      method: "GET",
      headers: {
        "User-Agent": "CoffeePing/1.0 (+https://coffeeping.com/bot; uptime monitor)",
        Accept: "application/json, text/html",
        ...job.headers,
      },
      redirect: job.followRedirects ? "follow" : "manual",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    statusCode = res.status;
    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json") || job.successKeywords.length > 0) {
      const text = await res.text();
      responseBody = text;
      if (job.successKeywords.length > 0) {
        keywordMatch = job.successKeywords.every((kw) => text.includes(kw));
      }
    }

    success = res.status === job.expectedStatus && keywordMatch;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof Error) {
      if (err.name === "AbortError") {
        errorMessage = `Timeout after ${job.timeoutMs}ms`;
      } else {
        errorMessage = err.message;
      }
    }
  }

  const responseTimeMs = Math.round(performance.now() - start);

  return {
    serverId: job.serverId,
    success,
    statusCode,
    responseTimeMs,
    keywordMatch,
    errorMessage,
    region,
  };
}

export async function recordPing(result: PingResult) {
  await prisma.pingLog.create({
    data: {
      serverId: result.serverId,
      statusCode: result.statusCode,
      responseTimeMs: result.responseTimeMs,
      success: result.success,
      keywordMatch: result.keywordMatch,
      errorMessage: result.errorMessage,
      region: result.region,
    },
  });

  // Update Redis "last ping" cache for real-time dashboards
  await redis.hset(`server:${result.serverId}:lastPing`, {
    success: result.success ? 1 : 0,
    statusCode: result.statusCode ?? -1,
    responseTimeMs: result.responseTimeMs,
    at: Date.now(),
  });
}

export async function resolveIncidentsIfHealthy(serverId: string) {
  await prisma.incident.updateMany({
    where: {
      serverId,
      status: "OPEN",
    },
    data: {
      status: "RESOLVED",
      resolvedAt: new Date(),
    },
  });
}

export async function openIncidentIfDown(serverId: string, message: string) {
  const existing = await prisma.incident.findFirst({
    where: { serverId, status: "OPEN" },
  });
  if (!existing) {
    await prisma.incident.create({
      data: {
        serverId,
        status: "OPEN",
        message,
      },
    });
  }
}

/**
 * Central orchestrator: run a single ping job end-to-end.
 */
export async function runPingJob(job: PingJob, region = "us-east-1"): Promise<PingResult> {
  const result = await fetchServer(job, region);
  await recordPing(result);

  if (result.success) {
    await resolveIncidentsIfHealthy(job.serverId);
  } else {
    await openIncidentIfDown(job.serverId, result.errorMessage || `HTTP ${result.statusCode}`);
  }

  return result;
}

/**
 * Batch dispatcher: fetches all active servers and returns them as PingJobs.
 */
export async function getActivePingJobs(): Promise<PingJob[]> {
  const servers = await prisma.server.findMany({
    where: { status: "ACTIVE" },
    select: {
      id: true,
      url: true,
      expectedStatus: true,
      successKeywords: true,
      timeoutMs: true,
      headers: true,
      followRedirects: true,
    },
  });

  return servers.map((s) => ({
    serverId: s.id,
    url: s.url,
    expectedStatus: s.expectedStatus,
    successKeywords: s.successKeywords,
    timeoutMs: s.timeoutMs,
    headers: (s.headers as Record<string, string>) || undefined,
    followRedirects: s.followRedirects,
  }));
}
