export type Transaction = {
	id: string;
	type: "Deposit" | "Withdrawal";
	amount: number;
	description: string;
	createdAt: Date;
};
