import prisma from "@/lib/prisma";
import { Transaction } from "@prisma/client";

export const getTransactions = async (): Promise<Transaction[]> => {
	const transactions = await prisma.transaction.findMany();
	return transactions;
};