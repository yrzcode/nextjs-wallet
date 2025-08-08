import { PrismaClient } from "@prisma/client";
import { userData } from "../data/users";
import { generateDummyTransactions } from "../data/transactions";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Start seeding database...");

	// Clear existing data
	console.log("🧹 Clearing existing data...");
	await prisma.transaction.deleteMany({});
	await prisma.user.deleteMany({});

	// Create user
	console.log("👤 Creating user...");
	const user = await prisma.user.create({
		data: {
			id: userData[0].id,
			email: userData[0].email,
			name: userData[0].name,
			profile: userData[0].profile,
			password: userData[0].password,
		},
	});

	console.log(`✅ Created user: ${user.name} (${user.email})`);

	// Generate transaction data
	console.log("💰 Creating transaction data...");
	const transactionData = generateDummyTransactions(user.id);

	// Batch create transactions
	const transactions = await prisma.transaction.createMany({
		data: transactionData,
	});

	console.log(`✅ Created ${transactions.count} transaction records`);

	// Show statistics
	const userCount = await prisma.user.count();
	const transactionCount = await prisma.transaction.count();
	const totalDeposits = await prisma.transaction.aggregate({
		where: { type: "Deposit" },
		_sum: { amount: true },
		_count: true,
	});
	const totalWithdrawals = await prisma.transaction.aggregate({
		where: { type: "Withdrawal" },
		_sum: { amount: true },
		_count: true,
	});

	console.log("\n📊 Database statistics:");
	console.log(`👥 User count: ${userCount}`);
	console.log(`💳 Total transactions: ${transactionCount}`);
	console.log(
		`📈 Deposits: ${totalDeposits._count} records, Total: ¥${totalDeposits._sum.amount?.toFixed(2) || 0}`,
	);
	console.log(
		`📉 Withdrawals: ${totalWithdrawals._count} records, Total: ¥${totalWithdrawals._sum.amount?.toFixed(2) || 0}`,
	);

	const balance =
		(totalDeposits._sum.amount || 0) - (totalWithdrawals._sum.amount || 0);
	console.log(`💰 Account balance: ¥${balance.toFixed(2)}`);

	console.log("\n🎉 Database seeding completed!");
}

main()
	.catch((e) => {
		console.error("❌ Error during seeding:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
