import { Transaction, TransactionType } from "@prisma/client";

const generateTransactionWithDateRange = (index: number, daysAgoMin: number, daysAgoMax: number, userId: string = "67bc0cc1-9a51-48fb-8838-5be7586966e"): Omit<Transaction, 'id' | 'updatedAt'> => {
	const daysAgo = Math.floor(Math.random() * (daysAgoMax - daysAgoMin + 1)) + daysAgoMin;
	const hoursAgo = Math.floor(Math.random() * 24);
	const minutesAgo = Math.floor(Math.random() * 60);
	
	const createdAt = new Date();
	createdAt.setDate(createdAt.getDate() - daysAgo);
	createdAt.setHours(hoursAgo);
	createdAt.setMinutes(minutesAgo);
	
	return {
		type: (index % 2 === 0 ? "Deposit" : "Withdrawal") as TransactionType,
		amount: Math.floor(Math.random() * 1000),
		description: `Transaction ${index + 1}`,
		userId,
		createdAt,
	};
};

export const generateDummyTransactions = (userId: string): Omit<Transaction, 'id' | 'updatedAt'>[] => [
	// Last 1 month: 28 transactions (0-30 days ago)
	...Array.from({ length: 28 }, (_, i) => generateTransactionWithDateRange(i, 0, 30, userId)),
	
	// 1-3 months: 17 transactions (31-90 days ago)
	...Array.from({ length: 17 }, (_, i) => generateTransactionWithDateRange(i + 28, 31, 90, userId)),
	
	// 3-6 months: 7 transactions (91-180 days ago)
	...Array.from({ length: 7 }, (_, i) => generateTransactionWithDateRange(i + 45, 91, 180, userId)),
	
	// Last 1 year: 65 transactions (181-365 days ago)
	...Array.from({ length: 65 }, (_, i) => generateTransactionWithDateRange(i + 52, 181, 365, userId)),
	
	// Last 5 years: 88 transactions (366-1825 days ago)
	...Array.from({ length: 88 }, (_, i) => generateTransactionWithDateRange(i + 117, 366, 1825, userId)),
	
	// Last 10 years: 123 transactions (1826-3650 days ago)
	...Array.from({ length: 123 }, (_, i) => generateTransactionWithDateRange(i + 205, 1826, 3650, userId)),
	
	// More than 10 years ago: 77 transactions (3651-5475 days ago, i.e., 10-15 years ago)
	...Array.from({ length: 77 }, (_, i) => generateTransactionWithDateRange(i + 328, 3651, 5475, userId)),
];

// Default export for backward compatibility, using specified user ID
export const dummyTransactions: Omit<Transaction, 'id' | 'updatedAt'>[] = generateDummyTransactions("67bc0cc1-9a51-48fb-8838-5be7586966e");
