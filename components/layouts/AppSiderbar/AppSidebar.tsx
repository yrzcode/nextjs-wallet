import uiConfig from "@/config/ui.json";
import UserProfile from "./UserProfile";
import Link from "next/link";
import Image from "next/image";
import * as FaIcons from "react-icons/fa";
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
      <SidebarHeader className="grid place-items-center  bg-side-logo p-0 h-20 text-white">
        <Image
          src="/images/logo.png"
          alt="Cloud Wallet Logo"
          width={200}
          height={90}
        />
      </SidebarHeader>
      <SidebarContent className="bg-side px-8">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = FaIcons[item.icon as keyof typeof FaIcons];
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link href={item.path}>
                        <Icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
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
