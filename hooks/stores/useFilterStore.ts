import type { Filter, FilterState } from "@/types/filter";
import { create } from "zustand";

const defaultFilter: Filter = {
	startDate: undefined,
	endDate: undefined,
};

const useFilterStore = create<FilterState>((set) => ({
	filter: defaultFilter,
	setFilter: (filter: Filter) =>
		set((prev) => ({
			filter: {
				...prev.filter,
				...filter,
			},
		})),
}));

export default useFilterStore;
