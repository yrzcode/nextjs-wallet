// UI configuration types
export type MenuItem = {
	name: string;
	path: string;
};

export type SidebarMenuItem = {
	subMenuItems?: MenuItem[];
	icon: string;
} & MenuItem;

type ProfileMenuItem = {
	name: string;
	icon: string;
};

type UIConfig = {
	sidebarMenuItems: SidebarMenuItem[];
	navbarMenuItems: MenuItem[];
	profileMenuItems: ProfileMenuItem[];
};

// UI configuration data
const uiConfig: UIConfig = {
	sidebarMenuItems: [
		{
			name: "Transactions",
			icon: "FaExchangeAlt",
			path: "/transactions",
			subMenuItems: [
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
			subMenuItems: [
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
	navbarMenuItems: [{ name: "overview", path: "" }],
};

export default uiConfig;
