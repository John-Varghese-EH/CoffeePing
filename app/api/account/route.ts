import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

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

    // Get server count and notification count
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        _count: {
          select: {
            servers: true,
            notifications: true,
            statusPages: true,
          },
        },
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name || dbUser?.name || "",
      createdAt: dbUser?.createdAt || user.created_at,
      counts: dbUser?._count || { servers: 0, notifications: 0, statusPages: 0 },
    });
  } catch (error) {
    console.error("[/api/account GET]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Update display name in Supabase Auth metadata
    if (body.name !== undefined) {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: body.name },
      });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    // Update password
    if (body.newPassword) {
      const { error } = await supabase.auth.updateUser({
        password: body.newPassword,
      });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[/api/account PUT]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete all user data in order (cascading via schema, but being explicit)
    await prisma.pingLog.deleteMany({
      where: { server: { userId: user.id } },
    });
    await prisma.incident.deleteMany({
      where: { server: { userId: user.id } },
    });
    await prisma.notificationChannel.deleteMany({
      where: { userId: user.id },
    });
    await prisma.server.deleteMany({
      where: { userId: user.id },
    });
    await prisma.statusPage.deleteMany({
      where: { userId: user.id },
    });
    await prisma.dailyReport.deleteMany({
      where: { userId: user.id },
    });

    // Note: Supabase Auth user deletion requires admin/service role key
    // For now, we clear all data and sign out. The auth record remains but has no data.
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[/api/account DELETE]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
