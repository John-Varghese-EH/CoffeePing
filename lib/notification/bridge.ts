import { prisma } from "@/lib/db";

export type NotifyPayload = {
  serverId: string;
  serverName: string;
  serverUrl: string;
  status: "UP" | "DOWN";
  message?: string;
  responseTimeMs?: number;
  statusCode?: number | null;
  timestamp: string;
};

async function sendWebhook(url: string, payload: NotifyPayload, config: Record<string, unknown>) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(config.secret ? { "X-CoffeePing-Secret": String(config.secret) } : {}),
  };

  await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...payload,
      source: "coffeeping",
      icon_emoji: payload.status === "DOWN" ? ":coffee:" : ":white_check_mark:",
    }),
  });
}

async function sendDiscord(webhookUrl: string, payload: NotifyPayload) {
  const color = payload.status === "DOWN" ? 0xe74c3c : 0x2ecc71;
  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: `${payload.serverName} is ${payload.status}`,
          description: payload.message || `Status code: ${payload.statusCode ?? "N/A"}`,
          color,
          timestamp: payload.timestamp,
          fields: [
            {
              name: "URL",
              value: payload.serverUrl,
              inline: true,
            },
            {
              name: "Response Time",
              value: payload.responseTimeMs ? `${payload.responseTimeMs}ms` : "N/A",
              inline: true,
            },
          ],
          footer: { text: "Powered by CoffeePing ☕" },
        },
      ],
    }),
  });
}

async function sendSlack(webhookUrl: string, payload: NotifyPayload) {
  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `*CoffeePing Alert* ☕\n*${payload.serverName}* is *${payload.status}*\n>${payload.serverUrl}\n>${payload.message || `Status: ${payload.statusCode ?? "N/A"}`}`,
    }),
  });
}

async function sendTelegram(botToken: string, chatId: string, payload: NotifyPayload) {
  const text = `☕ <b>CoffeePing Alert</b>\n<b>${payload.serverName}</b> is <b>${payload.status}</b>\nURL: ${payload.serverUrl}\n${payload.message || ""}`;
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });
}

export async function dispatchNotifications(payload: NotifyPayload) {
  const channels = await prisma.notificationChannel.findMany({
    where: {
      OR: [
        { serverId: payload.serverId, isGlobal: false },
        { isGlobal: true },
      ],
    },
  });

  const promises = channels.map(async (ch) => {
    const config = ch.config as Record<string, unknown>;
    try {
      switch (ch.type) {
        case "WEBHOOK":
          await sendWebhook(config.url as string, payload, config);
          break;
        case "DISCORD":
          await sendDiscord(config.webhookUrl as string, payload);
          break;
        case "SLACK":
          await sendSlack(config.webhookUrl as string, payload);
          break;
        case "TELEGRAM":
          await sendTelegram(
            config.botToken as string,
            config.chatId as string,
            payload
          );
          break;
        default:
          break;
      }
    } catch {
      // Silently fail individual channels; could log to a dead-letter queue
    }
  });

  await Promise.all(promises);
}
