import type { Transaction } from "@/types/transaction";

const dummyTransactions: Transaction[] = new Array(100)
	.fill({
		id: "1",
		type: "Deposit",
		amount: 100,
		description: "Salary",
		createdAt: new Date(),
	})
	.map((_, index) => {
		// Generate dates from the last 30 days randomly
		const daysAgo = Math.floor(Math.random() * 30);
		const hoursAgo = Math.floor(Math.random() * 24);
		const minutesAgo = Math.floor(Math.random() * 60);
		
		const createdAt = new Date();
		createdAt.setDate(createdAt.getDate() - daysAgo);
		createdAt.setHours(createdAt.getHours() - hoursAgo);
		createdAt.setMinutes(createdAt.getMinutes() - minutesAgo);
		
		return {
			id: index.toString(),
			type: index % 2 === 0 ? "Deposit" : "Withdrawal",
			amount: Math.floor(Math.random() * 1000),
			description: `Transaction ${index + 1}`,
			createdAt,
		};
	});

export const getTransactions = (): Promise<Transaction[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(dummyTransactions);
		}, 10);
	});
};
