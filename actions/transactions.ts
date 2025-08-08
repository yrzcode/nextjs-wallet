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
	// content: z.string().min(1, {
	// 	message: "Content cannot be empty",
	// }),
	date: z
		.date()
		.max(new Date(new Date().setHours(23, 59, 59, 999)), {
			message: "Date cannot be in the future",
		})
		.optional(),
});

export const getAllTransactions = async (): Promise<Transaction[]> => {
	try {
		const transactions = await prisma.transaction.findMany({
			orderBy: {
				date: "desc",
			},
		});
		return transactions;
	} catch (error) {
		console.error("Database connection error:", error);
		// Return empty array if database is not available
		return [];
	}
};

export const getTransactionsByUserId = async (
	userId: string,
): Promise<Transaction[]> => {
	const transactions = await prisma.transaction.findMany({
		where: {
			userId: userId,
		},
		orderBy: {
			date: "desc",
		},
	});
	return transactions;
};

export const createNewTransaction = async (formData: FormData) => {
	const userId = testUserId;

	// Extract data from FormData
	const rawType = formData.get("type") as string;
	const rawAmount = formData.get("amount") as string;
	const rawContent = formData.get("content") as string;
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
			content: rawContent,
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
	const rawContent = formData.get("content") as string;
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
			content: rawContent,
			date: parseResult.data.date || new Date(),
		},
	});

	// Revalidate the transactions page to refresh the data
	revalidatePath("/transactions");
	return { success: true };
};

export const deleteTransaction = async (transactionId: string) => {
	try {
		await prisma.transaction.delete({
			where: {
				id: transactionId,
			},
		});

		// Revalidate the transactions page to refresh the data
		revalidatePath("/transactions");
		return { success: true };
	} catch (error) {
		console.error("Failed to delete transaction:", error);
		return { 
			success: false, 
			errors: { 
				general: ["Failed to delete transaction, please try again later"] 
			} 
		};
	}
};

export const getBalanceData = async (filter?: string) => {
	try {
		const allTransactions = await prisma.transaction.findMany({
			orderBy: {
				date: "desc",
			},
		});

		let filteredTransactions = allTransactions;

		// Filter transactions based on filter parameter
		if (filter === "income") {
			filteredTransactions = allTransactions.filter((t) => t.type === "Deposit");
		} else if (filter === "expenditure") {
			filteredTransactions = allTransactions.filter(
				(t) => t.type === "Withdrawal",
			);
		}

		// Calculate total income
		const totalIncome = allTransactions
			.filter((t) => t.type === "Deposit")
			.reduce((sum, t) => sum + t.amount, 0);

		// Calculate total expenditure
		const totalExpenditure = allTransactions
			.filter((t) => t.type === "Withdrawal")
			.reduce((sum, t) => sum + t.amount, 0);

		// Calculate balance
		const balance = totalIncome - totalExpenditure;

		return {
			totalIncome,
			totalExpenditure,
			balance,
			transactions: filteredTransactions,
			filter: filter || "all",
		};
	} catch (error) {
		console.error("Database connection error:", error);
		// Return empty data if database is not available
		return {
			totalIncome: 0,
			totalExpenditure: 0,
			balance: 0,
			transactions: [],
			filter: filter || "all",
		};
	}
};
