import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Github, Coffee, Zap, Shield, Users, Star, ArrowRight, Gift, Sparkles } from "lucide-react";

export const metadata = {
  title: "Support CoffeePing | Keep It Free Forever",
  description: "Support CoffeePing and help keep this free server monitoring tool alive. Your donation helps us maintain servers, add features, and support thousands of developers.",
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-coffee to-coffee-light text-white shadow-lg animate-pulse-slow">
              <Heart className="h-10 w-10" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl sm:text-5xl font-bold">
            Keep CoffeePing <span className="text-coffee-light">Free Forever</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Your support helps us maintain servers, add new features, and keep this tool free for thousands of developers worldwide.
          </p>
        </div>

        {/* Impact Stats */}
        <Card className="mb-12 border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-6">
          <div className="grid gap-6 sm:grid-cols-3 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-coffee-light mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Developers Using CoffeePing</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-coffee-light mb-2">43,000+</div>
              <div className="text-sm text-muted-foreground">Servers Monitored Daily</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-coffee-light mb-2">99.98%</div>
              <div className="text-sm text-muted-foreground">Uptime Guaranteed</div>
            </div>
          </div>
        </Card>

        {/* Why Donate */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-center">Why Your Support Matters</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Server Costs</h3>
              <p className="text-muted-foreground text-sm">
                We run on premium infrastructure to ensure 99.98% uptime. Your donation directly covers server costs.
              </p>
            </Card>
            
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Security & Privacy</h3>
              <p className="text-muted-foreground text-sm">
                We invest in enterprise-grade security to protect your data. Your support helps us maintain these standards.
              </p>
            </Card>
            
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">New Features</h3>
              <p className="text-muted-foreground text-sm">
                We're constantly improving. Your support helps us build features like team accounts, advanced analytics, and more.
              </p>
            </Card>
          </div>
        </section>

        {/* Donation Tiers */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-center">Choose Your Impact</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Free Tier */}
            <Card className="border-border bg-card p-6">
              <CardHeader>
                <CardTitle className="text-xl">☕ Free Supporter</CardTitle>
                <CardDescription>Every bit helps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">$5</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>Your name in supporters list</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>Keep CoffeePing running for 1 day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>Warm fuzzy feeling 😊</span>
                  </li>
                </ul>
                <a
                  href="https://github.com/sponsors/John-Varghese-EH"
                  target="_blank"
                  className="block w-full"
                >
                  <Button variant="outline" className="w-full">
                    Donate $5
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Coffee Tier */}
            <Card className="border-coffee/40 bg-gradient-to-br from-coffee/10 to-transparent p-6 ring-2 ring-coffee/30">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-coffee/20 px-3 py-1 text-xs font-medium text-coffee-light">
                <Heart className="h-3 w-3" />
                Most Popular
              </div>
              <CardHeader>
                <CardTitle className="text-xl">☕☕ Coffee Lover</CardTitle>
                <CardDescription>Make a real difference</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-coffee-light">$15</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>Prominent supporter badge</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>Keep CoffeePing running for 3 days</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>Priority feature requests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>Early access to new features</span>
                  </li>
                </ul>
                <a
                  href="https://github.com/sponsors/John-Varghese-EH"
                  target="_blank"
                  className="block w-full"
                >
                  <Button className="w-full bg-coffee hover:bg-coffee-light text-white">
                    Donate $15
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Super Supporter */}
            <Card className="border-border bg-card p-6">
              <CardHeader>
                <CardTitle className="text-xl">☕☕☕ Super Supporter</CardTitle>
                <CardDescription>Be a hero</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">$50</div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>Gold supporter badge</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>Keep CoffeePing running for 10 days</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>Direct access to creator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>Custom feature development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>Company logo on website</span>
                  </li>
                </ul>
                <a
                  href="https://github.com/sponsors/John-Varghese-EH"
                  target="_blank"
                  className="block w-full"
                >
                  <Button variant="outline" className="w-full">
                    Donate $50
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Urgency Message */}
        <Card className="mb-12 border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Gift className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Limited Time: Double Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Donate this month and your contribution will be matched by our sponsors!
                </p>
              </div>
            </div>
            <a
              href="https://github.com/sponsors/John-Varghese-EH"
              target="_blank"
              className="shrink-0"
            >
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                Donate Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </Card>

        {/* Alternative Ways */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-center">Other Ways to Support</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coffee/10 text-coffee-light flex-shrink-0">
                  <Github className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Star on GitHub</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Give us a star on GitHub to help more developers discover CoffeePing. It's free and takes 2 seconds!
                  </p>
                  <a
                    href="https://github.com/John-Varghese-EH/CoffeePing"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-lg border border-coffee/30 bg-coffee/10 px-4 py-2 text-sm text-coffee-light hover:bg-coffee/20 transition-colors"
                  >
                    <Star className="h-4 w-4" />
                    Star on GitHub
                  </a>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coffee/10 text-coffee-light flex-shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Spread the Word</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Share CoffeePing with your friends, colleagues, and on social media. Help us grow the community!
                  </p>
                  <div className="flex gap-2">
                    <a
                      href="https://twitter.com/intent/tweet?text=Check%20out%20CoffeePing%20-%20the%20best%20free%20server%20monitoring%20tool!%20coffeeping.com"
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-lg border border-coffee/30 bg-coffee/10 px-4 py-2 text-sm text-coffee-light hover:bg-coffee/20 transition-colors"
                    >
                      Share on Twitter
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Trust Message */}
        <Card className="mb-12 border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-coffee/10 text-coffee-light">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">100% Transparent</h3>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                All donations go directly to server costs, development, and community support. We're committed to keeping CoffeePing free forever.
              </p>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
