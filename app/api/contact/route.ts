import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp, logSecurityEvent, sanitizeHtml } from "@/lib/security";
import { contactFormSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    // Rate limit check for contact form (3 per hour)
    const clientIp = getClientIp(request);
    const rateLimit = await checkRateLimit(clientIp, "contact");

    if (!rateLimit.success) {
      await logSecurityEvent("rate_limit_exceeded", {
        endpoint: "/api/contact",
        method: "POST",
        ip: clientIp,
      });
      return NextResponse.json(
        { error: "Rate limit exceeded. You can send up to 3 messages per hour." },
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
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      await logSecurityEvent("validation_error", {
        endpoint: "/api/contact",
        method: "POST",
        errors: parsed.error.errors,
        ip: clientIp,
      });
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeHtml(parsed.data.name),
      email: parsed.data.email.toLowerCase(),
      subject: sanitizeHtml(parsed.data.subject),
      message: sanitizeHtml(parsed.data.message),
    };

    // Log the contact submission
    await logSecurityEvent("contact_form_submitted", {
      name: sanitizedData.name,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      ip: clientIp,
    });

    // In production, you would:
    // 1. Send email to support team
    // 2. Store in database
    // 3. Send confirmation to user

    // For now, just return success
    return NextResponse.json(
      { message: "Thank you for your message. We'll get back to you soon!" },
      { status: 200 }
    );
  } catch (error) {
    await logSecurityEvent("api_error", {
      endpoint: "/api/contact",
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
