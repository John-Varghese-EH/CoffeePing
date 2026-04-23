import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Coffee, Globe, ArrowUpRight } from "lucide-react";



export default async function StatusPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await prisma.statusPage.findUnique({
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

  if (!page) {
    notFound();
  }

  const allUp = page.user.servers.every(
    (s) => s.incidents.length === 0 && s.pings[0]?.success
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <div>
            <h1 className="text-2xl font-bold">{page.title}</h1>
            {page.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {page.description}
              </p>
            )}
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

        {page.branding && (
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Coffee className="h-4 w-4 text-coffee-light" />
            Powered by{" "}
            <a
              href="https://coffeeping.vercel.app"
              className="font-medium text-foreground hover:underline"
            >
              CoffeePing
            </a>{" "}
            -{" "}
            <span className="inline-flex items-center gap-1">
              Keep your server awake <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
