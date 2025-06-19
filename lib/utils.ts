import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const formatDate = (date: Date) => {
	const formattedDate = date.toLocaleString("ja-JP", { hour12: false });
	return formattedDate;
};
