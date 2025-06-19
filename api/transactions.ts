import type { Transaction } from "@/types/transaction";

const dummyTransactions: Transaction[] = [
	{
		id: "1",
		type: "Deposit",
		amount: 100,
		description: "Salary",
		createdAt: new Date(),
	},
	{
		id: "2",
		type: "Withdrawal",
		amount: 50,
		description: "Rent",
		createdAt: new Date(),
	},
];

export const getTransactions = (): Promise<Transaction[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(dummyTransactions);
		}, 10);
	});
};
