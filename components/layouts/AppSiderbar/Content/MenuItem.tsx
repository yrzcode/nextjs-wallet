"use client";

import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import SubMenuItem from "./SubMenuItem";
import useFilterStore from "@/hooks/stores/useFilterStore";
import type { MenuItem as MenuItemType } from "@/types/ui";
import type { SidebarMenuItem as SidebarMenuItemType } from "@/types/ui";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const MenuItem = ({ name, path, icon, subMenuItems }: SidebarMenuItemType) => {
  const Icon = FaIcons[icon as keyof typeof FaIcons];
  const pathname = usePathname();
  const isActive = pathname.includes(path);
  const { setFilter } = useFilterStore();

  const handleSubMenuItemClick = (
    subMenuItem: MenuItemType & { startDate?: Date }
  ) => {
    if (!subMenuItem.path?.includes("transactions")) return;
    if (subMenuItem.startDate) {
      setFilter({ startDate: subMenuItem.startDate });
      setFilter({ endDate: new Date() });
      return;
    }
    setFilter({ startDate: undefined, endDate: undefined });
  };

  return (
    <Collapsible
      defaultOpen={name === "Transactions"}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild key={name}>
          <SidebarMenuButton asChild size="lg">
            {(subMenuItems?.length && (
              <div className={isActive ? "bg-side-selected" : ""}>
                <Icon />
                <span className="text-lg">{name}</span>
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </div>
            )) || (
              <Link href={path} className={isActive ? "bg-side-selected" : ""}>
                <Icon />
                <span className="text-lg">{name}</span>
              </Link>
            )}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1">
          {subMenuItems?.map((subMenuItem) => (
            <SubMenuItem
              key={subMenuItem.name}
              {...subMenuItem}
              onClick={() => handleSubMenuItemClick(subMenuItem)}
            />
          ))}
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default MenuItem;
