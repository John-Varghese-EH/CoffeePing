import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { ensureUser } from "@/lib/ensure-user";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure user record exists in Prisma
    await ensureUser(user);

    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Fetch all user's servers
    const servers = await prisma.server.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { pings: true, incidents: true } },
      },
    });

    const serverIds = servers.map((s) => s.id);

    // Get open incidents count
    const openIncidents = serverIds.length > 0
      ? await prisma.incident.count({
          where: {
            serverId: { in: serverIds },
            status: "OPEN",
          },
        })
      : 0;

    // Get 24h pings for all user's servers
    const pings24h = serverIds.length > 0
      ? await prisma.pingLog.findMany({
          where: {
            serverId: { in: serverIds },
            pingedAt: { gte: twentyFourHoursAgo },
          },
          orderBy: { pingedAt: "asc" },
          select: {
            serverId: true,
            success: true,
            responseTimeMs: true,
            statusCode: true,
            pingedAt: true,
            keywordMatch: true,
          },
        })
      : [];

    // Compute overall uptime 24h
    const totalPings24h = pings24h.length;
    const successPings24h = pings24h.filter((p) => p.success).length;
    const uptimePercent24h = totalPings24h > 0
      ? Math.round((successPings24h / totalPings24h) * 10000) / 100
      : 100;

    // Compute average latency 24h
    const successfulPings = pings24h.filter((p) => p.success && p.responseTimeMs > 0);
    const avgLatencyMs24h = successfulPings.length > 0
      ? Math.round(successfulPings.reduce((sum, p) => sum + p.responseTimeMs, 0) / successfulPings.length)
      : 0;

    // Build hourly chart data (last 24h)
    const chartData: { time: string; latency: number; uptime: number; pings: number }[] = [];
    for (let i = 23; i >= 0; i--) {
      const hourStart = new Date(now.getTime() - (i + 1) * 60 * 60 * 1000);
      const hourEnd = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hourPings = pings24h.filter(
        (p) => p.pingedAt >= hourStart && p.pingedAt < hourEnd
      );
      const hourSuccess = hourPings.filter((p) => p.success).length;
      const hourLatencies = hourPings.filter((p) => p.success && p.responseTimeMs > 0);
      const avgLat = hourLatencies.length > 0
        ? Math.round(hourLatencies.reduce((s, p) => s + p.responseTimeMs, 0) / hourLatencies.length)
        : 0;
      const hourUptime = hourPings.length > 0
        ? Math.round((hourSuccess / hourPings.length) * 10000) / 100
        : 100;

      chartData.push({
        time: hourEnd.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
        latency: avgLat,
        uptime: hourUptime,
        pings: hourPings.length,
      });
    }

    // Get last ping per server
    const lastPings = serverIds.length > 0
      ? await prisma.pingLog.findMany({
          where: { serverId: { in: serverIds } },
          orderBy: [{ serverId: "asc" }, { pingedAt: "desc" }],
          distinct: ["serverId"],
          select: {
            serverId: true,
            success: true,
            statusCode: true,
            responseTimeMs: true,
            pingedAt: true,
          },
        })
      : [];

    const lastPingMap = new Map(lastPings.map((p) => [p.serverId, p]));

    // Per-server uptime (24h)
    const perServerUptime = new Map<string, number>();
    for (const sid of serverIds) {
      const sPings = pings24h.filter((p) => p.serverId === sid);
      const sSuccess = sPings.filter((p) => p.success).length;
      perServerUptime.set(sid, sPings.length > 0 ? Math.round((sSuccess / sPings.length) * 10000) / 100 : 100);
    }

    // Per-server avg latency (24h)
    const perServerLatency = new Map<string, number>();
    for (const sid of serverIds) {
      const sPings = pings24h.filter((p) => p.serverId === sid && p.success && p.responseTimeMs > 0);
      perServerLatency.set(
        sid,
        sPings.length > 0 ? Math.round(sPings.reduce((s, p) => s + p.responseTimeMs, 0) / sPings.length) : 0
      );
    }

    // Enrich servers
    const enrichedServers = servers.map((s) => ({
      ...s,
      lastPing: lastPingMap.get(s.id) || null,
      uptime24h: perServerUptime.get(s.id) ?? 100,
      avgLatency24h: perServerLatency.get(s.id) ?? 0,
    }));

    return NextResponse.json({
      totalServers: servers.length,
      activeServers: servers.filter((s) => s.status === "ACTIVE").length,
      pausedServers: servers.filter((s) => s.status === "PAUSED").length,
      uptimePercent24h,
      avgLatencyMs24h,
      openIncidents,
      totalPings24h,
      chartData,
      servers: enrichedServers,
    });
  } catch (error) {
    console.error("[/api/stats]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
