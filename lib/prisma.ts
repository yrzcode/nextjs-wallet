import { PrismaClient } from "@prisma/client";

// Set DATABASE_URL if not already set
if (!process.env.DATABASE_URL) {
	process.env.DATABASE_URL = "file:./prisma/database.db";
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: ["query", "info", "warn", "error"],
	});

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}

export default prisma;
