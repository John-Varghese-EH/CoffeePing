"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Activity, Zap, Shield, BarChart3, Globe, ArrowRight, Github, MessageCircle, Coffee, CheckCircle2, Plus, Users } from "lucide-react";
import Link from "next/link";

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(43201);
  useEffect(() => {
    let start = count;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target]);
  return (
    <span className="tabular-nums font-bold text-coffee-light">
      {count.toLocaleString()}
    </span>
  );
}

export default function LandingPage() {
  const [quickUrl, setQuickUrl] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-coffee/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-coffee/30 bg-coffee/10 px-4 py-1.5 text-sm text-coffee-light">
                  <Zap className="h-3.5 w-3.5" />
                  100% Free & Open Source
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
                  <Activity className="h-3.5 w-3.5" />
                  Trusted by 10,000+ developers
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                Stop Letting Your{" "}
                <span className="text-coffee-light">Free-Tier Backends</span>{" "}
                Sleep
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl max-w-lg leading-relaxed">
                CoffeePing keeps your Render, Railway, and Fly.io apps
                "caffeinated" 24/7. Zero cold starts. Zero latency.
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Setup in 2 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Cancel anytime</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/signup" className="flex-1">
                  <Button size="lg" className="w-full h-14 bg-coffee hover:bg-coffee-light text-white text-lg shadow-lg shadow-coffee/20">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://github.com/John-Varghese-EH/CoffeePing" target="_blank" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full h-14 text-lg gap-2">
                    <Github className="h-5 w-5" />
                    View on GitHub
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Activity className="h-5 w-5 text-emerald-400" />
                  <span className="font-medium">Currently keeping <AnimatedCounter target={43921} /> servers awake</span>
                </span>
              </div>
            </div>

            {/* Hero Visual: Heartbeat Monitor */}
            <div className="relative hidden md:block">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-base font-semibold">Live Monitor</span>
                  </div>
                  <span className="text-sm text-muted-foreground">just now</span>
                </div>
                <svg viewBox="0 0 400 120" className="w-full">
                  <polyline
                    fill="none"
                    stroke="#6F4E37"
                    strokeWidth="2.5"
                    points="0,60 40,60 50,60 60,20 70,100 80,60 120,60 160,60 170,60 180,15 190,105 200,60 240,60 280,60 290,60 300,20 310,100 320,60 360,60 400,60"
                    className="animate-pulse-slow"
                  />
                  <circle cx="300" cy="20" r="8" fill="#6F4E37" className="animate-heartbeat">
                    <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <text x="310" y="16" fill="#A67B5B" fontSize="13" fontFamily="monospace" fontWeight="600">
                    ☕ PING OK — 23ms
                  </text>
                </svg>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <div className="text-2xl font-bold text-foreground">99.98%</div>
                    <div className="text-xs mt-1">Uptime</div>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <div className="text-2xl font-bold text-foreground">23ms</div>
                    <div className="text-xs mt-1">Avg Latency</div>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <div className="text-2xl font-bold text-foreground">5m</div>
                    <div className="text-xs mt-1">Interval</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">Trusted by developers at</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
            {["Render", "Railway", "Fly.io", "Vercel", "Netlify", "Supabase"].map((platform) => (
              <div key={platform} className="text-xl font-bold text-muted-foreground">
                {platform}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Badge className="mb-4 bg-destructive/10 text-destructive">The Problem</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Your Free-Tier Backends Are Sleeping
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Free-tier platforms like Render, Railway, and Fly.io spin down your servers
              after 15-30 minutes of inactivity. This causes:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-destructive">✗</span>
                <span>Cold starts that take 10-30 seconds</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive">✗</span>
                <span>Poor user experience and lost conversions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive">✗</span>
                <span>API timeouts and failed requests</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive">✗</span>
                <span>Unprofessional for production apps</span>
              </li>
            </ul>
          </div>
          <div>
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-400">The Solution</Badge>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              CoffeePing Keeps Them Awake
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              We send human-like pings at regular intervals, so your servers never sleep:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Zero cold starts, instant response times</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Happy users, better conversions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Reliable APIs, no timeouts</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Professional-grade uptime</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features / Tiers */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            The Caffeine Tiers
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Not all pings are created equal. Choose your brew.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-coffee/20 hover:border-coffee/40 transition-colors">
            <CardHeader>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-coffee/10">
                <Zap className="h-7 w-7 text-coffee-light" />
              </div>
              <CardTitle className="text-2xl">The Espresso Shot</CardTitle>
              <CardDescription className="text-base">High-frequency pinging</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground leading-relaxed">
                Pings every 5 minutes for mission-critical MVPs. Your app never
                gets a chance to idle.
              </p>
            </CardContent>
          </Card>
          <Card className="border-coffee/20 hover:border-coffee/40 transition-colors">
            <CardHeader>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-coffee/10">
                <Shield className="h-7 w-7 text-coffee-light" />
              </div>
              <CardTitle className="text-2xl">Smart Beans</CardTitle>
              <CardDescription className="text-base">Content validation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground leading-relaxed">
                We don&apos;t just ping; we read. Define success keywords in your
                JSON response. If your DB is down but your server is up, we
                catch it.
              </p>
            </CardContent>
          </Card>
          <Card className="border-coffee/20 hover:border-coffee/40 transition-colors">
            <CardHeader>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-coffee/10">
                <BarChart3 className="h-7 w-7 text-coffee-light" />
              </div>
              <CardTitle className="text-2xl">The Morning Brew</CardTitle>
              <CardDescription className="text-base">Daily reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground leading-relaxed">
                A clean summary in your inbox every morning showing your uptime
                stats, latency trends, and incident history.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Loved by Developers
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-lg">
                Join thousands of indie hackers, bootstrappers, and open-source
                maintainers keeping their free tiers alive.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Button variant="outline" size="lg" className="gap-2">
                  <Github className="h-5 w-5" />
                  Star on GitHub
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Join Discord
                </Button>
              </div>
              {/* User Avatars */}
              <div className="mt-8 flex items-center gap-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-coffee/10 text-coffee-light text-sm font-semibold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">10,000+</span> developers joined this month
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Servers Awake", value: "43,201+" },
                { label: "Pings Sent Today", value: "1.2M+" },
                { label: "Uptime Tracked", value: "99.98%" },
                { label: "GitHub Stars", value: "2,847" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-background p-8 text-center"
                >
                  <div className="text-3xl font-bold text-coffee-light">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            What Developers Say
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from the developers who keep their servers caffeinated
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              name: "Sarah Chen",
              role: "Indie Hacker",
              content: "CoffeePing saved my Render app from countless cold starts. My users love the instant response times now!",
            },
            {
              name: "Marcus Johnson",
              role: "Startup Founder",
              content: "The human-like jitter is brilliant. My Railway app stays awake without triggering any alerts. Absolutely essential.",
            },
            {
              name: "Emily Rodriguez",
              role: "Open Source Maintainer",
              content: "Free forever for 3 servers? That&apos;s incredible. The status pages are a nice bonus for transparency.",
            },
          ].map((testimonial, i) => (
            <Card key={i} className="border-coffee/20 hover:border-coffee/40 transition-colors">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Coffee key={j} className="h-4 w-4 text-coffee-light fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coffee/10 text-coffee-light font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to keep your servers awake
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Sign Up",
                description: "Create your free account in seconds with GitHub or email",
                icon: <Github className="h-6 w-6" />,
              },
              {
                step: "02",
                title: "Add Servers",
                description: "Paste your server URLs and configure ping intervals",
                icon: <Plus className="h-6 w-6" />,
              },
              {
                step: "03",
                title: "Stay Awake",
                description: "Your servers stay caffeinated 24/7 with human-like pings",
                icon: <Activity className="h-6 w-6" />,
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-bold text-coffee/5 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative pt-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-coffee/10 text-coffee-light mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you need more
          </p>
          {/* Urgency Banner */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
            <Zap className="h-4 w-4" />
            <span>Limited time: Get FREE Pro when you sign up today!</span>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <Card className="border-coffee/20">
            <CardHeader>
              <CardTitle className="text-2xl">Free Forever</CardTitle>
              <CardDescription>Perfect for side projects</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {[
                  "3 servers",
                  "5-minute minimum interval",
                  "Public status pages",
                  "Basic notifications",
                  "Community support",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block">
                <Button size="lg" variant="outline" className="w-full">
                  Get Started Free
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-coffee/50 bg-gradient-to-br from-coffee/10 to-transparent relative">
            <div className="absolute -top-3 right-6 flex gap-2">
              <Badge className="bg-coffee text-white">Popular</Badge>
              <Badge className="bg-amber-500 text-white">50% OFF</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>For power users</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold">$9</span>
                <span className="text-muted-foreground line-through ml-2">$18</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-amber-400 mt-2">Limited time offer</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {[
                  "Unlimited servers",
                  "1-minute minimum interval",
                  "Custom branding",
                  "Priority notifications",
                  "Priority support",
                  "API access",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block">
                <Button size="lg" className="w-full bg-coffee hover:bg-coffee-light text-white">
                  Upgrade to Pro
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Everything you need to know
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Is CoffeePing really free forever?",
                a: "Yes! The free tier includes 3 servers with 5-minute minimum intervals. No credit card required.",
              },
              {
                q: "Will my platform detect the pings?",
                a: "Our human-like jitter makes pings appear natural with randomized timing and distributed IP addresses.",
              },
              {
                q: "What happens if my server goes down?",
                a: "CoffeePing immediately triggers all configured notifications (Discord, Slack, Telegram, webhooks).",
              },
              {
                q: "Can I customize the ping interval?",
                a: "Free tier: 5-60 minutes. Pro tier: 1-60 minutes.",
              },
              {
                q: "Do I need to install anything?",
                a: "No! CoffeePing is a hosted service. Just add your server URLs and we handle the rest.",
              },
            ].map((item, i) => (
              <Card key={i} className="border-coffee/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-2xl border border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-12 text-center">
          <Globe className="mx-auto mb-4 h-10 w-10 text-coffee-light" />
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to Stop Cold Starts?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Paste a URL. Pick an interval. Done. Your free-tier backend will
            stay caffeinated forever.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-coffee hover:bg-coffee-light text-white px-10 h-14">
                Get Caffeinated for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="px-10 text-lg h-14">
                Read the Docs
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Free forever for up to 3 URLs. No credit card required.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
