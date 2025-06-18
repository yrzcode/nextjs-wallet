import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import SubMenuItem from "./SubMenuItem";
import type { MenuItem as MenuItemType } from "@/config/ui";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";

const MenuItem = ({ name, path, icon, subItems }: MenuItemType) => {
  const Icon = FaIcons[icon as keyof typeof FaIcons];
  return (
    <Collapsible
      defaultOpen={name === "Transactions"}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild key={name}>
          <SidebarMenuButton asChild size="lg" className="text-xl">
            <Link href={path}>
              <Icon />
              <span className="test-4xl">{name}</span>
              {subItems && (
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              )}
            </Link>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {subItems?.map((subItem) => (
            <SubMenuItem key={subItem.name} {...subItem} />
          ))}
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default MenuItem;
