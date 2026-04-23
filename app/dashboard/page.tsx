"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";
import { DashboardSkeleton } from "@/components/skeletons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Plus,
  Trash2,
  Pause,
  Play,
  Server,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Activity,
  Heart,
  Github,
  Coffee,
  Loader2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Wifi,
  WifiOff,
  Settings,
} from "lucide-react";

type LastPing = {
  success: boolean;
  statusCode: number | null;
  responseTimeMs: number;
  pingedAt: string;
};

type ServerItem = {
  id: string;
  name: string;
  url: string;
  intervalMinutes: number;
  status: string;
  createdAt: string;
  _count: { pings: number; incidents: number };
  lastPing: LastPing | null;
  uptime24h: number;
  avgLatency24h: number;
};

type ChartPoint = {
  time: string;
  latency: number;
  uptime: number;
  pings: number;
};

type DashboardStats = {
  totalServers: number;
  activeServers: number;
  pausedServers: number;
  uptimePercent24h: number;
  avgLatencyMs24h: number;
  openIncidents: number;
  totalPings24h: number;
  chartData: ChartPoint[];
  servers: ServerItem[];
};

// Inline skeleton used when auth is verified but stats are loading
function DashboardInlineSkeleton() {
  // Lazy import to keep the component co-located
  const Skeleton = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <div
      className={`relative overflow-hidden rounded-md bg-muted before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent ${className || ""}`}
      style={style}
    />
  );

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Chart */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32 mb-1" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent>
          <div className="h-[300px] sm:h-[350px] flex items-end gap-1 px-4 pt-4">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end">
                <Skeleton
                  className="w-full rounded-t-sm"
                  style={{
                    height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 40}%`,
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Server List */}
      <div>
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
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newName, setNewName] = useState("");
  const [newInterval, setNewInterval] = useState(5);
  const [addingServer, setAddingServer] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Auth guard
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, [supabase, router]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/stats");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // silent fail, will retry
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (authChecked) {
      fetchStats();
      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchStats, 30000);
      return () => clearInterval(interval);
    }
  }, [authChecked, fetchStats]);

  // Add server
  async function addServer() {
    if (!newUrl || !newName) return;
    setAddingServer(true);
    try {
      const res = await fetch("/api/servers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          url: newUrl,
          intervalMinutes: newInterval,
          successKeywords: [],
        }),
      });
      if (res.ok) {
        setNewUrl("");
        setNewName("");
        toast({ title: "Server added!", description: `${newName} is now being caffeinated.` });
        await fetchStats();
      } else {
        const data = await res.json();
        toast({
          title: "Failed to add server",
          description: data.error || "Please check your input and try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({ title: "Network error", description: "Could not reach the server.", variant: "destructive" });
    } finally {
      setAddingServer(false);
    }
  }

  // Toggle server status
  async function toggleServer(server: ServerItem) {
    setTogglingId(server.id);
    const newStatus = server.status === "ACTIVE" ? "PAUSED" : "ACTIVE";
    try {
      const res = await fetch(`/api/servers/${server.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast({
          title: newStatus === "ACTIVE" ? "Server resumed" : "Server paused",
          description: `${server.name} is now ${newStatus.toLowerCase()}.`,
        });
        await fetchStats();
      } else {
        toast({ title: "Failed to update server", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    } finally {
      setTogglingId(null);
    }
  }

  // Delete server
  async function deleteServer(server: ServerItem) {
    if (!confirm(`Are you sure you want to delete "${server.name}"? This will remove all ping history and cannot be undone.`)) {
      return;
    }
    setDeletingId(server.id);
    try {
      const res = await fetch(`/api/servers/${server.id}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Server deleted", description: `${server.name} has been removed.` });
        await fetchStats();
      } else {
        toast({ title: "Failed to delete server", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  }

  // Show full skeleton until auth is verified
  if (!authChecked) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Monitor and manage your caffeinated servers
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={fetchStats} className="gap-2" disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>

        {/* Quick Add */}
        <Card className="mb-8 border-coffee/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Plus className="h-5 w-5" />
              Add a Server
            </CardTitle>
            <CardDescription className="text-sm">
              Paste a URL to caffeinate it in under 10 seconds.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                placeholder="Server name (e.g., My API)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="sm:w-1/4"
              />
              <Input
                placeholder="https://api.example.com/health"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="flex-1"
              />
              <select
                value={newInterval}
                onChange={(e) => setNewInterval(Number(e.target.value))}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value={5}>Every 5m</option>
                <option value={10}>Every 10m</option>
                <option value={15}>Every 15m</option>
                <option value={30}>Every 30m</option>
              </select>
              <Button
                onClick={addServer}
                disabled={addingServer || !newUrl || !newName}
                className="bg-coffee hover:bg-coffee-light text-white w-full sm:w-auto"
              >
                {addingServer ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Server"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading && !stats ? (
          /* Loading State — inline skeleton for stats + chart + servers */
          <DashboardInlineSkeleton />
        ) : stats && stats.totalServers === 0 ? (
          /* Empty State */
          <Card className="border-dashed border-2 border-coffee/20">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-coffee/10 text-coffee-light mb-6">
                <Coffee className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No servers yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Add your first server above to start monitoring. We&apos;ll keep it caffeinated 24/7 with human-like pings.
              </p>
              <div className="flex flex-wrap gap-3 justify-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Zero cold starts
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Real-time alerts
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Free forever
                </div>
              </div>
            </CardContent>
          </Card>
        ) : stats ? (
          <>
            {/* Stats Cards */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs sm:text-sm">Total Servers</CardDescription>
                  <CardTitle className="text-2xl sm:text-3xl">{stats.totalServers}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Server className="h-3 w-3" />
                    {stats.activeServers} active, {stats.pausedServers} paused
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs sm:text-sm">Uptime (24h)</CardDescription>
                  <CardTitle className="text-2xl sm:text-3xl">
                    {stats.totalPings24h > 0 ? `${stats.uptimePercent24h}%` : "—"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    {stats.uptimePercent24h >= 99 ? (
                      <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-amber-400" />
                    )}
                    {stats.totalPings24h} pings in last 24h
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs sm:text-sm">Avg Latency (24h)</CardDescription>
                  <CardTitle className="text-2xl sm:text-3xl">
                    {stats.totalPings24h > 0 ? `${stats.avgLatencyMs24h}ms` : "—"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {stats.totalPings24h > 0 ? "From successful pings" : "No data yet"}
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs sm:text-sm">Open Incidents</CardDescription>
                  <CardTitle className="text-2xl sm:text-3xl">{stats.openIncidents}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    {stats.openIncidents === 0 ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        All clear
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-3 w-3 text-amber-400" />
                        Needs attention
                      </>
                    )}
                  </span>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            {stats.totalPings24h > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Latency (24h)</CardTitle>
                  <CardDescription>Average response time per hour across all servers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] sm:h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats.chartData}>
                        <defs>
                          <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#A67B5B" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#A67B5B" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} unit="ms" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "0.5rem",
                            color: "hsl(var(--foreground))",
                          }}
                          formatter={(value: number, name: string) => {
                            if (name === "latency") return [`${value}ms`, "Avg Latency"];
                            return [value, name];
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="latency"
                          stroke="#A67B5B"
                          fillOpacity={1}
                          fill="url(#colorLatency)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Server List */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Servers</h2>
              <div className="space-y-4">
                {stats.servers.map((server) => (
                  <Card key={server.id} className="hover:border-coffee/40 transition-colors">
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {/* Status indicator */}
                          <div className="relative flex-shrink-0">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                server.status !== "ACTIVE"
                                  ? "bg-amber-500/10 text-amber-400"
                                  : server.lastPing?.success !== false
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : "bg-red-500/10 text-red-400"
                              }`}
                            >
                              {server.status !== "ACTIVE" ? (
                                <Pause className="h-6 w-6" />
                              ) : server.lastPing?.success !== false ? (
                                <Wifi className="h-6 w-6" />
                              ) : (
                                <WifiOff className="h-6 w-6" />
                              )}
                            </div>
                            {/* Live dot */}
                            {server.status === "ACTIVE" && server.lastPing && (
                              <div
                                className={`absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                                  server.lastPing.success ? "bg-emerald-500" : "bg-red-500"
                                }`}
                              />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-base sm:text-lg">{server.name}</div>
                            <div className="text-sm text-muted-foreground truncate">{server.url}</div>
                            {/* Per-server stats */}
                            {server.lastPing && (
                              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                                <span className="inline-flex items-center gap-1">
                                  <Activity className="h-3 w-3" />
                                  {server.lastPing.responseTimeMs}ms
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  {server.uptime24h >= 99 ? (
                                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                  ) : (
                                    <XCircle className="h-3 w-3 text-amber-400" />
                                  )}
                                  {server.uptime24h}% uptime
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(server.lastPing.pingedAt).toLocaleTimeString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {server.intervalMinutes}m
                            </Badge>
                            <Badge
                              variant={server.status === "ACTIVE" ? "default" : "secondary"}
                              className={
                                server.status === "ACTIVE"
                                  ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                  : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                              }
                            >
                              {server.status}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleServer(server)}
                              disabled={togglingId === server.id}
                              title={server.status === "ACTIVE" ? "Pause monitoring" : "Resume monitoring"}
                            >
                              {togglingId === server.id ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : server.status === "ACTIVE" ? (
                                <Pause className="h-5 w-5" />
                              ) : (
                                <Play className="h-5 w-5" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => deleteServer(server)}
                              disabled={deletingId === server.id}
                              title="Delete server"
                            >
                              {deletingId === server.id ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                <Trash2 className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        ) : null}

        {/* Support Prompt */}
        <Card className="bg-gradient-to-br from-coffee/10 to-transparent border-coffee/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-coffee/10 text-coffee-light">
                  <Heart className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Love CoffeePing?</h3>
                  <p className="text-sm text-muted-foreground">
                    It&apos;s 100% free and open-source. Consider supporting the creator to keep it running!
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
                  <Link href="/donate">
                    <Heart className="mr-2 h-4 w-4" />
                    Donate
                  </Link>
                </Button>
                <a
                  href="https://github.com/John-Varghese-EH/CoffeePing"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-lg border border-coffee/30 bg-coffee/10 px-4 py-2 text-sm text-coffee-light hover:bg-coffee/20 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  Star on GitHub
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
