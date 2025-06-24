export type { Transaction } from "@prisma/client";

export type TransactionFilter = "all" | "income" | "expenditure";

export type BalanceData = {
	totalIncome: number;
	totalExpenditure: number;
	balance: number;
	transactions: Transaction[];
};
