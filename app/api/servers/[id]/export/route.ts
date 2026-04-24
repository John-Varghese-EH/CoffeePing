import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Verify ownership
    const server = await prisma.server.findFirst({
      where: { id, userId: user.id },
      select: { name: true, url: true }
    });

    if (!server) {
      return NextResponse.json({ error: "Server not found" }, { status: 404 });
    }

    // Fetch the last 10,000 pings (approx 30 days for 5min interval)
    const pings = await prisma.pingLog.findMany({
      where: { serverId: id },
      orderBy: { pingedAt: "desc" },
      take: 10000,
    });

    // Generate CSV string
    const headers = ["Timestamp", "Status", "Response Time (ms)", "Error Details"];
    const rows = pings.map((ping) => [
      new Date(ping.pingedAt).toISOString(),
      ping.success ? "UP" : "DOWN",
      ping.responseTimeMs.toString(),
      ping.errorMessage ? `"${ping.errorMessage.replace(/"/g, '""')}"` : "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="coffeeping-${server.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-logs.csv"`,
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
