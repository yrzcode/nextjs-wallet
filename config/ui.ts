// UI configuration types
export type MenuItemBase = {
	name: string;
	path: string;
};

export type MenuItem = {
	subItems?: MenuItemBase[];
	icon: string;
} & MenuItemBase;

type ProfileMenuItem = {
	name: string;
	icon: string;
};

type UIConfig = {
	sidebarItems: MenuItem[];
	profileMenuItems: ProfileMenuItem[];
};

// UI configuration data
const uiConfig: UIConfig = {
	sidebarItems: [
		{
			name: "Transactions",
			icon: "FaExchangeAlt",
			path: "/transactions",
			subItems: [
				{
					name: "last one month",
					path: "/transactions",
				},
				{
					name: "last three months",
					path: "/transactions",
				},
				{
					name: "last six months",
					path: "/transactions",
				},
				{
					name: "last one year",
					path: "/transactions",
				},
				{
					name: "last five years",
					path: "/transactions",
				},
				{
					name: "last ten years",
					path: "/transactions",
				},
			],
		},
		{
			name: "Balance",
			icon: "FaWallet",
			path: "/balance",
			subItems: [
				{
					name: "Income",
					path: "/balance",
				},
				{
					name: "Expense",
					path: "/balance",
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
};

export default uiConfig;
