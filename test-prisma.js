const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log("No user found");
      return;
    }
    const server = await prisma.server.create({
      data: {
        userId: user.id,
        name: "Test Script",
        url: "https://test.com",
        intervalMinutes: 10,
        expectedStatus: 200,
        timeoutMs: 5000,
        successKeywords: [],
        followRedirects: true,
      },
    });
    console.log("Server created:", server);
    await prisma.server.delete({ where: { id: server.id } });
  } catch (e) {
    console.error("Prisma Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
