# CoffeePing

An open-source, high-performance SaaS that prevents free-tier backends (Render, Koyeb, Railway) from idling by sending human-like "caffeinated" pings.

![Cron job status](https://api.cron-job.org/jobs/7520045/8c109e23b91da87d/status-7.svg)

## 🚀 Features

- **Zero Cold Starts:** Keep your free-tier backends awake 24/7
- **Human-like Jitter:** Natural ping timing to avoid platform detection
- **Smart Health Checks:** Validate response content, not just status codes
- **Multi-platform Support:** Render, Railway, Fly.io, and more
- **Real-time Notifications:** Discord, Slack, Telegram, Webhooks
- **Public Status Pages:** SEO-friendly uptime pages for your projects
- **Free Forever Tier:** Monitor up to 3 servers at no cost
- **Professional Dashboard:** Beautiful UI with real-time monitoring

## 🛠️ Tech Stack

- **Framework:** Next.js 14/15 (App Router)
- **Database/Auth:** Supabase (PostgreSQL + Real-time)
- **Styling:** Tailwind CSS + Shadcn UI (Dark mode first)
- **Engine:** Edge Functions / Cron Jobs for distributed pings
- **Observability:** Upstash Redis (rate limiting & caching)
- **Charts:** Recharts for uptime/latency visualization

## 📦 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env and fill in your Supabase & Upstash credentials
cp .env.example .env.local

# 3. Generate Prisma client & run migrations
npx prisma generate
npx prisma migrate dev

# 4. Seed demo data (optional)
npm run db:seed

# 5. Start the dev server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🌐 Vercel Deployment

### Prerequisites

1. **Supabase Account:** Create a free account at [supabase.com](https://supabase.com)
2. **Upstash Redis Account:** Create a free account at [upstash.com](https://upstash.com)
3. **Vercel Account:** Create a free account at [vercel.com](https://vercel.com)

### Step-by-Step Deployment

#### 1. Set Up Supabase

```bash
# Create a new project in Supabase dashboard
# Get your credentials from Project Settings > API
```

Required Supabase environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` — Your Supabase service role key (for server-side operations)
- `DATABASE_URL` — Your PostgreSQL connection string

#### 2. Set Up Upstash Redis

```bash
# Create a new Redis database in Upstash dashboard
# Get your REST API credentials
```

Required Upstash environment variables:
- `UPSTASH_REDIS_REST_URL` — Your Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN` — Your Upstash Redis REST token

#### 3. Deploy to Vercel

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

#### 4. Configure Environment Variables in Vercel

In your Vercel project dashboard, go to **Settings > Environment Variables** and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
DATABASE_URL=your-database-url
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
PING_WORKER_SECRET=a-random-secret-for-cron-jobs
```

#### 5. Run Database Migrations

After deployment, run migrations using Vercel CLI:

```bash
vercel env pull .env.local
npx prisma migrate deploy
```

#### 6. Set Up Cron Job (Required for Free Tier)

Vercel's Hobby plan limits internal cron jobs to once per day. To successfully ping your servers every 5 minutes for free, we recommend using [cron-job.org](https://cron-job.org):

1. **Set your Secret:** In your Vercel Project Settings > Environment Variables, ensure `PING_WORKER_SECRET` is set to a secure random password.
2. **Create Cron Job:** Create a free account at [cron-job.org](https://cron-job.org) and click "Create Cronjob".
   - **URL:** `https://your-domain.vercel.app/api/cron/ping`
   - **Schedule:** Every 5 minutes
3. **Authenticate:** Scroll down to the **Advanced** section and check "Add HTTP request headers".
   - **Header:** `x-cron-secret`
   - **Value:** *(The exact password you set in Vercel)*
4. **Save & Test:** Click Create! Your free-tier backend will now be caffeinated every 5 minutes.

### Production Checklist

- [ ] All environment variables configured in Vercel
- [ ] Database migrations deployed
- [ ] Cron job configured (every 5 minutes recommended)
- [ ] Supabase auth providers enabled (GitHub OAuth)
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled (optional)

## 📁 Project Structure

```
app/
  api/
    auth/callback/     # Supabase OAuth callback
    cron/ping/         # Distributed ping orchestrator
    servers/           # CRUD for monitored servers
    webhooks/          # Notification channel management
  dashboard/          # Multi-tenant server dashboard
  docs/               # Comprehensive documentation
  login/              # Professional login page
  onboarding/         # User onboarding flow
  signup/             # Professional signup page
  status/[slug]/      # Public SEO-friendly status pages
  support/            # Support center with contact form
  page.tsx            # Landing page (Hero, Features, Pricing, FAQ)
components/
  navbar.tsx          # Navigation with auth state
  ui/                 # Shadcn UI components
lib/
  ping-engine.ts      # Central ping engine with human-like jitter
  notification/bridge.ts  # Discord, Slack, Telegram, Webhook dispatcher
  redis.ts            # Upstash Redis (rate limits, caching, counters)
  db.ts               # Prisma client singleton
  supabase/           # Supabase client configuration
prisma/
  schema.prisma       # Full multi-tenant schema
  seed.ts             # Demo data seeding
```

## 🏗️ Architecture Highlights

### Human-like Jitter
`calculateJitteredDelay()` randomizes ping timing:
- Up to 30% interval variance
- Daily sine-wave drift for natural patterns
- Per-job randomization across distributed workers

### Distributed Workers
`GET /api/cron/ping` runs on Edge:
- Batches active servers into groups of 25
- Pings with per-job jitter
- Dispatches notifications for down servers

### Smart Health Checks
Users define "Success Keywords" in JSON responses:
- Validates response content, not just HTTP status
- Catches database failures even when server returns 200
- Configurable timeout and expected status codes

### Notification Bridge
Supports multiple notification channels:
- **Webhooks:** Custom HTTP endpoints
- **Discord:** Rich embeds with server status
- **Slack:** Formatted messages with alerts
- **Telegram:** Instant push notifications

### Public Status Pages
Every user gets an SEO-friendly page:
- `/status/my-project` format
- Real-time uptime display
- Incident history
- Custom branding (Pro tier)

### Rate Limiting
Upstash Redis enforces limits:
- Free tier: 3 URL additions per hour
- Pro tier: No rate limits
- Configurable ping intervals

## 💡 Zero-Config Deployment

1. **Sign Up:** Create your free account in seconds
2. **Add Server:** Paste your server URL
3. **Configure:** Set ping interval (5-60 minutes)
4. **Done:** Your server stays caffeinated 24/7

## 🔧 Configuration

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://your-upstash-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-token

# Cron Job Secret
PING_WORKER_SECRET=super-secret-cron-token
```

### Ping Intervals

- **Free Tier:** 5-60 minutes
- **Pro Tier:** 1-60 minutes

### Notification Channels

Configure notifications in the dashboard:
- Discord bot token and channel ID
- Slack webhook URL
- Telegram bot token and chat ID
- Custom webhook URL

## 📊 Monitoring & Analytics

- **Real-time Uptime:** Track server availability
- **Latency Charts:** Monitor response times
- **Incident History:** View past downtime events
- **Daily Reports:** Email summaries (Pro tier)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

Open-source

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- UI components from [Shadcn UI](https://ui.shadcn.com)
- Database by [Supabase](https://supabase.com)
- Redis by [Upstash](https://upstash.com)

## 📞 Support

- **Documentation:** `/docs`
- **Support Center:** `/support`
- **Discord:** Join our community
- **GitHub Issues:** Report bugs and request features

## 🔗 Links

- **Website:** https://coffeeping.vercel.app
- **GitHub:** https://github.com/John-Varghese-EH/CoffeePing
- **Twitter:** @CoffeePing
- **Discord:** https://discord.gg/coffeeping

---

Made with ☕ by developers, for developers
