import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, MessageCircle, Heart, Zap, Shield, Users, Coffee, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About CoffeePing | The Best Free Server Monitoring Tool",
  description: "Learn about CoffeePing, the #1 free tool to keep your Render, Railway, and Fly.io apps awake. Built with ❤️ by John Varghese (J0X).",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-coffee to-coffee-light text-white shadow-lg">
              <Coffee className="h-10 w-10" />
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-bold">About CoffeePing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The #1 free tool to keep your free-tier backends awake 24/7. Built by developers, for developers.
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12 border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                CoffeePing exists to solve one of the biggest pain points for indie hackers, bootstrappers, and open-source maintainers: cold starts on free-tier platforms.
              </p>
              <p className="text-muted-foreground">
                We believe that great tools should be accessible to everyone, regardless of budget. That's why CoffeePing is 100% free forever.
              </p>
            </div>
            <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-coffee/10 text-coffee-light">
              <Heart className="h-16 w-16" />
            </div>
          </div>
        </Card>

        {/* Story */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-center">Our Story</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">The Problem</h3>
              <p className="text-muted-foreground">
                Free-tier platforms like Render, Railway, and Fly.io are amazing, but they have one major flaw: cold starts. When your app goes idle, it takes 10-30 seconds to wake up, frustrating users and hurting your reputation.
              </p>
            </Card>
            
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Coffee className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">The Solution</h3>
              <p className="text-muted-foreground">
                CoffeePing sends human-like pings to your servers every few minutes, keeping them awake and ready to respond instantly. No more cold starts, no more frustrated users, just smooth, fast performance.
              </p>
            </Card>
            
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Built Differently</h3>
              <p className="text-muted-foreground">
                Unlike other monitoring tools, CoffeePing uses human-like jitter to avoid platform detection. Our distributed workers send pings from multiple locations, making them appear completely natural.
              </p>
            </Card>
            
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Community First</h3>
              <p className="text-muted-foreground">
                CoffeePing is open-source and community-driven. We listen to feedback, implement requested features, and continuously improve based on real-world usage. Join thousands of developers who trust CoffeePing.
              </p>
            </Card>
          </div>
        </section>

        {/* Creator */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-center">Built by John Varghese (J0X)</h2>
          <Card className="border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-coffee to-coffee-light text-white text-4xl font-bold">
                JV
              </div>
              <div className="flex-1">
                <h3 className="mb-3 text-2xl font-bold">John Varghese</h3>
                <p className="text-muted-foreground mb-4">
                  Full-stack developer and open-source enthusiast passionate about building tools that make developers' lives easier. John created CoffeePing to solve the cold start problem he faced while building side projects on free-tier platforms.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://linkedin.com/in/John--Varghese"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-lg border border-coffee/30 bg-coffee/10 px-4 py-2 text-sm text-coffee-light hover:bg-coffee/20 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    Connect on LinkedIn
                  </a>
                  <a
                    href="https://github.com/John-Varghese-EH"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-lg border border-coffee/30 bg-coffee/10 px-4 py-2 text-sm text-coffee-light hover:bg-coffee/20 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    Follow on GitHub
                  </a>
                  <a
                    href="https://twitter.com/CoffeePing"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-lg border border-coffee/30 bg-coffee/10 px-4 py-2 text-sm text-coffee-light hover:bg-coffee/20 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                    Follow on Twitter
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-center">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-border bg-card p-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mx-auto">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Free Forever</h3>
              <p className="text-muted-foreground text-sm">
                Core features will always be free. No hidden fees, no credit card required, no surprises.
              </p>
            </Card>
            
            <Card className="border-border bg-card p-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mx-auto">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Privacy First</h3>
              <p className="text-muted-foreground text-sm">
                We collect minimal data and never sell your information. Your privacy is paramount.
              </p>
            </Card>
            
            <Card className="border-border bg-card p-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mx-auto">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Community Driven</h3>
              <p className="text-muted-foreground text-sm">
                Open-source and transparent. We build what the community needs, not what maximizes profit.
              </p>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-center">Impact</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="border-coffee/20 bg-card p-6 text-center">
              <div className="text-4xl font-bold text-coffee-light mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </Card>
            <Card className="border-coffee/20 bg-card p-6 text-center">
              <div className="text-4xl font-bold text-coffee-light mb-2">43,000+</div>
              <div className="text-sm text-muted-foreground">Servers Monitored</div>
            </Card>
            <Card className="border-coffee/20 bg-card p-6 text-center">
              <div className="text-4xl font-bold text-coffee-light mb-2">99.98%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </Card>
            <Card className="border-coffee/20 bg-card p-6 text-center">
              <div className="text-4xl font-bold text-coffee-light mb-2">2,847+</div>
              <div className="text-sm text-muted-foreground">GitHub Stars</div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <Card className="mb-12 border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Keep Your Servers Awake?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of developers who trust CoffeePing. Set up in 2 minutes, no credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button className="bg-coffee hover:bg-coffee-light text-white px-8">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://github.com/John-Varghese-EH/CoffeePing" target="_blank">
              <Button variant="outline" className="px-8">
                <Github className="mr-2 h-4 w-4" />
                Star on GitHub
              </Button>
            </Link>
          </div>
        </Card>

        {/* Social Links */}
        <div className="mb-8 flex justify-center gap-4">
          <a
            href="https://github.com/John-Varghese-EH/CoffeePing"
            target="_blank"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card transition-all hover:border-coffee hover:bg-coffee/10"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com/CoffeePing"
            target="_blank"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card transition-all hover:border-coffee hover:bg-coffee/10"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="https://discord.gg/coffeeping"
            target="_blank"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card transition-all hover:border-coffee hover:bg-coffee/10"
          >
            <MessageCircle className="h-6 w-6" />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
