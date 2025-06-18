import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collapsible } from "@/components/ui/collapsible";
import uiConfig from "@/config/ui";

const Content = () => {
  const sidebarItems = uiConfig.sidebarItems;
  return (
    <SidebarContent className="bg-side px-8">
      <SidebarGroup>
        <SidebarGroupLabel className="text-white">Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <Collapsible defaultOpen className="group/collapsible">
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
            </Collapsible>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default Content;
