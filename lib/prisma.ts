import { PrismaClient } from "@prisma/client";
import path from "node:path";
import fs from "node:fs";

// Set DATABASE_URL if not already set
if (!process.env.DATABASE_URL) {
	const dbPath = path.join(process.cwd(), "prisma", "database.db");
	process.env.DATABASE_URL = `file:${dbPath}`;
	console.log("🔧 Setting DATABASE_URL to:", process.env.DATABASE_URL);

	// Check if database file exists
	if (fs.existsSync(dbPath)) {
		console.log("✅ Database file exists at:", dbPath);
	} else {
		console.log("❌ Database file NOT found at:", dbPath);
	}
}

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
