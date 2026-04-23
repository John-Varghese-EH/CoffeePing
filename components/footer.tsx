import Link from "next/link";
import { Coffee, Github, Heart, MessageCircle, Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-muted/10 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-coffee to-coffee-light text-white">
                <Coffee className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl">CoffeePing</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Keep your free-tier backends awake 24/7. Zero cold starts, zero latency. The #1 free server monitoring tool for developers.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/John-Varghese-EH/CoffeePing"
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-all hover:border-coffee hover:bg-coffee/10"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/CoffeePing"
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-all hover:border-coffee hover:bg-coffee/10"
                aria-label="Twitter"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://discord.gg/coffeeping"
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-all hover:border-coffee hover:bg-coffee/10"
                aria-label="Discord"
              >
                <Users className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support Center</Link>
              </li>
              <li>
                <Link href="/changelog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Changelog</Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="/donate" className="text-sm text-coffee-light hover:text-foreground transition-colors font-medium">Donate</Link>
              </li>
              <li>
                <a href="https://github.com/John-Varghese-EH/CoffeePing" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CoffeePing. All rights reserved. Open-source.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
              <span>by</span>
              <a href="https://linkedin.com/in/John--Varghese" target="_blank" className="text-coffee-light hover:underline">
                John Varghese
              </a>
              <span>(</span>
              <a href="https://github.com/John-Varghese-EH" target="_blank" className="text-coffee-light hover:underline">
                J0X
              </a>
              <span>)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
