import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Code,
  Zap,
  Shield,
  Globe,
  Clock,
  Activity,
  Coffee,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Terminal,
} from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-coffee/10 text-coffee-light">Documentation</Badge>
          <h1 className="text-5xl font-bold tracking-tight mb-4">CoffeePing Docs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to keep your free-tier backends caffeinated 24/7
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block sticky top-24 h-fit">
            <nav className="space-y-1">
              <Link href="#quick-start" className="block px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                Quick Start
              </Link>
              <Link href="#how-it-works" className="block px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                How It Works
              </Link>
              <Link href="#api-reference" className="block px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                API Reference
              </Link>
              <Link href="#webhooks" className="block px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                Webhooks
              </Link>
              <Link href="#status-pages" className="block px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                Status Pages
              </Link>
              <Link href="#rate-limits" className="block px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                Rate Limits
              </Link>
              <Link href="#faq" className="block px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                FAQ
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Quick Start */}
            <section id="quick-start" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-coffee-light" />
                    Quick Start
                  </CardTitle>
                  <CardDescription>Get up and running in under 5 minutes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coffee/10 text-coffee-light font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold">Create an Account</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Sign up with GitHub or email to get your free API key
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coffee/10 text-coffee-light font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold">Add Your Server</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Paste your server URL and configure ping interval
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coffee/10 text-coffee-light font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold">That&apos;s It!</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your server will stay caffeinated 24/7, no cold starts
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-card border p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Terminal className="h-4 w-4" />
                      <span className="text-sm font-medium">curl</span>
                    </div>
                    <pre className="text-sm overflow-x-auto">
                      <code className="text-muted-foreground">
{`curl -X POST https://coffeeping.com/api/servers \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My API",
    "url": "https://api.example.com/health",
    "intervalMinutes": 5
  }'`}
                      </code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-coffee-light" />
                    How It Works
                  </CardTitle>
                  <CardDescription>Understanding the ping engine</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Coffee className="h-4 w-4" />
                      Human-like Jitter
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      CoffeePing adds randomized delays to pings to avoid platform detection. Each ping
                      has a unique timing based on:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>Up to 30% interval variance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>Daily sine-wave drift for natural patterns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>Per-job randomization across distributed workers</span>
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Smart Health Checks
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Don&apos;t just check for 200 OK. CoffeePing validates response content:
                    </p>
                    <div className="rounded-lg bg-card border p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">HTTP</Badge>
                        <div>
                          <div className="font-medium">Status Code Check</div>
                          <div className="text-xs text-muted-foreground">
                            Verifies expected status (default: 200)
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">JSON</Badge>
                        <div>
                          <div className="font-medium">Keyword Validation</div>
                          <div className="text-xs text-muted-foreground">
                            Searches for success keywords in response body
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">TIME</Badge>
                        <div>
                          <div className="font-medium">Latency Tracking</div>
                          <div className="text-xs text-muted-foreground">
                            Records response time for performance monitoring
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* API Reference */}
            <section id="api-reference" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-coffee-light" />
                    API Reference
                  </CardTitle>
                  <CardDescription>RESTful API for server management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-emerald-500">POST</Badge>
                      <code className="text-sm font-mono">/api/servers</code>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Create a new monitored server
                    </p>
                    <div className="rounded-lg bg-card border p-4">
                      <pre className="text-sm overflow-x-auto">
                        <code className="text-muted-foreground">
{`{
  "name": "My API",
  "url": "https://api.example.com/health",
  "intervalMinutes": 5,
  "successKeywords": ["status", "ok"],
  "expectedStatus": 200,
  "timeoutMs": 30000
}`}
                        </code>
                      </pre>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge>GET</Badge>
                      <code className="text-sm font-mono">/api/servers</code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      List all servers for authenticated user
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-amber-500">PUT</Badge>
                      <code className="text-sm font-mono">/api/servers/:id</code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Update server configuration
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-destructive">DELETE</Badge>
                      <code className="text-sm font-mono">/api/servers/:id</code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Remove a server from monitoring
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Webhooks */}
            <section id="webhooks" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-coffee-light" />
                    Webhooks
                  </CardTitle>
                  <CardDescription>Real-time notifications for server events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Supported Providers</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Discord</Badge>
                        <Badge variant="outline">Slack</Badge>
                        <Badge variant="outline">Telegram</Badge>
                        <Badge variant="outline">Custom Webhooks</Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Webhook Payload</h3>
                      <div className="rounded-lg bg-card border p-4">
                        <pre className="text-sm overflow-x-auto">
                          <code className="text-muted-foreground">
{`{
  "serverId": "srv_abc123",
  "serverName": "My API",
  "serverUrl": "https://api.example.com/health",
  "status": "DOWN",
  "message": "HTTP 503 Service Unavailable",
  "responseTimeMs": 1250,
  "statusCode": 503,
  "timestamp": "2026-04-23T18:20:00Z"
}`}
                          </code>
                        </pre>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-amber-400">Retry Policy</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Webhooks are retried up to 3 times with exponential backoff
                          if delivery fails.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Status Pages */}
            <section id="status-pages" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-coffee-light" />
                    Public Status Pages
                  </CardTitle>
                  <CardDescription>Share your uptime with the world</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Every user gets a free, SEO-friendly status page. Share it with your
                    users, stakeholders, or embed it in your documentation.
                  </p>

                  <div className="rounded-lg bg-card border p-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <Info className="h-4 w-4 text-coffee-light" />
                      <span className="text-sm font-medium">Example Status Page</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <code>https://coffeeping.com/status/my-project</code>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Features</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>Real-time status updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>Incident history</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>Uptime percentage display</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>"Powered by CoffeePing" branding (optional)</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Rate Limits */}
            <section id="rate-limits" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-coffee-light" />
                    Rate Limits
                  </CardTitle>
                  <CardDescription>Free tier and upgrade limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">Free Tier</h3>
                        <Badge className="bg-emerald-500/10 text-emerald-400">Forever</Badge>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>3 servers</li>
                        <li>5-minute minimum interval</li>
                        <li>3 server additions per hour</li>
                        <li>Public status pages</li>
                        <li>Basic notifications</li>
                      </ul>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">Pro Tier</h3>
                        <Badge className="bg-coffee/10 text-coffee-light">$9/mo</Badge>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Unlimited servers</li>
                        <li>1-minute minimum interval</li>
                        <li>No rate limits</li>
                        <li>Custom branding</li>
                        <li>Priority support</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-coffee-light" />
                    FAQ
                  </CardTitle>
                  <CardDescription>Frequently asked questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Is CoffeePing really free?</h3>
                      <p className="text-sm text-muted-foreground">
                        Yes! The free tier is forever. You can monitor up to 3 servers at no cost.
                        We also offer a Pro tier for power users.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-2">Will my platform detect the pings?</h3>
                      <p className="text-sm text-muted-foreground">
                        Our human-like jitter makes pings appear natural. Each ping has randomized
                        timing and comes from distributed IP addresses, making detection unlikely.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-2">What happens if my server goes down?</h3>
                      <p className="text-sm text-muted-foreground">
                        CoffeePing immediately triggers all configured notifications (Discord,
                        Slack, Telegram, webhooks) and creates an incident in your dashboard.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-2">Can I customize the ping interval?</h3>
                      <p className="text-sm text-muted-foreground">
                        Yes! Free tier supports 5-60 minute intervals. Pro tier supports 1-60
                        minute intervals.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-coffee/10 to-transparent border-coffee/20">
              <CardContent className="p-8 text-center">
                <Coffee className="h-12 w-12 text-coffee-light mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
                <p className="text-muted-foreground mb-6">
                  Start caffeinating your free-tier backends today
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/signup">
                    <Button size="lg" className="bg-coffee hover:bg-coffee-light text-white">
                      Sign Up Free <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="https://github.com" target="_blank">
                    <Button size="lg" variant="outline">
                      View on GitHub
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
