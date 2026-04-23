import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit, getClientIp, logSecurityEvent, sanitizeUrl } from "@/lib/security";
import { webhookCreateSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase/server";
import { dispatchNotifications } from "@/lib/notification/bridge";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      await logSecurityEvent("unauthorized_access", {
        endpoint: "/api/webhooks",
        method: "GET",
        ip: getClientIp(request),
      });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit check
    const rateLimit = await checkRateLimit(user.id, "api");
    if (!rateLimit.success) {
      await logSecurityEvent("rate_limit_exceeded", {
        userId: user.id,
        endpoint: "/api/webhooks",
        method: "GET",
        ip: getClientIp(request),
      });
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimit.limit.toString(),
            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
            "X-RateLimit-Reset": rateLimit.reset.toString(),
          },
        }
      );
    }

    const channels = await prisma.notificationChannel.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(channels, {
      headers: {
        "X-RateLimit-Limit": rateLimit.limit.toString(),
        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        "X-RateLimit-Reset": rateLimit.reset.toString(),
      },
    });
  } catch (error) {
    await logSecurityEvent("api_error", {
      endpoint: "/api/webhooks",
      method: "GET",
      error: error instanceof Error ? error.message : "Unknown error",
      ip: getClientIp(request),
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      await logSecurityEvent("unauthorized_access", {
        endpoint: "/api/webhooks",
        method: "POST",
        ip: getClientIp(request),
      });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit check for webhook creation
    const rateLimit = await checkRateLimit(user.id, "webhook");
    if (!rateLimit.success) {
      await logSecurityEvent("rate_limit_exceeded", {
        userId: user.id,
        endpoint: "/api/webhooks",
        method: "POST",
        ip: getClientIp(request),
      });
      return NextResponse.json(
        { error: "Rate limit exceeded. You can create up to 50 webhooks per hour." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimit.limit.toString(),
            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
            "X-RateLimit-Reset": rateLimit.reset.toString(),
          },
        }
      );
    }

    const body = await request.json();
    const parsed = webhookCreateSchema.safeParse(body);

    if (!parsed.success) {
      await logSecurityEvent("validation_error", {
        userId: user.id,
        endpoint: "/api/webhooks",
        method: "POST",
        errors: parsed.error.errors,
        ip: getClientIp(request),
      });
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Sanitize URL
    const sanitizedUrl = sanitizeUrl(parsed.data.url as string);

    // Verify server ownership
    const server = await prisma.server.findFirst({
      where: { id: parsed.data.serverId as string, userId: user.id },
    });
    if (!server) {
      await logSecurityEvent("unauthorized_server_access", {
        userId: user.id,
        serverId: parsed.data.serverId as string,
        ip: getClientIp(request),
      });
      return NextResponse.json({ error: "Server not found" }, { status: 404 });
    }

    const channel = await prisma.notificationChannel.create({
      data: {
        userId: user.id,
        serverId: parsed.data.serverId as string,
        type: parsed.data.type,
        label: parsed.data.name as string,
        config: {
          url: sanitizedUrl,
          ...(parsed.data.config || {})
        },
      },
    });

    await logSecurityEvent("webhook_created", {
      userId: user.id,
      webhookId: channel.id,
      webhookType: channel.type,
      ip: getClientIp(request),
    });

    return NextResponse.json(channel, { status: 201 });
  } catch (error) {
    await logSecurityEvent("api_error", {
      endpoint: "/api/webhooks",
      method: "POST",
      error: error instanceof Error ? error.message : "Unknown error",
      ip: getClientIp(request),
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/webhooks/test
 * Body: { channelId: string }
 */
export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      await logSecurityEvent("unauthorized_access", {
        endpoint: "/api/webhooks",
        method: "PATCH",
        ip: getClientIp(request),
      });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { channelId } = body;

    if (!channelId) {
      return NextResponse.json({ error: "Channel ID is required" }, { status: 400 });
    }

    const channel = await prisma.notificationChannel.findFirst({
      where: { id: channelId, userId: user.id },
    });
    if (!channel) {
      await logSecurityEvent("unauthorized_webhook_access", {
        userId: user.id,
        webhookId: channelId,
        ip: getClientIp(request),
      });
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const server = channel.serverId
      ? await prisma.server.findUnique({ where: { id: channel.serverId } })
      : null;

    await dispatchNotifications({
      serverId: channel.serverId || "test",
      serverName: server?.name || "Test Server",
      serverUrl: server?.url || "https://coffeeping.com",
      status: "UP",
      message: "This is a test notification from CoffeePing ☕",
      timestamp: new Date().toISOString(),
    });

    await logSecurityEvent("webhook_tested", {
      userId: user.id,
      webhookId: channelId,
      ip: getClientIp(request),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    await logSecurityEvent("api_error", {
      endpoint: "/api/webhooks",
      method: "PATCH",
      error: error instanceof Error ? error.message : "Unknown error",
      ip: getClientIp(request),
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
