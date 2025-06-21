"use server";

import prisma from "@/lib/prisma";
import type { Transaction } from "@prisma/client";
import { testUserId } from "./user";
import { revalidatePath } from "next/cache";

export const getAllTransactions = async (): Promise<Transaction[]> => {
	const transactions = await prisma.transaction.findMany();
	return transactions;
};

export const createNewTransaction = async (formData: FormData) => {
	const userId = testUserId;
	const type = formData.get("type") as "Deposit" | "Withdrawal";
	const amount = Number.parseFloat(formData.get("amount") as string);
	const description = formData.get("description") as string;
	const date = formData.get("date") as string;

	await prisma.transaction.create({
		data: {
			type,
			amount,
			description,
			userId,
			date,
		},
	});

	// Revalidate the transactions page to refresh the data
	revalidatePath("/transactions");
};
