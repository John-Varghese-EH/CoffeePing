import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

/**
 * Dashboard skeleton — matches the real dashboard layout exactly
 * so the transition from loading → loaded feels seamless.
 */
export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Skeleton className="h-9 w-48 mb-2" />
            <Skeleton className="h-5 w-72" />
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>

        {/* Quick Add Card */}
        <Card className="mb-8 border-coffee/20">
          <CardHeader>
            <Skeleton className="h-6 w-36 mb-1" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Skeleton className="h-10 sm:w-1/4 w-full rounded-md" />
              <Skeleton className="h-10 flex-1 rounded-md" />
              <Skeleton className="h-10 w-28 rounded-md" />
              <Skeleton className="h-10 w-28 rounded-md" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Card */}
        <Card className="mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>
          <CardContent>
            {/* Fake chart bars - deterministic values for SSR/client consistency */}
            <div className="h-[300px] sm:h-[350px] flex items-end gap-1 px-4 pt-4">
              {Array.from({ length: 24 }, (_, i) => {
                // Use deterministic pseudo-random based on index instead of Math.random()
                const pseudoRandom = ((i * 9301 + 49297) % 233280) / 233280;
                const height = 20 + Math.sin(i * 0.5) * 30 + pseudoRandom * 40;
                return (
                  <div key={i} className="flex-1 flex flex-col justify-end">
                    <Skeleton
                      className="w-full rounded-t-sm"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${i * 80}ms`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Server List */}
        <div className="mb-8">
          <Skeleton className="h-7 w-36 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-12 w-12 rounded-xl flex-shrink-0" />
                      <div className="flex-1 min-w-0 space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-60" />
                        <div className="flex gap-3">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Support CTA */}
        <Card className="border-coffee/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-14 w-14 rounded-xl flex-shrink-0" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

/**
 * Settings skeleton — matches the settings page card layout.
 */
export function SettingsSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Skeleton className="h-9 w-32 mb-2" />
          <Skeleton className="h-5 w-56" />
        </div>

        {/* Profile Card */}
        <Card className="mb-6 border-coffee/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-4 w-40 mt-1" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 flex-1 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-10 w-32 rounded-md" />
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card className="mb-6 border-coffee/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-4 w-36 mt-1" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <Skeleton className="h-10 w-40 rounded-md" />
          </CardContent>
        </Card>

        {/* Export Card */}
        <Card className="mb-6 border-coffee/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-52 mt-1" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-72 mb-4" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </CardContent>
        </Card>

        {/* Danger Zone Card */}
        <Card className="border-destructive/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-28" />
            </div>
            <Skeleton className="h-4 w-32 mt-1" />
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-muted p-4 space-y-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-3">
                <Skeleton className="h-10 w-64 rounded-md" />
                <Skeleton className="h-10 w-36 rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
