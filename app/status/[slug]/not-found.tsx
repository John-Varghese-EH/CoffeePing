import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Coffee, ArrowLeft } from "lucide-react";

export default function StatusPageNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center px-4 max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
          <Search className="h-10 w-10 text-muted-foreground" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Status Page Not Found</h1>
        <p className="text-muted-foreground mb-2">
          We couldn&apos;t find a status page at this URL.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          The page may have been moved, deleted, or the URL might be incorrect.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline">
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild className="bg-coffee hover:bg-coffee-light text-white gap-2">
            <Link href="https://coffeeping.vercel.app">
              <Coffee className="h-4 w-4" />
              Create Your Own
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Powered by{" "}
            <a
              href="https://coffeeping.vercel.app"
              className="text-coffee-light hover:underline"
            >
              CoffeePing
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
