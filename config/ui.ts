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
					startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
				},
				{
					name: "last three months",
					path: "/transactions?month_range=3",
					startDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
				},
				{
					name: "last six months",
					path: "/transactions?month_range=6",
					startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
				},
				{
					name: "last one year",
					path: "/transactions?month_range=12",
					startDate: new Date(new Date().setMonth(new Date().getMonth() - 12)),
				},
				{
					name: "last five years",
					path: "/transactions?month_range=60",
					startDate: new Date(new Date().setMonth(new Date().getMonth() - 60)),
				},
				{
					name: "last ten years",
					path: "/transactions?month_range=120",
					startDate: new Date(new Date().setMonth(new Date().getMonth() - 120)),
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
