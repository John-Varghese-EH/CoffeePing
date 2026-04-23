import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle2, AlertTriangle, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | CoffeePing",
  description: "Read our Terms of Service to understand your rights and responsibilities when using CoffeePing, the best free server monitoring tool.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-coffee/10 text-coffee-light">
              <FileText className="h-8 w-8" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-6">
          <h2 className="mb-4 text-2xl font-bold">Welcome to CoffeePing</h2>
          <p className="text-muted-foreground mb-4">
            These Terms of Service ("Terms") govern your use of CoffeePing, a free server monitoring service provided by John Varghese ("we", "us", or "our"). By using our service, you agree to these Terms.
          </p>
          <p className="text-muted-foreground">
            CoffeePing is the best free tool to keep your Render, Railway, and Fly.io apps awake 24/7. We're committed to providing excellent service while protecting your rights.
          </p>
        </Card>

        {/* Table of Contents */}
        <Card className="mb-8 border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-bold">Table of Contents</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="#acceptance" className="text-coffee-light hover:underline">1. Acceptance of Terms</Link></li>
            <li><Link href="#account" className="text-coffee-light hover:underline">2. Account Registration</Link></li>
            <li><Link href="#service" className="text-coffee-light hover:underline">3. Service Description</Link></li>
            <li><Link href="#acceptable-use" className="text-coffee-light hover:underline">4. Acceptable Use Policy</Link></li>
            <li><Link href="#privacy" className="text-coffee-light hover:underline">5. Privacy Policy</Link></li>
            <li><Link href="#intellectual" className="text-coffee-light hover:underline">6. Intellectual Property</Link></li>
            <li><Link href="#disclaimer" className="text-coffee-light hover:underline">7. Disclaimer of Warranties</Link></li>
            <li><Link href="#limitation" className="text-coffee-light hover:underline">8. Limitation of Liability</Link></li>
            <li><Link href="#termination" className="text-coffee-light hover:underline">9. Account Termination</Link></li>
            <li><Link href="#governing" className="text-coffee-light hover:underline">10. Governing Law</Link></li>
            <li><Link href="#contact" className="text-coffee-light hover:underline">11. Contact Us</Link></li>
          </ul>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-8">
          {/* 1. Acceptance of Terms */}
          <section id="acceptance">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By accessing or using CoffeePing, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our service.
                </p>
                <p>
                  We reserve the right to modify these Terms at any time. Continued use of the service after modifications constitutes your acceptance of the updated Terms.
                </p>
              </div>
            </Card>
          </section>

          {/* 2. Account Registration */}
          <section id="account">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">2. Account Registration</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>To use CoffeePing, you must:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Be at least 13 years old</li>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
                <p>
                  You are responsible for all activities that occur under your account. We reserve the right to suspend or terminate accounts that violate these Terms.
                </p>
              </div>
            </Card>
          </section>

          {/* 3. Service Description */}
          <section id="service">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">3. Service Description</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  CoffeePing provides a free server monitoring service that includes:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Monitoring up to 3 servers on the free tier</li>
                  <li>Human-like ping intervals (5-60 minutes)</li>
                  <li>Real-time notifications via Discord, Slack, Telegram, and webhooks</li>
                  <li>Public status pages for your projects</li>
                  <li>Uptime and latency tracking</li>
                </ul>
                <p>
                  We strive to maintain 99.98% uptime for our monitoring service, but we cannot guarantee uninterrupted access.
                </p>
              </div>
            </Card>
          </section>

          {/* 4. Acceptable Use Policy */}
          <section id="acceptable-use">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">4. Acceptable Use Policy</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>You agree NOT to:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Use CoffeePing for illegal or unauthorized purposes</li>
                  <li>Monitor servers that violate laws or regulations</li>
                  <li>Attempt to circumvent rate limiting or security measures</li>
                  <li>Use automated tools to abuse the service</li>
                  <li>Impersonate any person or entity</li>
                  <li>Violate any applicable local, state, national, or international law</li>
                </ul>
                <p>
                  We reserve the right to terminate accounts that violate this policy without notice.
                </p>
              </div>
            </Card>
          </section>

          {/* 5. Privacy Policy */}
          <section id="privacy">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Shield className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">5. Privacy Policy</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Your privacy is important to us. Please review our{" "}
                  <Link href="/privacy" className="text-coffee-light hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  to understand how we collect, use, and protect your information.
                </p>
                <p>
                  We collect minimal data necessary to provide our service and never sell your personal information.
                </p>
              </div>
            </Card>
          </section>

          {/* 6. Intellectual Property */}
          <section id="intellectual">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">6. Intellectual Property</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  CoffeePing is open-source software licensed under the MIT License. You may view, modify, and distribute the source code under the terms of the license.
                </p>
                <p>
                  The CoffeePing name, logo, and branding are trademarks of John Varghese. You may not use these without permission.
                </p>
                <p>
                  All content, features, and functionality are owned by John Varghese and protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </div>
            </Card>
          </section>

          {/* 7. Disclaimer of Warranties */}
          <section id="disclaimer">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">7. Disclaimer of Warranties</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  CoffeePing is provided "as is" and "as available" without warranties of any kind, either express or implied.
                </p>
                <p>
                  We do not guarantee that the service will be uninterrupted, timely, secure, or error-free. We are not responsible for any downtime or monitoring failures.
                </p>
                <p>
                  You use the service at your own risk. We are not responsible for any damage to your servers or applications resulting from use of our service.
                </p>
              </div>
            </Card>
          </section>

          {/* 8. Limitation of Liability */}
          <section id="limitation">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">8. Limitation of Liability</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  To the fullest extent permitted by law, CoffeePing shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>
                <p>
                  Our total liability to you for all claims shall not exceed the amount you paid (if any) for using our service during the past 12 months.
                </p>
                <p>
                  Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability, so the above limitations may not apply to you.
                </p>
              </div>
            </Card>
          </section>

          {/* 9. Account Termination */}
          <section id="termination">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">9. Account Termination</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  You may terminate your account at any time by contacting us or deleting your account through the dashboard.
                </p>
                <p>
                  We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason at our sole discretion.
                </p>
                <p>
                  Upon termination, your account data will be deleted within 30 days, except as required by law.
                </p>
              </div>
            </Card>
          </section>

          {/* 10. Governing Law */}
          <section id="governing">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">10. Governing Law</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the United States.
                </p>
                <p>
                  Any disputes arising from these Terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
                </p>
              </div>
            </Card>
          </section>

          {/* 11. Contact Us */}
          <section id="contact">
            <Card className="border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-coffee/10 text-coffee-light">
                  <Shield className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">11. Contact Us</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about these Terms, please contact us:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Email: <a href="mailto:support@coffeeping.com" className="text-coffee-light hover:underline">support@coffeeping.com</a></li>
                  <li>Support: <Link href="/support" className="text-coffee-light hover:underline">/support</Link></li>
                  <li>GitHub: <a href="https://github.com/John-Varghese-EH/CoffeePing" target="_blank" className="text-coffee-light hover:underline">github.com/John-Varghese-EH/CoffeePing</a></li>
                </ul>
              </div>
            </Card>
          </section>
        </div>

      </main>

      <Footer />
    </div>
  );
}
