import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Home, ArrowLeft, Search, Github, Twitter, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-[150px] font-bold leading-none text-coffee-light opacity-20">
              404
            </h1>
          </div>

          {/* Error Message */}
          <Card className="mb-8 border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-8">
            <h2 className="mb-4 text-3xl font-bold">Page Not Found</h2>
            <p className="text-muted-foreground mb-6">
              Oops! The page you're looking for doesn't exist or has been moved.
              But don't worry, your servers are still being monitored!
            </p>

            {/* Helpful Links */}
            <div className="grid gap-4 md:grid-cols-2">
              <Link href="/">
                <Button variant="outline" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Documentation
                </Button>
              </Link>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold">What would you like to do?</h3>
            <div className="grid gap-3 md:grid-cols-3">
              <Link href="/dashboard" className="group">
                <Card className="border-coffee/20 bg-card p-4 transition-all hover:border-coffee hover:bg-coffee/5">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coffee/10 text-coffee-light">
                      <Home className="h-6 w-6" />
                    </div>
                    <span className="font-medium">Dashboard</span>
                  </div>
                </Card>
              </Link>
              <Link href="/support" className="group">
                <Card className="border-coffee/20 bg-card p-4 transition-all hover:border-coffee hover:bg-coffee/5">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coffee/10 text-coffee-light">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <span className="font-medium">Get Support</span>
                  </div>
                </Card>
              </Link>
              <Link href="https://github.com/John-Varghese-EH/CoffeePing" target="_blank" className="group">
                <Card className="border-coffee/20 bg-card p-4 transition-all hover:border-coffee hover:bg-coffee/5">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coffee/10 text-coffee-light">
                      <Github className="h-6 w-6" />
                    </div>
                    <span className="font-medium">View on GitHub</span>
                  </div>
                </Card>
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <div>
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>

          {/* Social Links */}
          <div className="mt-12 flex justify-center gap-4">
            <a
              href="https://github.com/John-Varghese-EH/CoffeePing"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card transition-all hover:border-coffee hover:bg-coffee/10"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/CoffeePing"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card transition-all hover:border-coffee hover:bg-coffee/10"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://discord.gg/coffeeping"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card transition-all hover:border-coffee hover:bg-coffee/10"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
