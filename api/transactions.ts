import type { Transaction } from "@/types/transaction";

const dummyTransactions: Transaction[] = new Array(100)
	.fill({
		id: "1",
		type: "Deposit",
		amount: 100,
		description: "Salary",
		createdAt: new Date(),
	})
	.map((_, index) => ({
		id: index.toString(),
		type: index % 2 === 0 ? "Deposit" : "Withdrawal",
		amount: Math.floor(Math.random() * 1000),
		description: `Transaction ${index + 1}`,
		createdAt: new Date(),
	}));

export const getTransactions = (): Promise<Transaction[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(dummyTransactions);
		}, 10);
	});
};
