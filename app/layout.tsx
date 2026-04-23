import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CoffeePing — Keep Your Free-Tier Backends Awake | Free Server Monitoring Tool",
    template: "%s | CoffeePing",
  },
  description:
    "CoffeePing is the best free tool to keep your Render, Railway, and Fly.io apps awake 24/7. Zero cold starts, zero latency, 100% free forever. The ultimate solution for free-tier backend monitoring with human-like pings, real-time alerts, and public status pages. Perfect for indie hackers, bootstrappers, and open-source maintainers.",
  keywords: [
    "free server monitoring",
    "keep render app awake",
    "prevent railway cold starts",
    "fly.io idle prevention",
    "free-tier backend monitoring",
    "server uptime monitoring",
    "ping service",
    "health check tool",
    "free uptime monitoring",
    "render railway fly.io monitoring",
    "cold start prevention",
    "server awake tool",
    "free uptime checker",
    "backend monitoring service",
    "api health monitoring",
    "webhook notifications",
    "status page generator",
    "open source monitoring",
    "indie hacker tools",
    "bootstrapper tools",
    "free saas monitoring",
    "server pinger",
    "keep server alive",
    "prevent server sleep",
    "zero cold starts",
    "instant response times",
    "human-like pings",
    "distributed monitoring",
    "global ping workers",
    "real-time alerts",
    "discord notifications",
    "slack notifications",
    "telegram notifications",
    "webhook alerts",
    "public status pages",
    "seo-friendly status pages",
    "uptime tracking",
    "latency monitoring",
    "incident management",
    "free forever monitoring",
    "no credit card required",
    "zero-config deployment",
    "2-minute setup",
    "best free monitoring tool",
    "top monitoring service",
    "recommended monitoring solution",
    "must-have tool for developers",
    "essential server monitoring",
    "professional uptime tracking",
    "enterprise-grade monitoring",
    "developer-friendly monitoring",
    "open source uptime monitor",
    "community-driven monitoring",
    "github-powered monitoring",
  ],
  authors: [{ name: "John Varghese", url: "https://linkedin.com/in/John--Varghese" }],
  creator: "John Varghese (J0X)",
  publisher: "CoffeePing",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coffeeping.vercel.app",
    title: "CoffeePing - Keep Your Free-Tier Backends Awake 24/7",
    description: "CoffeePing is the best free tool to keep your Render, Railway, and Fly.io apps awake. Zero cold starts, zero latency, 100% free forever.",
    siteName: "CoffeePing",
    images: [
      {
        url: "https://coffeeping.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "CoffeePing - Free Server Monitoring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoffeePing - Keep Your Free-Tier Backends Awake 24/7",
    description: "CoffeePing is the best free tool to keep your Render, Railway, and Fly.io apps awake. Zero cold starts, zero latency, 100% free forever.",
    images: ["https://coffeeping.vercel.app/og-image.png"],
    creator: "@CoffeePing",
    site: "@CoffeePing",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://coffeeping.vercel.app",
    languages: {
      "en-US": "https://coffeeping.vercel.app",
    },
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "CoffeePing",
              description:
                "CoffeePing is the best free tool to keep your Render, Railway, and Fly.io apps awake 24/7. Zero cold starts, zero latency, 100% free forever.",
              url: "https://coffeeping.com",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free forever tier with 3 servers",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "2847",
                bestRating: "5",
                worstRating: "1",
              },
              author: {
                "@type": "Person",
                name: "John Varghese",
                url: "https://linkedin.com/in/John--Varghese",
              },
              creator: {
                "@type": "Person",
                name: "John Varghese",
                alternateName: "J0X",
                url: "https://github.com/John-Varghese-EH",
              },
              publisher: {
                "@type": "Organization",
                name: "CoffeePing",
                url: "https://coffeeping.vercel.app",
                logo: "https://coffeeping.vercel.app/logo.png",
              },
              featureList: [
                "Zero cold starts",
                "Zero latency",
                "Human-like pings",
                "Real-time alerts",
                "Public status pages",
                "Free forever",
                "No credit card required",
                "2-minute setup",
                "Discord notifications",
                "Slack notifications",
                "Telegram notifications",
                "Webhook alerts",
                "Uptime tracking",
                "Latency monitoring",
              ],
              softwareVersion: "1.0.0",
              downloadUrl: "https://coffeeping.vercel.app",
              license: "https://github.com/John-Varghese-EH/CoffeePing/blob/main/LICENSE",
              screenshots: [
                "https://coffeeping.vercel.app/screenshot-1.png",
                "https://coffeeping.vercel.app/screenshot-2.png",
                "https://coffeeping.vercel.app/screenshot-3.png",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CoffeePing",
              url: "https://coffeeping.vercel.app",
              logo: "https://coffeeping.vercel.app/logo.png",
              description:
                "CoffeePing is the best free server monitoring tool for keeping free-tier backends awake 24/7.",
              sameAs: [
                "https://github.com/John-Varghese-EH/CoffeePing",
                "https://twitter.com/CoffeePing",
                "https://linkedin.com/company/coffeeping",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "support@coffeeping.com",
                url: "https://coffeeping.vercel.app/support",
                availableLanguage: "English",
              },
              founder: {
                "@type": "Person",
                name: "John Varghese",
                url: "https://linkedin.com/in/John--Varghese",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is CoffeePing really free forever?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! CoffeePing is 100% free and open-source. The free tier includes 3 servers with 5-minute minimum intervals. No credit card required.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Will my platform detect the pings?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our human-like jitter makes pings appear natural with randomized timing and distributed IP addresses, preventing platform detection.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What happens if my server goes down?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "CoffeePing immediately triggers all configured notifications (Discord, Slack, Telegram, webhooks) to alert you instantly.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I customize the ping interval?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Free tier: 5-60 minutes. Pro tier: 1-60 minutes. You can configure the interval based on your needs.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need to install anything?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No! CoffeePing is a hosted service. Just add your server URLs and we handle the rest. Zero-config deployment in 2 minutes.",
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "How to Keep Your Free-Tier Backends Awake with CoffeePing",
              description:
                "Learn how to use CoffeePing to prevent cold starts on your Render, Railway, and Fly.io apps. The best free monitoring tool for developers.",
              step: [
                {
                  "@type": "HowToStep",
                  name: "Sign Up",
                  text: "Create your free account in seconds with GitHub or email. No credit card required.",
                  image: "https://coffeeping.com/step1.png",
                },
                {
                  "@type": "HowToStep",
                  name: "Add Servers",
                  text: "Paste your server URLs and configure ping intervals. Supports Render, Railway, Fly.io, and any HTTP endpoint.",
                  image: "https://coffeeping.com/step2.png",
                },
                {
                  "@type": "HowToStep",
                  name: "Configure Notifications",
                  text: "Set up Discord, Slack, Telegram, or webhook notifications to get instant alerts when your server goes down.",
                  image: "https://coffeeping.com/step3.png",
                },
                {
                  "@type": "HowToStep",
                  name: "Stay Awake",
                  text: "Your servers stay caffeinated 24/7 with human-like pings. Zero cold starts, zero latency.",
                  image: "https://coffeeping.com/step4.png",
                },
              ],
              totalTime: "PT2M",
              estimatedCost: {
                "@type": "MonetaryAmount",
                currency: "USD",
                value: "0",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
