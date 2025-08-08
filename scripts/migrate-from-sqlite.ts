/**
 * Migrate data from SQLite database to Supabase PostgreSQL database
 * Usage:
 * 1. Make sure the SQLite database file exists at prisma/database.db
 * 2. Ensure .env.local is configured with the Supabase database connection
 * 3. Run: npx ts-node scripts/migrate-from-sqlite.ts
 */

import { PrismaClient } from "@prisma/client";
import path from "node:path";

// SQLite database connection
const sqlitePrisma = new PrismaClient({
	datasources: {
		db: {
			url: `file:${path.join(process.cwd(), "prisma", "database.db")}`,
		},
	},
});

// PostgreSQL (Supabase) database connection
const postgresPrisma = new PrismaClient();

async function migrateData() {
	try {
		console.log("🚀 Start migrating data from SQLite to Supabase...");

		// Check SQLite database connection
		console.log("📋 Checking SQLite database...");
		const sqliteUserCount = await sqlitePrisma.user.count();
		const sqliteTransactionCount = await sqlitePrisma.transaction.count();

		console.log(
			`SQLite database contains: ${sqliteUserCount} users, ${sqliteTransactionCount} transactions`,
		);

		if (sqliteUserCount === 0) {
			console.log("⚠️  No data in SQLite database, migration aborted");
			return;
		}

		// Optionally clear PostgreSQL database
		const shouldClearPostgres = process.argv.includes("--clear");
		if (shouldClearPostgres) {
			console.log("🧹 Clearing Supabase database...");
			await postgresPrisma.transaction.deleteMany({});
			await postgresPrisma.user.deleteMany({});
		}

		// Migrate user data
		console.log("👥 Migrating user data...");
		const sqliteUsers = await sqlitePrisma.user.findMany();

		for (const user of sqliteUsers) {
			try {
				await postgresPrisma.user.upsert({
					where: { id: user.id },
					update: {
						email: user.email,
						name: user.name,
						profile: user.profile,
						password: user.password,
						updatedAt: user.updatedAt,
					},
					create: {
						id: user.id,
						email: user.email,
						name: user.name,
						profile: user.profile,
						password: user.password,
						createdAt: user.createdAt,
						updatedAt: user.updatedAt,
					},
				});
				console.log(`✅ Migrated user: ${user.name} (${user.email})`);
			} catch (error) {
				console.error(`❌ Failed to migrate user ${user.email}:`, error);
			}
		}

		// Migrate transaction data
		console.log("💰 Migrating transaction data...");
		const sqliteTransactions = await sqlitePrisma.transaction.findMany({
			orderBy: { createdAt: "asc" },
		});

		let migratedCount = 0;
		const batchSize = 100;

		for (let i = 0; i < sqliteTransactions.length; i += batchSize) {
			const batch = sqliteTransactions.slice(i, i + batchSize);

			try {
				await postgresPrisma.transaction.createMany({
					data: batch.map((transaction) => ({
						id: transaction.id,
						type: transaction.type,
						amount: transaction.amount,
						content: transaction.content,
						userId: transaction.userId,
						date: transaction.date,
						createdAt: transaction.createdAt,
						updatedAt: transaction.updatedAt,
					})),
					skipDuplicates: true,
				});

				migratedCount += batch.length;
				console.log(
					`✅ Migrated ${migratedCount}/${sqliteTransactions.length} transactions`,
				);
			} catch (error) {
				console.error("❌ Failed to migrate transaction batch:", error);
			}
		}

		// Verify migration results
		console.log("🔍 Verifying migration results...");
		const postgresUserCount = await postgresPrisma.user.count();
		const postgresTransactionCount = await postgresPrisma.transaction.count();

		console.log("\n📊 Migration summary:");
		console.log(
			`👥 Users: SQLite ${sqliteUserCount} → Supabase ${postgresUserCount}`,
		);
		console.log(
			`💳 Transactions: SQLite ${sqliteTransactionCount} → Supabase ${postgresTransactionCount}`,
		);

		if (
			postgresUserCount === sqliteUserCount &&
			postgresTransactionCount === sqliteTransactionCount
		) {
			console.log("🎉 Data migration completed successfully!");
		} else {
			console.log("⚠️  Data migration may be incomplete, please check the logs");
		}
	} catch (error) {
		console.error("❌ Error occurred during migration:", error);
	} finally {
		await sqlitePrisma.$disconnect();
		await postgresPrisma.$disconnect();
	}
}

// Run migration
migrateData();
