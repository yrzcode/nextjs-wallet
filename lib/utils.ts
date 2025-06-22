import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const formatDate = (date: Date) => {
	const formattedDate = date.toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
	// Add spaces around the slashes: 2025/06/21 -> 2025 / 06 / 21
	return formattedDate.replace(/\//g, " / ");
};
