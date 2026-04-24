import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch recent incidents from user's servers
    const incidents = await prisma.incident.findMany({
      where: {
        server: {
          userId: user.id,
        },
      },
      include: {
        server: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        startedAt: "desc",
      },
      take: 20, // Last 20 incidents
    });

    // Format incidents as alerts
    const alerts = incidents.map((incident) => ({
      id: incident.id,
      serverName: incident.server.name,
      message: incident.message || `Server reported an issue`,
      // Map status to severity
      severity: incident.status === "OPEN" ? "critical" : "info" as "info" | "warning" | "critical",
      timestamp: incident.startedAt.toISOString(),
      resolved: incident.status === "RESOLVED",
    }));

    return NextResponse.json(alerts);
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
