import type { Transaction } from "@prisma/client";
import { create } from "zustand";

type TransactionModalState = {
	transaction?: Transaction;
	isTransactionModalOpen: boolean;
	openTransactionModal: () => void;
	closeTransactionModal: () => void;
	setModalTransaction: (transaction: Transaction) => void;
	clearModalTransaction: () => void;
};

const useUiStore = create<TransactionModalState>((set) => ({
	transaction: undefined,
	isTransactionModalOpen: false,
	openTransactionModal: () =>
		set(() => ({
			isTransactionModalOpen: true,
		})),
	closeTransactionModal: () =>
		set(() => ({
			isTransactionModalOpen: false,
		})),
	setModalTransaction: (transaction: Transaction) => {
		set(() => ({
			transaction: transaction,
		}));
	},
	clearModalTransaction: () => {
		set(() => ({
			transaction: undefined,
		}));
	},
}));

export default useUiStore;
