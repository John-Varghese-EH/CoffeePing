"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Bell, 
  Trash2, 
  Plus, 
  Loader2, 
  Send,
  Webhook
} from "lucide-react";

type ServerItem = {
  id: string;
  name: string;
};

type WebhookItem = {
  id: string;
  serverId: string | null;
  type: string;
  label: string;
  config: { url: string };
  createdAt: string;
};

export default function NotificationsPage() {
  const { toast } = useToast();
  const [servers, setServers] = useState<ServerItem[]>([]);
  const [webhooks, setWebhooks] = useState<WebhookItem[]>([]);
  const [loading, setLoading] = useState(true);

  // New webhook state
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newType, setNewType] = useState("DISCORD");
  const [newServerId, setNewServerId] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [serversRes, webhooksRes] = await Promise.all([
        fetch("/api/servers"),
        fetch("/api/webhooks")
      ]);
      if (serversRes.ok) {
        const data = await serversRes.json();
        setServers(data);
        if (data.length > 0) setNewServerId(data[0].id);
      }
      if (webhooksRes.ok) {
        const data = await webhooksRes.json();
        setWebhooks(data);
      }
    } catch (e) {
      toast({ title: "Error loading data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  async function addWebhook() {
    if (!newLabel || !newUrl || !newServerId) return;
    setIsAdding(true);
    try {
      const res = await fetch("/api/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newLabel,
          url: newUrl,
          type: newType,
          serverId: newServerId,
        }),
      });
      if (res.ok) {
        toast({ title: "Notification channel added!" });
        setNewLabel("");
        setNewUrl("");
        await fetchData();
      } else {
        const data = await res.json();
        toast({ title: "Failed to add", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    } finally {
      setIsAdding(false);
    }
  }

  async function testWebhook(id: string) {
    try {
      const res = await fetch("/api/webhooks/test", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelId: id }),
      });
      if (res.ok) {
        toast({ title: "Test notification sent!" });
      } else {
        toast({ title: "Test failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    }
  }

  async function deleteWebhook(id: string) {
    if (!confirm("Are you sure you want to delete this notification channel?")) return;
    try {
      const res = await fetch(`/api/webhooks?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Channel deleted" });
        setWebhooks((prev) => prev.filter((w) => w.id !== id));
      } else {
        toast({ title: "Failed to delete", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Notification Channels</h1>
          <p className="mt-2 text-muted-foreground">
            Get alerted instantly when your servers go down.
          </p>
        </div>

        {/* Add Webhook Form */}
        <Card className="mb-8 border-coffee/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" /> Add Notification Channel
            </CardTitle>
            <CardDescription>
              Connect Discord, Slack, or generic webhooks to specific servers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
              <div className="md:col-span-1">
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring h-10"
                >
                  <option value="DISCORD">Discord</option>
                  <option value="SLACK">Slack</option>
                  <option value="WEBHOOK">Webhook</option>
                </select>
              </div>
              <div className="md:col-span-1">
                <Input
                  placeholder="Label (e.g., Team Alerts)"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  placeholder="https://discord.com/api/webhooks/..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                />
              </div>
              <div className="md:col-span-1">
                <select
                  value={newServerId}
                  onChange={(e) => setNewServerId(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring h-10"
                >
                  {servers.length === 0 && <option disabled value="">No servers found</option>}
                  {servers.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={addWebhook}
                disabled={isAdding || !newLabel || !newUrl || !newServerId}
                className="bg-coffee hover:bg-coffee-light text-white"
              >
                {isAdding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Save Channel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Existing Webhooks List */}
        <h2 className="text-xl font-bold mb-4">Your Channels</h2>
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : webhooks.length === 0 ? (
          <Card className="border-dashed border-2 border-coffee/20">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
              <h3 className="text-lg font-medium">No channels set up yet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add a webhook above to start receiving downtime alerts.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {webhooks.map((w) => (
              <Card key={w.id}>
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <Webhook className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{w.label}</h3>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-md">
                        {w.config.url}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{w.type}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Attached to: {servers.find(s => s.id === w.serverId)?.name || "Unknown Server"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <Button variant="outline" size="sm" onClick={() => testWebhook(w.id)}>
                      <Send className="h-4 w-4 mr-2" />
                      Test
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteWebhook(w.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
