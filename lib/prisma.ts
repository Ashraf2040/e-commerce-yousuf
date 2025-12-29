// import PrismaClient from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!, // خلي عندك متغير بيئة DATABASE_URL فيه رابط PostgreSQL
});

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["query", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
