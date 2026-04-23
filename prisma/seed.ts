import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding CoffeePing...");

  const user = await prisma.user.upsert({
    where: { email: "demo@coffeeping.com" },
    update: {},
    create: {
      email: "demo@coffeeping.com",
      name: "Demo User",
    },
  });

  const servers = await Promise.all([
    prisma.server.upsert({
      where: { id: "demo-server-1" },
      update: {},
      create: {
        id: "demo-server-1",
        userId: user.id,
        name: "Demo API",
        url: "https://api.github.com",
        intervalMinutes: 5,
        status: "ACTIVE",
        expectedStatus: 200,
        successKeywords: [],
      },
    }),
    prisma.server.upsert({
      where: { id: "demo-server-2" },
      update: {},
      create: {
        id: "demo-server-2",
        userId: user.id,
        name: "Demo Health Check",
        url: "https://httpbin.org/get",
        intervalMinutes: 10,
        status: "ACTIVE",
        expectedStatus: 200,
        successKeywords: ["url"],
      },
    }),
  ]);

  const now = new Date();
  for (const server of servers) {
    const pings = Array.from({ length: 24 }).map((_, i) => ({
      serverId: server.id,
      statusCode: 200,
      responseTimeMs: 20 + Math.floor(Math.random() * 80),
      success: true,
      keywordMatch: true,
      pingedAt: new Date(now.getTime() - i * 60 * 60 * 1000),
      region: "us-east-1",
    }));
    await prisma.pingLog.createMany({ data: pings });
  }

  await prisma.statusPage.upsert({
    where: { slug: "demo-project" },
    update: {},
    create: {
      userId: user.id,
      slug: "demo-project",
      title: "Demo Project Status",
      description: "Public status page for the demo project.",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
