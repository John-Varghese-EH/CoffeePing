"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Globe, Copy, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

export default function StatusPagesDashboard() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [pageData, setPageData] = useState<{ id: string, slug: string, title: string, description: string | null, branding: boolean } | null>(null);
  
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [branding, setBranding] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch("/api/status-pages");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setPageData(data);
          setSlug(data.slug);
          setTitle(data.title);
          setDescription(data.description || "");
          setBranding(data.branding);
        }
      }
    } catch {
      toast({ title: "Failed to load status page settings", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  async function savePage() {
    if (!slug || !title) return;
    setSaving(true);
    try {
      const res = await fetch("/api/status-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, title, description, branding }),
      });
      if (res.ok) {
        const data = await res.json();
        setPageData(data);
        toast({ title: "Status page saved successfully" });
      } else {
        const data = await res.json();
        toast({ title: "Save failed", description: data.error, variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  async function deletePage() {
    if (!confirm("Are you sure you want to delete your public status page?")) return;
    try {
      const res = await fetch("/api/status-pages", { method: "DELETE" });
      if (res.ok) {
        setPageData(null);
        setSlug("");
        setTitle("");
        setDescription("");
        toast({ title: "Status page deleted" });
      }
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  }

  const copyLink = () => {
    if (!pageData) return;
    const url = `${window.location.origin}/status/${pageData.slug}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Link copied to clipboard" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-4xl w-full px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Public Status Page</h1>
          <p className="mt-2 text-muted-foreground">
            Create a public dashboard to share your uptime with customers.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-6">
            {pageData && (
              <Card className="border-coffee/40 bg-coffee/5">
                <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Globe className="h-5 w-5 text-coffee" />
                      Your page is live!
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 break-all">
                      {typeof window !== "undefined" ? window.location.origin : ""}/status/{pageData.slug}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button variant="outline" className="flex-1 sm:flex-none" onClick={copyLink}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>
                    <Button asChild className="flex-1 sm:flex-none bg-coffee hover:bg-coffee-light">
                      <Link href={`/status/${pageData.slug}`} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Page Configuration</CardTitle>
                <CardDescription>
                  Customize how your public status page looks.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL Slug</label>
                  <div className="flex items-center">
                    <span className="bg-muted px-3 py-2 border border-r-0 border-input rounded-l-md text-sm text-muted-foreground">
                      /status/
                    </span>
                    <Input
                      className="rounded-l-none"
                      placeholder="my-awesome-app"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Letters, numbers, and hyphens only.</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Page Title</label>
                  <Input
                    placeholder="My Awesome App Status"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description (Optional)</label>
                  <Input
                    placeholder="Welcome to our system status page."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Show CoffeePing Branding</label>
                    <p className="text-xs text-muted-foreground">
                      Display "Powered by CoffeePing" at the bottom of the page.
                    </p>
                  </div>
                  <Switch
                    checked={branding}
                    onCheckedChange={setBranding}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col-reverse sm:flex-row justify-between gap-4 border-t p-6">
                {pageData ? (
                  <Button variant="ghost" className="w-full sm:w-auto text-destructive hover:text-destructive hover:bg-destructive/10" onClick={deletePage}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Page
                  </Button>
                ) : (
                  <div></div>
                )}
                <Button onClick={savePage} disabled={saving || !slug || !title} className="w-full sm:w-auto bg-coffee hover:bg-coffee-light">
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {pageData ? "Save Changes" : "Create Page"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
