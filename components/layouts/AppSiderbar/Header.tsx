"use client";

import Image from "next/image";
import Link from "next/link";
import useFilterStore from "@/hooks/stores/useFilterStore";
import { SidebarHeader } from "@/components/ui/sidebar";

const Header = () => {
  const { setFilter } = useFilterStore();

  const handleLogoClick = () => {
    setFilter({ startDate: undefined, endDate: undefined });
  };

  return (
    <SidebarHeader className="grid place-items-center  bg-side-logo p-0 h-20 text-white">
      <Link href="/" className="cursor-pointer" onClick={handleLogoClick}>
        <Image
          src="/images/logo-color.png"
          alt="Cloud Wallet Logo"
          width={230}
          height={100}
          className="ml-[-10px]"
        />
      </Link>
    </SidebarHeader>
  );
};

export default Header;
