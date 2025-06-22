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
	const dateString = formData.get("date") as string;

	// Parse the date, use current date if no date is provided
	let date: Date;
	if (dateString && dateString !== "") {
		date = new Date(dateString);
	} else {
		date = new Date();
	}

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

export const updateTransaction = async (
	transactionId: string,
	formData: FormData,
) => {
	const type = formData.get("type") as "Deposit" | "Withdrawal";
	const amount = Number.parseFloat(formData.get("amount") as string);
	const description = formData.get("description") as string;
	const dateString = formData.get("date") as string;

	// Parse the date, use current date if no date is provided
	let date: Date;
	if (dateString && dateString !== "") {
		date = new Date(dateString);
	} else {
		date = new Date();
	}

	await prisma.transaction.update({
		where: { id: transactionId },
		data: {
			type,
			amount,
			description,
			date,
		},
	});

	// Revalidate the transactions page to refresh the data
	revalidatePath("/transactions");
};

export const deleteTransaction = async (transactionId: string) => {
	await prisma.transaction.delete({
		where: {
			id: transactionId,
		},
	});

	// Revalidate the transactions page to refresh the data
	revalidatePath("/transactions");
};
