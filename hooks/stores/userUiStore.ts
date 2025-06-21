import { create } from "zustand";

type UiState = {
	isTransactionModalOpen: boolean;
	openTransactionModal: () => void;
	closeTransactionModal: () => void;
}

const useUiStore = create<UiState>((set) => ({
	isTransactionModalOpen: false,
	openTransactionModal: () =>
		set(() => ({
			isTransactionModalOpen: true,
		})),
	closeTransactionModal: () =>
		set(() => ({
			isTransactionModalOpen: false,
		})),
}));

export default useUiStore;
