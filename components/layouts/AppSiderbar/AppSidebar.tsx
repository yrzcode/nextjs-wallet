import uiConfig from "@/config/ui.json";
import UserProfile from "./UserProfile";
import Link from "next/link";
import { Button } from "../../ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const items = uiConfig.sidebarItems;
  return (
    <Sidebar className="text-white">
      <SidebarHeader className="bg-side-logo p-0 h-20 text-white">
        Logo
      </SidebarHeader>
      <SidebarContent className="bg-side">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link href={item.path}>
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-side px-4 py-2">
        <Button
          variant="secondary"
          size="xl"
          className="text-white border-2 border-sidebar-profile bg-side hover:bg-sidebar-profile"
        >
          <UserProfile />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
