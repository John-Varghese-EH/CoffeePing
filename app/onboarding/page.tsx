"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowRight,
  CheckCircle2,
  Coffee,
  Server,
  Zap,
  Globe,
  Clock,
  Activity,
  Plus,
  ArrowLeft,
  Heart,
  Github,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [serverName, setServerName] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [intervalMinutes, setIntervalMinutes] = useState(5);
  const [creating, setCreating] = useState(false);

  const steps = [
    {
      number: 1,
      title: "Welcome to CoffeePing",
      description: "Let's get your first server caffeinated",
      icon: <Coffee className="h-8 w-8" />,
    },
    {
      number: 2,
      title: "Add Your First Server",
      description: "Enter your server details to start monitoring",
      icon: <Server className="h-8 w-8" />,
    },
    {
      number: 3,
      title: "Configure Monitoring",
      description: "Set up how often we should ping your server",
      icon: <Clock className="h-8 w-8" />,
    },
    {
      number: 4,
      title: "You're All Set!",
      description: "Your server is now being monitored",
      icon: <CheckCircle2 className="h-8 w-8" />,
    },
  ];

  const handleNext = async () => {
    if (step === 3) {
      // Actually create the server via the API
      if (!serverName || !serverUrl) {
        toast({
          title: "Missing information",
          description: "Please go back and fill in your server details.",
          variant: "destructive",
        });
        return;
      }

      setCreating(true);
      try {
        const res = await fetch("/api/servers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: serverName,
            url: serverUrl,
            intervalMinutes,
            successKeywords: [],
          }),
        });

        if (res.ok) {
          toast({ title: "Server created!", description: `${serverName} is now being caffeinated.` });
          setStep(4);
        } else {
          const data = await res.json();
          toast({
            title: "Failed to create server",
            description: data.error || data.details?.fieldErrors?.url?.[0] || "Please check your input.",
            variant: "destructive",
          });
        }
      } catch {
        toast({ title: "Network error", description: "Could not reach the server.", variant: "destructive" });
      } finally {
        setCreating(false);
      }
    } else if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step >= s.number
                      ? "border-coffee bg-coffee text-white"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {step > s.number ? <CheckCircle2 className="h-5 w-5" /> : s.number}
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-between">
              <div
                className={`h-1 bg-coffee transition-all duration-500`}
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-coffee/20">
          <CardHeader className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-coffee/10 text-coffee-light mx-auto mb-4">
              {steps[step - 1].icon}
            </div>
            <CardTitle className="text-3xl">{steps[step - 1].title}</CardTitle>
            <CardDescription className="text-lg">{steps[step - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="rounded-xl bg-card border p-6 space-y-4">
                  <h3 className="font-semibold text-lg">What is CoffeePing?</h3>
                  <p className="text-muted-foreground">
                    CoffeePing keeps your free-tier backends &quot;caffeinated&quot; 24/7 by sending
                    human-like pings at regular intervals. Say goodbye to cold starts!
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { icon: <Zap className="h-5 w-5" />, title: "Zero Cold Starts", desc: "Your servers stay awake" },
                    { icon: <Globe className="h-5 w-5" />, title: "Global Coverage", desc: "Distributed ping workers" },
                    { icon: <Activity className="h-5 w-5" />, title: "Real-time Alerts", desc: "Instant notifications" },
                  ].map((feature, i) => (
                    <div key={i} className="rounded-lg border p-4 text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-coffee/10 text-coffee-light mx-auto mb-3">
                        {feature.icon}
                      </div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="serverName">Server Name</Label>
                    <Input
                      id="serverName"
                      placeholder="e.g., My API Server"
                      value={serverName}
                      onChange={(e) => setServerName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serverUrl">Server URL</Label>
                    <Input
                      id="serverUrl"
                      type="url"
                      placeholder="https://api.example.com/health"
                      value={serverUrl}
                      onChange={(e) => setServerUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
                  <p className="text-sm text-amber-400">
                    <strong>Tip:</strong> Use a health check endpoint that returns 200 OK when your server is healthy.
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>Ping Interval</Label>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {[
                      { value: 5, label: "5 min", desc: "Recommended" },
                      { value: 15, label: "15 min", desc: "Balanced" },
                      { value: 30, label: "30 min", desc: "Minimal" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setIntervalMinutes(option.value)}
                        className={`rounded-lg border p-4 text-left transition-colors ${
                          intervalMinutes === option.value
                            ? "border-coffee bg-coffee/10"
                            : "border-coffee/20 hover:border-coffee/40 hover:bg-coffee/5"
                        }`}
                      >
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-card border p-4 space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    What happens next?
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>We&apos;ll ping your server at the selected interval</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>You&apos;ll receive alerts if your server goes down</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>Track uptime and latency in your dashboard</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                </div>

                <div className="rounded-xl bg-card border p-6">
                  <h3 className="font-semibold text-lg mb-4">Your server is now monitored!</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Server Name:</span>
                      <span className="font-medium">{serverName || "My API Server"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Server URL:</span>
                      <span className="font-medium truncate max-w-[200px]">{serverUrl || "https://api.example.com/health"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ping Interval:</span>
                      <span className="font-medium">{intervalMinutes} minutes</span>
                    </div>
                  </div>
                </div>

                {/* Support Section */}
                <div className="rounded-xl bg-gradient-to-br from-coffee/10 to-transparent border border-coffee/20 p-6">
                  <Heart className="h-8 w-8 text-coffee-light mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Love CoffeePing?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    CoffeePing is 100% free and open-source. If this project helps you, consider supporting the creator to keep it running forever.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
                      <Link href="/donate">
                        <Heart className="mr-2 h-4 w-4 hover:scale-125 transition-transform" />
                        Donate
                      </Link>
                    </Button>
                    <a
                      href="https://github.com/John-Varghese-EH/CoffeePing"
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-lg border border-coffee/30 bg-coffee/10 px-4 py-2 text-sm text-coffee-light hover:bg-coffee/20 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      Star on GitHub
                    </a>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Built with ❤️ by{" "}
                    <a href="https://linkedin.com/in/John--Varghese" target="_blank" className="text-coffee-light hover:underline">
                      John Varghese
                    </a>{" "}
                    (<a href="https://github.com/John-Varghese-EH" target="_blank" className="text-coffee-light hover:underline">
                      J0X
                    </a>)
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <Button variant="outline" className="w-full" onClick={handleComplete}>
                    Go to Dashboard
                  </Button>
                  <Button className="w-full bg-coffee hover:bg-coffee-light text-white" onClick={handleComplete}>
                    Add Another Server <Plus className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex items-center justify-between pt-6 border-t">
                {step > 1 ? (
                  <Button variant="ghost" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                <Button
                  onClick={handleNext}
                  disabled={(step === 2 && (!serverName || !serverUrl)) || creating}
                  className="bg-coffee hover:bg-coffee-light text-white"
                >
                  {creating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      {step === 3 ? "Complete Setup" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skip Onboarding */}
        {step < 4 && (
          <div className="mt-6 text-center">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Skip onboarding and go to dashboard →
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
