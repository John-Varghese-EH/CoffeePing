import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle2, Lock, Eye, Database, Globe, UserCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | CoffeePing",
  description: "Learn how CoffeePing protects your privacy. We collect minimal data and never sell your information. Your servers and data are secure with us.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-coffee/10 text-coffee-light">
              <Shield className="h-8 w-8" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Trust Badge */}
        <Card className="mb-8 border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Your Privacy Matters</h2>
              <p className="text-muted-foreground">
                CoffeePing is committed to protecting your privacy. We collect minimal data and never sell your personal information.
              </p>
            </div>
          </div>
        </Card>

        {/* Table of Contents */}
        <Card className="mb-8 border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-bold">Table of Contents</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="#information" className="text-coffee-light hover:underline">1. Information We Collect</Link></li>
            <li><Link href="#usage" className="text-coffee-light hover:underline">2. How We Use Your Information</Link></li>
            <li><Link href="#sharing" className="text-coffee-light hover:underline">3. Information Sharing</Link></li>
            <li><Link href="#security" className="text-coffee-light hover:underline">4. Data Security</Link></li>
            <li><Link href="#retention" className="text-coffee-light hover:underline">5. Data Retention</Link></li>
            <li><Link href="#rights" className="text-coffee-light hover:underline">6. Your Rights</Link></li>
            <li><Link href="#cookies" className="text-coffee-light hover:underline">7. Cookies & Tracking</Link></li>
            <li><Link href="#third-party" className="text-coffee-light hover:underline">8. Third-Party Services</Link></li>
            <li><Link href="#children" className="text-coffee-light hover:underline">9. Children's Privacy</Link></li>
            <li><Link href="#international" className="text-coffee-light hover:underline">10. International Data Transfers</Link></li>
            <li><Link href="#changes" className="text-coffee-light hover:underline">11. Changes to This Policy</Link></li>
            <li><Link href="#contact" className="text-coffee-light hover:underline">12. Contact Us</Link></li>
          </ul>
        </Card>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {/* 1. Information We Collect */}
          <section id="information">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Database className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">1. Information We Collect</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We collect only the information necessary to provide our service:</p>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Account Information</h3>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Email address (for authentication)</li>
                      <li>Full name (optional)</li>
                      <li>GitHub profile (if using OAuth)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Server Information</h3>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Server URLs you monitor</li>
                      <li>Server names and configurations</li>
                      <li>Ping intervals and settings</li>
                      <li>Uptime and latency data</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Usage Data</h3>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Timestamps of pings and incidents</li>
                      <li>Notification channel configurations</li>
                      <li>Dashboard usage patterns</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Technical Data</h3>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>IP address (for rate limiting)</li>
                      <li>Browser type and version</li>
                      <li>Device information</li>
                      <li>Referring URLs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* 2. How We Use Your Information */}
          <section id="usage">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Eye className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We use your information only for:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li><strong>Providing the Service:</strong> Monitor your servers and send notifications</li>
                  <li><strong>Authentication:</strong> Verify your identity and secure your account</li>
                  <li><strong>Improving the Service:</strong> Analyze usage patterns to enhance features</li>
                  <li><strong>Security:</strong> Detect and prevent abuse, fraud, and security threats</li>
                  <li><strong>Communication:</strong> Send important updates about your account</li>
                  <li><strong>Compliance:</strong> Meet legal and regulatory obligations</li>
                </ul>
                <p className="text-sm">
                  <strong>We never:</strong> Sell your data, use it for advertising, or share it with third parties for marketing purposes.
                </p>
              </div>
            </Card>
          </section>

          {/* 3. Information Sharing */}
          <section id="sharing">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Globe className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">3. Information Sharing</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We do not sell your personal information. We may share data only in these limited circumstances:</p>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Service Providers</h3>
                    <p className="text-sm">
                      We use trusted third-party services to operate our platform:
                    </p>
                    <ul className="ml-6 list-disc space-y-1 text-sm">
                      <li><strong>Supabase:</strong> Database and authentication (encrypted at rest)</li>
                      <li><strong>Upstash Redis:</strong> Rate limiting and caching</li>
                      <li><strong>Vercel:</strong> Hosting and infrastructure</li>
                    </ul>
                    <p className="text-sm mt-2">
                      All providers are bound by strict data protection agreements.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Legal Requirements</h3>
                    <p className="text-sm">
                      We may disclose information if required by law, court order, or to protect our rights and safety.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Business Transfers</h3>
                    <p className="text-sm">
                      In the event of a merger, acquisition, or sale of assets, your data may be transferred. We will notify you of any such changes.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">With Your Consent</h3>
                    <p className="text-sm">
                      We may share information when you explicitly consent to such sharing.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* 4. Data Security */}
          <section id="security">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Lock className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">4. Data Security</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li><strong>Encryption:</strong> All data is encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
                  <li><strong>Authentication:</strong> Secure authentication via Supabase Auth with session tokens</li>
                  <li><strong>Access Control:</strong> Strict access controls and least-privilege principles</li>
                  <li><strong>Rate Limiting:</strong> Protection against brute-force attacks and abuse</li>
                  <li><strong>Input Validation:</strong> All user inputs are validated and sanitized</li>
                  <li><strong>Regular Audits:</strong> Security audits and penetration testing</li>
                  <li><strong>Incident Response:</strong> 24/7 monitoring and rapid incident response</li>
                </ul>
                <p className="text-sm">
                  While we take every precaution to protect your information, no method of transmission over the Internet is 100% secure.
                </p>
              </div>
            </Card>
          </section>

          {/* 5. Data Retention */}
          <section id="retention">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Database className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">5. Data Retention</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We retain your data only as long as necessary:</p>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Active Accounts</h3>
                    <p className="text-sm">
                      Data is retained while your account is active and for 30 days after account deletion.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Ping Logs</h3>
                    <p className="text-sm">
                      Ping data is retained for 90 days to provide uptime statistics and incident history.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Incident Records</h3>
                    <p className="text-sm">
                      Incident records are retained for 1 year for analysis and improvement.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Account Deletion</h3>
                    <p className="text-sm">
                      Upon account deletion, all personal data is permanently deleted within 30 days, except as required by law.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* 6. Your Rights */}
          <section id="rights">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <UserCheck className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">6. Your Rights</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li><strong>Portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Objection:</strong> Object to processing of your data</li>
                  <li><strong>Restriction:</strong> Request restriction of data processing</li>
                </ul>
                <p className="text-sm">
                  To exercise these rights, contact us at <a href="mailto:support@coffeeping.com" className="text-coffee-light hover:underline">support@coffeeping.com</a>
                </p>
              </div>
            </Card>
          </section>

          {/* 7. Cookies & Tracking */}
          <section id="cookies">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">7. Cookies & Tracking</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We use cookies and similar technologies to:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Authenticate your session</li>
                  <li>Remember your preferences</li>
                  <li>Analyze usage patterns</li>
                  <li>Improve our service</li>
                </ul>
                <p className="text-sm">
                  You can control cookies through your browser settings. Disabling cookies may affect some features of the service.
                </p>
                <p className="text-sm">
                  We do not use third-party tracking cookies for advertising purposes.
                </p>
              </div>
            </Card>
          </section>

          {/* 8. Third-Party Services */}
          <section id="third-party">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Globe className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">8. Third-Party Services</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>Our service integrates with third-party platforms:</p>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Notification Channels</h3>
                    <p className="text-sm">
                      When you configure notifications, we send data to:
                    </p>
                    <ul className="ml-6 list-disc space-y-1 text-sm">
                      <li><strong>Discord:</strong> Via Discord webhooks</li>
                      <li><strong>Slack:</strong> Via Slack webhooks</li>
                      <li><strong>Telegram:</strong> Via Telegram Bot API</li>
                      <li><strong>Custom Webhooks:</strong> To URLs you specify</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Authentication</h3>
                    <p className="text-sm">
                      We use GitHub OAuth for authentication. GitHub's privacy policy applies to data shared with them.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* 9. Children's Privacy */}
          <section id="children">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <UserCheck className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">9. Children's Privacy</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  CoffeePing is not intended for children under 13. We do not knowingly collect personal information from children under 13.
                </p>
                <p>
                  If we discover we have collected such information, we will delete it immediately. Parents or guardians may contact us for assistance.
                </p>
              </div>
            </Card>
          </section>

          {/* 10. International Data Transfers */}
          <section id="international">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Globe className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">10. International Data Transfers</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data.
                </p>
                <p>
                  Our service providers are located in the United States and comply with applicable data protection laws.
                </p>
              </div>
            </Card>
          </section>

          {/* 11. Changes to This Policy */}
          <section id="changes">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">11. Changes to This Policy</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of significant changes by:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Emailing you (if you've provided consent)</li>
                  <li>Posting a notice on our website</li>
                  <li>Updating the "Last updated" date</li>
                </ul>
                <p className="text-sm">
                  Continued use of the service after changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </Card>
          </section>

          {/* 12. Contact Us */}
          <section id="contact">
            <Card className="border-coffee/20 bg-gradient-to-br from-coffee/10 to-transparent p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-coffee/10 text-coffee-light">
                  <Shield className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">12. Contact Us</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you have questions about this Privacy Policy or your personal data, please contact us:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Email: <a href="mailto:support@coffeeping.com" className="text-coffee-light hover:underline">support@coffeeping.com</a></li>
                  <li>Support: <Link href="/support" className="text-coffee-light hover:underline">/support</Link></li>
                  <li>GitHub: <a href="https://github.com/John-Varghese-EH/CoffeePing" target="_blank" className="text-coffee-light hover:underline">github.com/John-Varghese-EH/CoffeePing</a></li>
                </ul>
                <p className="text-sm">
                  We will respond to your inquiry within 30 days.
                </p>
              </div>
            </Card>
          </section>
        </div>

      </main>

      <Footer />
    </div>
  );
}
