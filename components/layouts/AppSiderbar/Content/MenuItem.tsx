"use client";

import * as FaIcons from "react-icons/fa";
import SubMenuItem from "./SubMenuItem";
import Link from "next/link";
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
        <CollapsibleContent>
          {subMenuItems?.map((subMenuItem) => (
            <SubMenuItem key={subMenuItem.name} {...subMenuItem} />
          ))}
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default MenuItem;
