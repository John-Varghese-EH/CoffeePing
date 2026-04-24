import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Coffee, ArrowUpRight, Heart, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";



export default async function StatusPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let page = null;
  try {
    page = await prisma.statusPage.findUnique({
      where: { slug },
      include: {
        user: {
          include: {
            servers: {
              include: {
                pings: {
                  orderBy: { pingedAt: "desc" },
                  take: 1,
                },
                incidents: {
                  where: { status: "OPEN" },
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    // Database error - render error page
    return <StatusPageError />;
  }

  if (!page) {
    notFound();
  }

  const accentColor = page?.accentColor || "#8B5CF6";

  const allUp = page?.user?.servers?.every(
    (s) => s.incidents.length === 0 && s.pings[0]?.success
  ) ?? true;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {page.customCss && (
        <style dangerouslySetInnerHTML={{ __html: page.customCss }} />
      )}
      <header className="border-b border-border" style={{ "--accent-color": accentColor } as React.CSSProperties}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-4">
            {page.logoUrl ? (
              <img
                src={page.logoUrl}
                alt={page.title}
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  // Hide broken images
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : null}
            <div>
              <h1 className="text-2xl font-bold">{page.title}</h1>
              {page.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {page.description}
                </p>
              )}
            </div>
          </div>
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${
              allUp
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            <Activity className="h-4 w-4" />
            {allUp ? "All Systems Operational" : "Some Services Disrupted"}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="space-y-4">
          {page.user.servers.map((server) => {
            const lastPing = server.pings[0];
            const isUp = lastPing?.success && server.incidents.length === 0;

            return (
              <Card key={server.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        isUp ? "bg-emerald-500" : "bg-destructive"
                      }`}
                    />
                    <div>
                      <div className="font-medium">{server.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {server.url}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {lastPing && (
                      <span className="hidden sm:inline">
                        {lastPing.responseTimeMs}ms
                      </span>
                    )}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        isUp
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {isUp ? "Operational" : "Down"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Always show CoffeePing + J0X branding */}
        <div className="mt-12 flex flex-col items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-coffee-light" />
            Powered by{" "}
            <a
              href="https://coffeeping.vercel.app"
              className="font-medium text-foreground hover:underline"
            >
              CoffeePing
            </a>
          </div>
          <div className="flex items-center gap-1 text-xs">
            Built with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by{" "}
            <a
              href="https://linkedin.com/in/John--Varghese"
              target="_blank"
              className="text-coffee-light hover:underline"
            >
              John Varghese
            </a>{" "}
            (<a
              href="https://github.com/John-Varghese-EH"
              target="_blank"
              className="text-coffee-light hover:underline"
            >
              J0X
            </a>)
          </div>
          <span className="inline-flex items-center gap-1 text-xs">
            Keep your server awake <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </main>
    </div>
  );
}

// Error component for database issues
function StatusPageError() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
          <Coffee className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Service Unavailable</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          We&apos;re having trouble loading this status page. Please try again later.
        </p>
        <Button asChild>
          <Link href="https://coffeeping.vercel.app">
            Go to CoffeePing
          </Link>
        </Button>
      </div>
    </div>
  );
}
