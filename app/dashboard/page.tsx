"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Plus, Trash2, Pause, Play, Server, ArrowUpRight, ArrowDownRight, Clock, Activity, Heart, Github, ExternalLink, Globe, Coffee, Zap, BarChart2 } from "lucide-react";

type ServerItem = {
  id: string;
  name: string;
  url: string;
  intervalMinutes: number;
  status: string;
  _count: { pings: number; incidents: number };
};

export default function DashboardPage() {
  const [servers, setServers] = useState<ServerItem[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchServers() {
    const res = await fetch("/api/servers");
    if (res.ok) {
      const data = await res.json();
      setServers(data);
    }
  }

  useEffect(() => {
    fetchServers();
  }, []);

  async function addServer() {
    if (!newUrl || !newName) return;
    setLoading(true);
    await fetch("/api/servers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName,
        url: newUrl,
        intervalMinutes: 5,
        successKeywords: [],
      }),
    });
    setNewUrl("");
    setNewName("");
    await fetchServers();
    setLoading(false);
  }

  const chartData = [
    { time: "00:00", latency: 28, uptime: 100 },
    { time: "04:00", latency: 32, uptime: 100 },
    { time: "08:00", latency: 45, uptime: 99.9 },
    { time: "12:00", latency: 22, uptime: 100 },
    { time: "16:00", latency: 35, uptime: 100 },
    { time: "20:00", latency: 30, uptime: 100 },
    { time: "23:59", latency: 26, uptime: 100 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor and manage your caffeinated servers
          </p>
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
                className="sm:w-1/3"
              />
              <Input
                placeholder="https://api.example.com/health"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={addServer}
                disabled={loading || !newUrl || !newName}
                className="bg-coffee hover:bg-coffee-light text-white w-full sm:w-auto"
              >
                {loading ? "Caffeinating..." : "Add Server"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs sm:text-sm">Total Servers</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl">{servers.length}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <ArrowUpRight className="h-3 w-3" />
                +1 this week
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs sm:text-sm">Avg Uptime</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl">99.98%</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <ArrowUpRight className="h-3 w-3" />
                +0.02%
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs sm:text-sm">Avg Latency</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl">28ms</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <ArrowDownRight className="h-3 w-3" />
                -4ms
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs sm:text-sm">Open Incidents</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl">
                {servers.reduce((sum, s) => sum + s._count.incidents, 0)}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <ArrowDownRight className="h-3 w-3" />
                All clear
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Uptime & Latency (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] sm:h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A67B5B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#A67B5B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
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

        {/* Server List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Servers</h2>
          <div className="space-y-4">
            {servers.map((server) => (
              <Card key={server.id} className="hover:border-coffee/40 transition-colors">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0 ${
                          server.status === "ACTIVE"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        <Server className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-base sm:text-lg">{server.name}</div>
                        <div className="text-sm text-muted-foreground truncate">{server.url}</div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{server.intervalMinutes}m</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          <span>{server._count.pings}</span>
                        </div>
                      </div>
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
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          {server.status === "ACTIVE" ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

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
                <Link href="/donate">
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    <Heart className="mr-2 h-4 w-4" />
                    Donate
                  </Button>
                </Link>
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
