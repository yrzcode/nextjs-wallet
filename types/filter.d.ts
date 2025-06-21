export type Filter = {
	startDate?: Date;
	endDate?: Date;
};

export type FilterState = {
	filter: Filter;
	setFilter: (filter: Filter) => void;
};
