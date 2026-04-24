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

    const page = await prisma.statusPage.findFirst({
      where: { userId: user.id },
    });

    return NextResponse.json(page || null);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { slug, title, description, logoUrl, accentColor, customCss } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: "Slug and title are required" }, { status: 400 });
    }

    // Validate logoUrl if provided
    if (logoUrl && !logoUrl.match(/^https?:\/\/.+/)) {
      return NextResponse.json({ error: "Logo URL must be a valid HTTPS URL" }, { status: 400 });
    }

    // Check if slug is taken by someone else
    const existing = await prisma.statusPage.findUnique({ where: { slug } });
    if (existing && existing.userId !== user.id) {
      return NextResponse.json({ error: "Slug is already taken" }, { status: 409 });
    }

    // Upsert the status page for the user
    const userExisting = await prisma.statusPage.findFirst({ where: { userId: user.id } });

    let page;
    if (userExisting) {
      page = await prisma.statusPage.update({
        where: { id: userExisting.id },
        data: {
          slug,
          title,
          description,
          logoUrl: logoUrl || null,
          accentColor: accentColor || null,
          customCss: customCss || null,
        },
      });
    } else {
      page = await prisma.statusPage.create({
        data: {
          userId: user.id,
          slug,
          title,
          description,
          logoUrl: logoUrl || null,
          accentColor: accentColor || null,
          customCss: customCss || null,
        },
      });
    }

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const page = await prisma.statusPage.findFirst({
      where: { userId: user.id },
    });

    if (page) {
      await prisma.statusPage.delete({ where: { id: page.id } });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
