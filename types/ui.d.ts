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
