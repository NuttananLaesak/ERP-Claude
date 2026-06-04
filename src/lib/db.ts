import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

function createPrismaClient() {
  return new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());
}

type ExtendedClient = ReturnType<typeof createPrismaClient>;

// Versioned key forces stale HMR-cached clients to be replaced
const CACHE_KEY = "__prisma_v2__";
const g = globalThis as unknown as Record<string, ExtendedClient>;

export const db: ExtendedClient =
  g[CACHE_KEY] ?? (g[CACHE_KEY] = createPrismaClient());
