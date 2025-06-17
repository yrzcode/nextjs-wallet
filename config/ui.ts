// UI configuration types
type MenuItemBase = {
	name: string;
	icon: string;
	path: string;
};

type MenuItem = {
	subItems?: MenuItemBase[];
} & MenuItemBase;

type ProfileMenuItem = {
	name: string;
	icon: string;
};

type UIConfig = {
	sidebarItems: MenuItem[];
	profileMenuItems: ProfileMenuItem[];
};

const test = 2 + 3;

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
					icon: "FaExchangeAlt",
					path: "/transactions",
				},
				{
					name: "last 3 months",
					icon: "FaExchangeAlt",
					path: "/transactions",
				},
				{
					name: "last 6 months",
					icon: "FaExchangeAlt",
					path: "/transactions",
				},
				{
					name: "last 1 year",
					icon: "FaExchangeAlt",
					path: "/transactions",
				},
			],
		},
		{
			name: "Balance",
			icon: "FaWallet",
			path: "/balance",
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
