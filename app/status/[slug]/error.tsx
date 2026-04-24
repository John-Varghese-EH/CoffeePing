"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Activity, Github, LifeBuoy, Heart, AlertTriangle, Globe, Search } from "lucide-react";

export default function StatusPageError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background text-foreground flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-amber-500/20 shadow-2xl shadow-amber-500/5">
        <CardContent className="p-8 sm:p-10">
          {/* Animated pulse effect */}
          <div className="relative mb-8 flex justify-center">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-red-500/20 border-2 border-amber-500/30 shadow-lg">
              <AlertTriangle className="h-14 w-14 text-amber-500" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-center">Service Unavailable</h1>
          <p className="text-muted-foreground mb-4 text-center max-w-sm mx-auto">
            We&apos;re having trouble loading this status page. The service might be temporarily down or the link may be incorrect.
          </p>

          {/* Cause Cards */}
          <div className="grid gap-3 mb-8">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
              <Search className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Invalid or Expired Link</p>
                <p className="text-xs text-muted-foreground">The URL might be typed incorrectly or the page no longer exists</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
              <Globe className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Page Deleted or Moved</p>
                <p className="text-xs text-muted-foreground">The status page owner may have removed or relocated it</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
              <Coffee className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">CoffeePing Service Issue</p>
                <p className="text-xs text-muted-foreground">Our database or servers might be experiencing downtime</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="gap-2 flex-1"
                onClick={() => window.location.reload()}
              >
                <Activity className="h-4 w-4" />
                Retry Loading
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-coffee to-coffee-light text-white gap-2 hover:shadow-lg transition-all flex-1"
              >
                <Link href="https://coffeeping.vercel.app">
                  <Coffee className="h-4 w-4" />
                  Go to CoffeePing
                </Link>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                variant="secondary"
                className="gap-2 flex-1"
              >
                <Link href="https://github.com/John-Varghese-EH/CoffeePing" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub Project
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="gap-2 text-muted-foreground hover:text-foreground flex-1"
              >
                <Link href="mailto:support@coffeeping.vercel.app">
                  <LifeBuoy className="h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>

          {/* Live Status Badge */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted/30 py-2 px-4 rounded-full w-fit mx-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span>Incident detected - resolving soon</span>
            </div>
          </div>

          {/* Footer branding */}
          <div className="mt-8 space-y-2 text-center">
            <p className="text-xs text-muted-foreground/60 flex items-center justify-center gap-1">
              Crafted with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by{" "}
              <a
                href="https://github.com/John-Varghese-EH"
                target="_blank"
                rel="noopener noreferrer"
                className="text-coffee-light hover:underline font-medium"
              >
                John Varghese (J0X)
              </a>
            </p>
            <p className="text-xs text-muted-foreground/40">
              Powered by{" "}
              <a
                href="https://coffeeping.vercel.app"
                className="hover:underline"
              >
                CoffeePing
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
