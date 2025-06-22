import type { Transaction } from "@prisma/client";
import { create } from "zustand";

type TransactionModalState = {
	transaction?: Transaction;
	transactionInputErrors?: Record<string, string[]>;
	setTransactionInputErrors: (errors: Record<string, string[]>) => void;
	isTransactionModalOpen: boolean;
	openTransactionModal: () => void;
	closeTransactionModal: () => void;
	setModalTransaction: (transaction: Transaction) => void;
	clearModalTransaction: () => void;
};

const useUiStore = create<TransactionModalState>((set) => ({
	transaction: undefined,
	transactionInputErrors: undefined,
	isTransactionModalOpen: false,
	openTransactionModal: () =>
		set(() => ({
			isTransactionModalOpen: true,
		})),
	closeTransactionModal: () =>
		set(() => ({
			isTransactionModalOpen: false,
			transactionInputErrors: undefined,
		})),
	setModalTransaction: (transaction) => {
		set(() => ({
			transaction: transaction,
		}));
	},
	setTransactionInputErrors: (errors) => {
		set(() => ({
			transactionInputErrors: errors,
		}));
	},
	clearModalTransaction: () => {
		set(() => ({
			transaction: undefined,
		}));
	},
}));

export default useUiStore;
