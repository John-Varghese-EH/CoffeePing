import { prisma } from "@/lib/db";

/**
 * Ensures a Prisma User record exists for the given Supabase Auth user.
 * Supabase manages authentication, but Prisma needs a User row for
 * foreign keys (servers, notifications, etc.).
 *
 * This is called on every API request that needs to write data.
 * It uses upsert so it's idempotent and safe to call repeatedly.
 */
export async function ensureUser(supabaseUser: {
  id: string;
  email?: string;
  user_metadata?: { full_name?: string };
}) {
  return prisma.user.upsert({
    where: { id: supabaseUser.id },
    update: {
      // Keep email in sync
      email: supabaseUser.email || "",
    },
    create: {
      id: supabaseUser.id,
      email: supabaseUser.email || "",
      name: supabaseUser.user_metadata?.full_name || null,
    },
  });
}
