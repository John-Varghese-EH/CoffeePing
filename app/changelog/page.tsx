import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitCommit, Star, Zap, Shield, MessageCircle, ArrowRight, Calendar, Tag } from "lucide-react";

export const metadata = {
  title: "Changelog | CoffeePing",
  description: "Stay updated with the latest features, improvements, and bug fixes in CoffeePing. See what's new in the best free server monitoring tool.",
};

const changelogEntries = [
  {
    version: "1.0.0",
    date: "2024-04-23",
    type: "release",
    title: "🎉 Initial Release",
    description: "CoffeePing is now live! The #1 free server monitoring tool for keeping your free-tier backends awake.",
    features: [
      "Free forever tier with 3 servers",
      "Human-like ping intervals (5-60 minutes)",
      "Real-time notifications (Discord, Slack, Telegram, Webhooks)",
      "Public status pages for your projects",
      "Uptime and latency tracking",
      "Incident management",
      "Beautiful dashboard with real-time monitoring",
      "Zero-config deployment in 2 minutes",
      "No credit card required",
      "Open-source",
    ],
    improvements: [
      "99.98% uptime guarantee",
      "Distributed ping workers",
      "Platform detection prevention",
      "Rate limiting and security",
      "Comprehensive documentation",
    ],
    fixes: [],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-coffee/10 text-coffee-light">
              <GitCommit className="h-8 w-8" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Changelog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest features, improvements, and bug fixes in CoffeePing.
          </p>
        </div>

        {/* CTA */}
        <Card className="mb-12 border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Want to influence CoffeePing's future?</h2>
              <p className="text-muted-foreground text-sm">
                Join our community, request features, and help shape the next version.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline" className="px-4">
                <Link href="https://github.com/John-Varghese-EH/CoffeePing/issues" target="_blank">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Request Feature
                </Link>
              </Button>
              <Button asChild className="bg-coffee hover:bg-coffee-light text-white px-4">
                <Link href="https://github.com/John-Varghese-EH/CoffeePing" target="_blank">
                  <Star className="mr-2 h-4 w-4" />
                  Star on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Changelog Entries */}
        <div className="space-y-8">
          {changelogEntries.map((entry, index) => (
            <Card
              key={entry.version}
              className={`border-coffee/20 bg-card p-6 ${
                index === 0 ? "ring-2 ring-coffee/30" : ""
              }`}
            >
              {/* Version Header */}
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coffee/10 text-coffee-light">
                    <GitCommit className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold">v{entry.version}</h2>
                      {index === 0 && (
                        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground">{entry.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <span className="rounded-full bg-coffee/10 px-3 py-1 text-xs font-medium text-coffee-light">
                    {entry.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 text-muted-foreground">{entry.description}</p>

              {/* Features */}
              {entry.features.length > 0 && (
                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-emerald-400" />
                    <h3 className="font-semibold">New Features</h3>
                  </div>
                  <ul className="ml-7 list-disc space-y-2 text-sm text-muted-foreground">
                    {entry.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {entry.improvements.length > 0 && (
                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <h3 className="font-semibold">Improvements</h3>
                  </div>
                  <ul className="ml-7 list-disc space-y-2 text-sm text-muted-foreground">
                    {entry.improvements.map((improvement, i) => (
                      <li key={i}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bug Fixes */}
              {entry.fixes.length > 0 && (
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Tag className="h-5 w-5 text-amber-400" />
                    <h3 className="font-semibold">Bug Fixes</h3>
                  </div>
                  <ul className="ml-7 list-disc space-y-2 text-sm text-muted-foreground">
                    {entry.fixes.map((fix, i) => (
                      <li key={i}>{fix}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Upcoming Features */}
        <Card className="mt-12 border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-6">
          <h2 className="mb-4 text-2xl font-bold">Coming Soon</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 mt-1">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Pro Tier</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced features for power users: 1-minute intervals, unlimited servers, custom domains, and more.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 mt-1">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Enhanced Security</h3>
                <p className="text-sm text-muted-foreground">
                  Two-factor authentication, IP allowlisting, and webhook signature verification.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 mt-1">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Team Features</h3>
                <p className="text-sm text-muted-foreground">
                  Team accounts, role-based access control, and shared dashboards.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 mt-1">
                <Star className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Integrations</h3>
                <p className="text-sm text-muted-foreground">
                  PagerDuty, Opsgenie, VictorOps, and more enterprise integrations.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <footer className="border-t border-border py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Logo */}
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center gap-3">
                  <GitCommit className="h-6 w-6 text-coffee-light" />
                  <span className="font-bold text-xl">CoffeePing</span>
                </div>
                <p className="text-sm text-muted-foreground text-center md:text-left">
                  Keep your free-tier backends awake 24/7. Zero cold starts, zero latency.
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-col items-center md:items-start">
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="flex flex-wrap justify-center gap-4 md:justify-start text-sm text-muted-foreground">
                  <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
                  <Link href="/support" className="hover:text-foreground transition-colors">Support</Link>
                  <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                  <Link href="/donate" className="hover:text-foreground transition-colors text-coffee-light">Donate</Link>
                </div>
              </div>

              {/* Legal */}
              <div className="flex flex-col items-center md:items-start">
                <h4 className="font-semibold mb-4">Legal</h4>
                <div className="flex flex-wrap justify-center gap-4 md:justify-start text-sm text-muted-foreground">
                  <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                  <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                  <Link href="https://github.com/John-Varghese-EH/CoffeePing" target="_blank" className="hover:text-foreground transition-colors">GitHub</Link>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 border-t border-border pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} CoffeePing. Open-source.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Built with ❤️ by{" "}
                <a href="https://linkedin.com/in/John--Varghese" target="_blank" className="text-coffee-light hover:underline">
                  John Varghese
                </a>{" "}
                (<a href="https://github.com/John-Varghese-EH" target="_blank" className="text-coffee-light hover:underline">
                  J0X
                </a>)
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
