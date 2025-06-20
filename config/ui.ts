import type { UIConfig } from "@/types/ui";

const uiConfig: UIConfig = {
	sidebarMenuItems: [
		{
			name: "Transactions",
			icon: "FaExchangeAlt",
			path: "/transactions",
			subMenuItems: [
				{
					name: "all",
					path: "/transactions",
				},
				{
					name: "last one month",
					path: "/transactions?month_range=1",
				},
				{
					name: "last three months",
					path: "/transactions?month_range=3",
				},
				{
					name: "last six months",
					path: "/transactions?month_range=6",
				},
				{
					name: "last one year",
					path: "/transactions?year_range=1",
				},
				{
					name: "last five years",
					path: "/transactions?year_range=5",
				},
				{
					name: "last ten years",
					path: "/transactions?year_range=10",
				},
			],
		},
		{
			name: "Balance",
			icon: "FaWallet",
			path: "/balance",
			subMenuItems: [
				{
					name: "total",
					path: "/balance",
				},
				{
					name: "Income",
					path: "/balance?filter=income",
				},
				{
					name: "Expense",
					path: "/balance?filter=expense",
				},
			],
		},
		{
			name: "Summary",
			icon: "FaRegChartBar",
			path: "/summary",
		},
	],
	profileMenuItems: [
		{
			name: "Account",
			icon: "FaUserCircle",
		},
		{
			name: "Sign out",
			icon: "FaSignOutAlt",
		},
	],
	navbarMenuItems: [{ name: "overview", path: "" }],
};

export default uiConfig;
