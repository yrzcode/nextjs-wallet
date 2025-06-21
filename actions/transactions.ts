"use server";

import prisma from "@/lib/prisma";
import { Transaction } from "@prisma/client";
import { testUserId } from "./user";

export const getAllTransactions = async (): Promise<Transaction[]> => {
	const transactions = await prisma.transaction.findMany();
	return transactions;
};

export const createNewTransaction = async (
	formData: FormData,
) => {
	const userId = testUserId;
	const type = formData.get("type") as "Deposit" | "Withdrawal";
	const amount = parseFloat(formData.get("amount") as string);
	const description = formData.get("description") as string;

	console.log({ type, amount, description });

	await prisma.transaction.create({
		data: {
			type,
			amount,
			description,
			userId,
		},
	});
};