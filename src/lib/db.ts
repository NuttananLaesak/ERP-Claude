import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as { prisma: ReturnType<typeof createPrismaClient> };

function createPrismaClient() {
  return new PrismaClient({
    // prisma+postgres:// URL for Prisma Postgres / Accelerate
    accelerateUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
