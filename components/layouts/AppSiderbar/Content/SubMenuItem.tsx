import Link from "next/link";
import type { MenuItemBase } from "@/config/ui";
import {
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const SubMenuItem = ({ name, path }: MenuItemBase) => {
  return (
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuButton asChild>
          <Link href={path}>
            <span>{name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  );
};

export default SubMenuItem;
