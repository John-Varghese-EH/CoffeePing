import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Authentication Error</h1>
      <p className="text-muted-foreground">
        We couldn&apos;t sign you in. Please try again.
      </p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
