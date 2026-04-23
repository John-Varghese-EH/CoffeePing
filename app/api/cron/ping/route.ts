import { NextResponse } from "next/server";
import {
  getActivePingJobs,
  runPingJob,
  calculateJitteredDelay,
} from "@/lib/ping-engine";
import { dispatchNotifications } from "@/lib/notification/bridge";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/cron/ping
 * Triggered by Vercel Cron or Cloudflare Cron.
 * Fetches all active servers, adds human-like jitter, and pings them.
 */
export async function GET(request: Request) {
  // Simple auth via secret header (configure in cron job headers)
  const authHeader = request.headers.get("x-cron-secret");
  if (authHeader !== process.env.PING_WORKER_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const jobs = await getActivePingJobs();
  const region = request.headers.get("cf-region") || "us-east-1";

  // Run pings with jitter in parallel batches
  const batchSize = 25;
  const results: Awaited<ReturnType<typeof runPingJob>>[] = [];

  for (let i = 0; i < jobs.length; i += batchSize) {
    const batch = jobs.slice(i, i + batchSize);

    const batchPromises = batch.map(async (job) => {
      // Human-like jitter per job to avoid platform detection
      const jitter = calculateJitteredDelay(5); // 5-minute default interval jitter
      if (jitter > 0) {
        await new Promise((r) => setTimeout(r, jitter));
      }
      return runPingJob(job, region);
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  // Dispatch notifications for DOWN servers
  const downResults = results.filter((r) => !r.success);
  for (const down of downResults) {
    const server = await prisma.server.findUnique({
      where: { id: down.serverId },
      select: { name: true, url: true, userId: true },
    });
    if (server) {
      await dispatchNotifications({
        serverId: down.serverId,
        serverName: server.name,
        serverUrl: server.url,
        status: "DOWN",
        message: down.errorMessage || `HTTP ${down.statusCode}`,
        responseTimeMs: down.responseTimeMs,
        statusCode: down.statusCode,
        timestamp: new Date().toISOString(),
      });
    }
  }

  return NextResponse.json({
    ok: true,
    total: jobs.length,
    down: downResults.length,
  });
}
