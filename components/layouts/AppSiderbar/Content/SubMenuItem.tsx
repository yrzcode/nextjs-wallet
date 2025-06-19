"use client";

import Link from "next/link";
import type { MenuItem } from "@/config/ui";
import {
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useSearchParams, usePathname } from "next/navigation";

const SubMenuItem = ({ name, path }: MenuItem) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const checkIsActiveMenu = (type: string) => {
    const dummyUrl = new URL(path, "http://dummy.com");
    if (!pathname.includes(dummyUrl.pathname)) return false;

    if (type === "transactions") {
      const monthRange = searchParams.get("month_range");
      const yearRange = searchParams.get("year_range");
      const pathMonthRange = dummyUrl.searchParams.get("month_range");
      const pathYearRange = dummyUrl.searchParams.get("year_range");
      return monthRange === pathMonthRange && yearRange === pathYearRange;
    }

    if (type === "balance") {
      const filter = searchParams.get("filter");
      const pathFilter = dummyUrl.searchParams.get("filter");
      return filter === pathFilter;
    }

    return false;
  };

  const isActiveMenu = checkIsActiveMenu(pathname.split("/")[1]);
  return (
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuButton
          asChild
          size="default"
          className={isActiveMenu ? "bg-side-selected" : ""}
        >
          <Link href={path} className="text-sm">
            <span>{name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  );
};

export default SubMenuItem;
