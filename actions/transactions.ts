"use server";

import prisma from "@/lib/prisma";
import type { Transaction } from "@prisma/client";
import { testUserId } from "./user";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Define the validation schema for transaction operations
const transactionSchema = z.object({
	type: z.enum(["Deposit", "Withdrawal"], {
		errorMap: () => ({
			message: "Transaction type must be 'Deposit' or 'Withdrawal'",
		}),
	}),
	amount: z.number().positive({
		message: "Amount must be greater than 0",
	}),
	// description: z.string().min(1, {
	// 	message: "Description cannot be empty",
	// }),
	date: z
		.date()
		.max(new Date(), {
			message: "Date cannot be in the future",
		})
		.optional(),
});

export const getAllTransactions = async (): Promise<Transaction[]> => {
	const transactions = await prisma.transaction.findMany();
	return transactions;
};

export const createNewTransaction = async (formData: FormData) => {
	const userId = testUserId;

	// Extract data from FormData
	const rawType = formData.get("type") as string;
	const rawAmount = formData.get("amount") as string;
	const rawDescription = formData.get("description") as string;
	const rawDateString = formData.get("date") as string;

	// Parse and validate the data
	const amount = Number.parseFloat(rawAmount);
	if (Number.isNaN(amount)) {
		return { success: false, errors: { amount: ["Invalid amount format"] } };
	}

	// Parse the date, use current date if no date is provided
	let date: Date;
	if (rawDateString && rawDateString !== "") {
		date = new Date(rawDateString);
		if (Number.isNaN(date.getTime())) {
			return { success: false, errors: { date: ["Invalid date format"] } };
		}
	} else {
		date = new Date();
	}

	// Validate the input data using Zod schema
	const parseResult = transactionSchema.safeParse({
		type: rawType,
		amount: amount,
		date: date,
	});

	if (!parseResult.success) {
		const fieldErrors = parseResult.error.flatten().fieldErrors;
		return { success: false, errors: fieldErrors };
	}

	await prisma.transaction.create({
		data: {
			type: parseResult.data.type,
			amount: parseResult.data.amount,
			description: rawDescription,
			userId,
			date: parseResult.data.date || new Date(),
		},
	});

	// Revalidate the transactions page to refresh the data
	revalidatePath("/transactions");
	return { success: true };
};

export const updateTransaction = async (
	transactionId: string,
	formData: FormData,
) => {
	// Extract data from FormData
	const rawType = formData.get("type") as string;
	const rawAmount = formData.get("amount") as string;
	const rawDescription = formData.get("description") as string;
	const rawDateString = formData.get("date") as string;

	// Parse and validate the data
	const amount = Number.parseFloat(rawAmount);
	if (Number.isNaN(amount)) {
		return { success: false, errors: { amount: ["Invalid amount format"] } };
	}

	// Parse the date, use current date if no date is provided
	let date: Date;
	if (rawDateString && rawDateString !== "") {
		date = new Date(rawDateString);
		if (Number.isNaN(date.getTime())) {
			return { success: false, errors: { date: ["Invalid date format"] } };
		}
	} else {
		date = new Date();
	}

	// Validate the input data using Zod schema
	const parseResult = transactionSchema.safeParse({
		type: rawType,
		amount: amount,
		date: date,
	});

	if (!parseResult.success) {
		const fieldErrors = parseResult.error.flatten().fieldErrors;
		return { success: false, errors: fieldErrors };
	}

	await prisma.transaction.update({
		where: { id: transactionId },
		data: {
			type: parseResult.data.type,
			amount: parseResult.data.amount,
			description: rawDescription,
			date: parseResult.data.date || new Date(),
		},
	});

	// Revalidate the transactions page to refresh the data
	revalidatePath("/transactions");
	return { success: true };
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
