import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify server ownership
    const server = await prisma.server.findFirst({
      where: { id, userId: user.id },
    });
    if (!server) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const url = new URL(request.url);
    const hours = parseInt(url.searchParams.get("hours") || "24", 10);
    const clampedHours = Math.min(Math.max(hours, 1), 168); // 1h to 7d
    const since = new Date(Date.now() - clampedHours * 60 * 60 * 1000);

    const pings = await prisma.pingLog.findMany({
      where: {
        serverId: id,
        pingedAt: { gte: since },
      },
      orderBy: { pingedAt: "desc" },
      take: 500,
      select: {
        id: true,
        statusCode: true,
        responseTimeMs: true,
        success: true,
        keywordMatch: true,
        errorMessage: true,
        pingedAt: true,
        region: true,
      },
    });

    return NextResponse.json({ pings, total: pings.length });
  } catch (error) {
    console.error("[/api/servers/:id/pings]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
