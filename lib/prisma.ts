import { PrismaClient } from "@prisma/client";

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
	console.log("❌ DATABASE_URL environment variable is not set!");
	console.log(
		"Please create a .env.local file with your Supabase database URL.",
	);
}

// Check if we're in build time (Vercel build environment)
const isBuildTime = process.env.VERCEL && !process.env.DATABASE_URL;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: ["query", "info", "warn", "error"],
		datasources: {
			db: {
				url: process.env.DATABASE_URL,
			},
		},
	});

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}

export default prisma;
