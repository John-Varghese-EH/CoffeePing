import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit, getClientIp, sanitizeUrl, logSecurityEvent } from "@/lib/security";
import { serverCreateSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      await logSecurityEvent("unauthorized_access", {
        endpoint: "/api/servers",
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
        endpoint: "/api/servers",
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

    const servers = await prisma.server.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { pings: true, incidents: true } },
      },
    });

    return NextResponse.json(servers, {
      headers: {
        "X-RateLimit-Limit": rateLimit.limit.toString(),
        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        "X-RateLimit-Reset": rateLimit.reset.toString(),
      },
    });
  } catch (error) {
    await logSecurityEvent("api_error", {
      endpoint: "/api/servers",
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
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      await logSecurityEvent("unauthorized_access", {
        endpoint: "/api/servers",
        method: "POST",
        ip: getClientIp(request),
      });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit check for server creation
    const rateLimit = await checkRateLimit(user.id, "serverCreate");
    if (!rateLimit.success) {
      await logSecurityEvent("rate_limit_exceeded", {
        userId: user.id,
        endpoint: "/api/servers",
        method: "POST",
        ip: getClientIp(request),
      });
      return NextResponse.json(
        { error: "Rate limit exceeded. You can create up to 10 servers per hour." },
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
    const parsed = serverCreateSchema.safeParse(body);

    if (!parsed.success) {
      await logSecurityEvent("validation_error", {
        userId: user.id,
        endpoint: "/api/servers",
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

    const server = await prisma.server.create({
      data: {
        userId: user.id,
        name: parsed.data.name as string,
        url: sanitizedUrl,
        intervalMinutes: parsed.data.intervalMinutes as number,
        expectedStatus: parsed.data.expectedStatus as number,
        timeoutMs: parsed.data.timeoutMs as number,
        successKeywords: parsed.data.successKeywords,
        headers: parsed.data.headers as Record<string, string> | undefined,
        followRedirects: parsed.data.followRedirects as boolean,
      },
    });

    await logSecurityEvent("server_created", {
      userId: user.id,
      serverId: server.id,
      serverName: server.name,
      ip: getClientIp(request),
    });

    return NextResponse.json(server, { status: 201 });
  } catch (error) {
    await logSecurityEvent("api_error", {
      endpoint: "/api/servers",
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
