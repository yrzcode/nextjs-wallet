import uiConfig from "@/config/ui";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AppSidebar = () => {
  const sidebarItems = uiConfig.sidebarItems;
  const profileMenuItems = uiConfig.profileMenuItems;

  return (
    <Sidebar className="text-white">
      <SidebarHeader className="grid place-items-center  bg-side-logo p-0 h-20 text-white">
        <Image
          src="/images/logo.png"
          alt="Cloud Wallet Logo"
          width={220}
          height={90}
        />
      </SidebarHeader>
      <SidebarContent className="bg-side px-8">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="xl"
              className="text-white border-2 border-sidebar-profile bg-side hover:bg-sidebar-profile"
            >
              <UserProfile />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="top"
            className="w-[14rem] bg-sidebar-profile-menu"
          >
            {profileMenuItems.map((item) => {
              const Icon = FaIcons[item.icon as keyof typeof FaIcons];
              return (
                <DropdownMenuItem key={item.name}>
                  <Icon className="text-white" />
                  <span>{item.name}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
