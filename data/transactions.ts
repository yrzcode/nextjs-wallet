import { Transaction, TransactionType } from "@prisma/client";

// Realistic transaction descriptions
const depositDescriptions = [
	"Salary Payment",
	"Freelance Project Payment",
	"Investment Return",
	"Dividend Payment",
	"Refund from Online Store",
	"Insurance Claim",
	"Gift Money",
	"Bonus Payment",
	"Bank Interest",
	"Cashback Reward",
	"Tax Refund",
	"Rental Income",
	"Part-time Job Payment",
	"Commission Payment",
	"Prize Money",
];

const withdrawalDescriptions = [
	"Grocery Shopping at Supermarket",
	"Restaurant Dinner",
	"ATM Withdrawal",
	"Online Shopping",
	"Gas Station Payment",
	"Coffee Shop Purchase",
	"Utility Bill Payment",
	"Rent Payment",
	"Insurance Premium",
	"Movie Tickets",
	"Pharmacy Purchase",
	"Public Transportation",
	"Mobile Phone Bill",
	"Internet Service Fee",
	"Gym Membership",
	"Book Store Purchase",
	"Fast Food Order",
	"Taxi Fare",
	"Parking Fee",
	"Subscription Service",
];

const generateTransactionWithDateRange = (
	index: number,
	daysAgoMin: number,
	daysAgoMax: number,
	userId: string = "67bc0cc1-9a51-48fb-8838-5be7586966e",
): Omit<Transaction, "id" | "updatedAt"> => {
	const daysAgo =
		Math.floor(Math.random() * (daysAgoMax - daysAgoMin + 1)) + daysAgoMin;
	const hoursAgo = Math.floor(Math.random() * 24);
	const minutesAgo = Math.floor(Math.random() * 60);

	const createdAt = new Date();
	createdAt.setDate(createdAt.getDate() - daysAgo);
	createdAt.setHours(hoursAgo);
	createdAt.setMinutes(minutesAgo);

	const isDeposit = index % 2 === 0;
	const transactionType = isDeposit ? "Deposit" : "Withdrawal";
	const descriptions = isDeposit ? depositDescriptions : withdrawalDescriptions;
	const randomDescription =
		descriptions[Math.floor(Math.random() * descriptions.length)];

	// Generate realistic amounts based on transaction type
	let amount: number;
	if (isDeposit) {
		// Deposits tend to be larger amounts
		amount = Math.floor(Math.random() * 2000) + 100; // 100-2100
	} else {
		// Withdrawals have more varied amounts
		amount = Math.floor(Math.random() * 500) + 10; // 10-510
	}

	return {
		type: transactionType as TransactionType,
		amount,
		description: randomDescription,
		userId,
		date: createdAt,
		createdAt,
	};
};

export const generateDummyTransactions = (
	userId: string,
): Omit<Transaction, "id" | "updatedAt">[] => [
	// Last 1 month: 28 transactions (0-30 days ago)
	...Array.from({ length: 28 }, (_, i) =>
		generateTransactionWithDateRange(i, 0, 30, userId),
	),

	// 1-3 months: 17 transactions (31-90 days ago)
	...Array.from({ length: 17 }, (_, i) =>
		generateTransactionWithDateRange(i + 28, 31, 90, userId),
	),

	// 3-6 months: 7 transactions (91-180 days ago)
	...Array.from({ length: 7 }, (_, i) =>
		generateTransactionWithDateRange(i + 45, 91, 180, userId),
	),

	// Last 1 year: 65 transactions (181-365 days ago)
	...Array.from({ length: 65 }, (_, i) =>
		generateTransactionWithDateRange(i + 52, 181, 365, userId),
	),

	// Last 5 years: 88 transactions (366-1825 days ago)
	...Array.from({ length: 88 }, (_, i) =>
		generateTransactionWithDateRange(i + 117, 366, 1825, userId),
	),

	// Last 10 years: 123 transactions (1826-3650 days ago)
	...Array.from({ length: 123 }, (_, i) =>
		generateTransactionWithDateRange(i + 205, 1826, 3650, userId),
	),

	// More than 10 years ago: 77 transactions (3651-5475 days ago, i.e., 10-15 years ago)
	...Array.from({ length: 77 }, (_, i) =>
		generateTransactionWithDateRange(i + 328, 3651, 5475, userId),
	),
];

// Default export for backward compatibility, using specified user ID
export const dummyTransactions: Omit<Transaction, "id" | "updatedAt">[] =
	generateDummyTransactions("67bc0cc1-9a51-48fb-8838-5be7586966e");
