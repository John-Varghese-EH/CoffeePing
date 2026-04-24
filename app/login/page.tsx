"use client";

import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Github, Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Welcome back!", description: "Redirecting..." });
      router.push(redirectTo);
      router.refresh();
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      setLoading(false);
      toast({
        title: "GitHub sign in failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address first.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    setLoading(false);
    if (error) {
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setResetSent(true);
      toast({
        title: "Check your email",
        description: "We've sent you a password reset link.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md border-coffee/20 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-coffee/10">
              <Coffee className="h-6 w-6 text-coffee-light" />
            </div>
            <CardTitle className="text-2xl">
              {forgotMode ? "Reset password" : "Welcome back"}
            </CardTitle>
            <CardDescription>
              {forgotMode
                ? "Enter your email and we'll send you a reset link"
                : "Sign in to keep your servers caffeinated"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {forgotMode ? (
              /* Forgot Password Form */
              resetSent ? (
                <div className="text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                    <Coffee className="h-8 w-8 text-emerald-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Check your email for a password reset link. It may take a minute to arrive.
                  </p>
                  <Button
                    variant="ghost"
                    className="gap-2"
                    onClick={() => {
                      setForgotMode(false);
                      setResetSent(false);
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to sign in
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-coffee hover:bg-coffee-light text-white"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send reset link"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full gap-2"
                    onClick={() => setForgotMode(false)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to sign in
                  </Button>
                </form>
              )
            ) : (
              /* Login Form */
              <>
                <Button
                  onClick={handleGithubLogin}
                  variant="outline"
                  className="w-full gap-2"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Github className="h-4 w-4" />}
                  Continue with GitHub
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
                  </div>
                </div>

                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <button
                        type="button"
                        onClick={() => setForgotMode(true)}
                        className="text-xs text-coffee-light hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-coffee hover:bg-coffee-light text-white" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-coffee-light hover:underline">
                    Sign up
                  </Link>
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
