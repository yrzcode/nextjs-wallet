"use client";

import uiConfig from "@/config/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppNavbar = () => {
  const navMenuItems = uiConfig.navbarMenuItems;
  const pathname = usePathname();

  return (
    <ul className="text-white text-xl font-bold flex h-full flex-1">
      {navMenuItems.map(({ name }) => (
        <Link key={name} href={pathname} className="bg-navbar-selected">
          <li className="px-4 flex items-center h-full">{name}</li>
        </Link>
      ))}
    </ul>
  );
};

export default AppNavbar;
