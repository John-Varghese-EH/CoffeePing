import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  MessageCircle,
  BookOpen,
  LifeBuoy,
  Clock,
  CheckCircle2,
  ArrowRight,
  Coffee,
  Zap,
  Users,
  Heart,
  Github,
} from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-coffee/10 text-coffee-light">Support Center</Badge>
          <h1 className="text-5xl font-bold tracking-tight mb-4">We&apos;re Here to Help</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the support you need to keep your servers caffeinated
          </p>
        </div>

        {/* Quick Help */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <Card className="border-coffee/20 hover:border-coffee/40 transition-colors cursor-pointer group">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coffee/10 text-coffee-light mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Find answers in our comprehensive docs</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/docs" className="text-coffee-light hover:underline flex items-center gap-2 text-sm">
                Read the Docs <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-coffee/20 hover:border-coffee/40 transition-colors cursor-pointer group">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coffee/10 text-coffee-light mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6" />
              </div>
              <CardTitle>Community</CardTitle>
              <CardDescription>Join our Discord for community support</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="https://discord.gg/coffeeping" target="_blank" className="text-coffee-light hover:underline flex items-center gap-2 text-sm">
                Join Discord <ArrowRight className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>

          <Card className="border-coffee/20 hover:border-coffee/40 transition-colors cursor-pointer group">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coffee/10 text-coffee-light mb-4 group-hover:scale-110 transition-transform">
                <Github className="h-6 w-6" />
              </div>
              <CardTitle>GitHub Issues</CardTitle>
              <CardDescription>Report bugs or request features</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="https://github.com/John-Varghese-EH/CoffeePing/issues" target="_blank" className="text-coffee-light hover:underline flex items-center gap-2 text-sm">
                Open an Issue <ArrowRight className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="mb-12 border-coffee/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-coffee-light" />
              Send Us a Message
            </CardTitle>
            <CardDescription>We typically respond within 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action="https://docs.google.com/forms/u/0/d/e/1FAIpQLScpG4kALsXxoykBZqPzQrzvrZQSVdntQ4OplVlEpm0seEfZqw/formResponse"
              method="POST"
              target="_self"
              className="space-y-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="entry.541038172">Name</Label>
                  <Input id="entry.541038172" name="entry.541038172" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entry.449057015">Email *</Label>
                  <Input id="entry.449057015" name="entry.449057015" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry.1360337517">Subject</Label>
                <Input id="entry.1360337517" name="entry.1360337517" placeholder="How can we help?" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry.1519177737">Message</Label>
                <textarea
                  id="entry.1519177737"
                  name="entry.1519177737"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us more about your issue..."
                  required
                />
              </div>
              <Button type="submit" size="lg" className="bg-coffee hover:bg-coffee-light text-white">
                Send Message <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Response Time */}
        <div className="mb-12 rounded-2xl border border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <Clock className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Fast Response Times</h3>
                <p className="text-muted-foreground">We typically respond within 24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">&lt;24h</div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <Card className="border-coffee/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LifeBuoy className="h-5 w-5 text-coffee-light" />
              Common Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                q: "How do I get started?",
                a: "Sign up for free, add your server URLs, and configure ping intervals. That's it!",
              },
              {
                q: "Is CoffeePing really free?",
                a: "Yes! Monitor up to 3 servers forever at no cost. Upgrade to Pro for unlimited servers.",
              },
              {
                q: "What platforms do you support?",
                a: "We support all platforms including Render, Railway, Fly.io, and any HTTP endpoint.",
              },
              {
                q: "How do I configure notifications?",
                a: "Navigate to your dashboard, click on a server, and add Discord, Slack, Telegram, or webhook notifications.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely! No contracts, no commitments. Cancel your Pro subscription anytime.",
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* We Care Section */}
        <Card className="mt-12 bg-gradient-to-br from-coffee/10 to-transparent border-coffee/20">
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 text-coffee-light mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">We Care About Your Success</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              CoffeePing is built by developers, for developers. We understand the pain of cold
              starts and idle timeouts. That&apos;s why we&apos;re committed to providing the best
              possible experience and support.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Free forever tier</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>24/7 monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Community-driven</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Open source</span>
              </div>
            </div>
            <div className="border-t border-border pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                CoffeePing is 100% free and open-source. If this project helps you, consider supporting the creator to keep it running forever.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/donate">
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    <Heart className="mr-2 h-4 w-4 hover:scale-125 transition-transform" />
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
              <p className="text-xs text-muted-foreground mt-4">
                Built with ❤️ by{" "}
                <a href="https://linkedin.com/in/John--Varghese" target="_blank" className="text-coffee-light hover:underline">
                  John Varghese
                </a>{" "}
                (<a href="https://github.com/John-Varghese-EH" target="_blank" className="text-coffee-light hover:underline">
                  J0X
                </a>)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Community Stats */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="text-center border-coffee/20">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-coffee-light mx-auto mb-4" />
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-sm text-muted-foreground mt-1">Active Users</div>
            </CardContent>
          </Card>
          <Card className="text-center border-coffee/20">
            <CardContent className="p-6">
              <Coffee className="h-8 w-8 text-coffee-light mx-auto mb-4" />
              <div className="text-3xl font-bold">43,000+</div>
              <div className="text-sm text-muted-foreground mt-1">Servers Monitored</div>
            </CardContent>
          </Card>
          <Card className="text-center border-coffee/20">
            <CardContent className="p-6">
              <Zap className="h-8 w-8 text-coffee-light mx-auto mb-4" />
              <div className="text-3xl font-bold">99.98%</div>
              <div className="text-sm text-muted-foreground mt-1">Uptime</div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
