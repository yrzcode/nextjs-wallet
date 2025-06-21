import Image from "next/image";
import { SidebarHeader } from "@/components/ui/sidebar";

const Header = () => {
  return (
    <SidebarHeader className="grid place-items-center  bg-side-logo p-0 h-20 text-white">
      <Image
        src="/images/logo-color.png"
        alt="Cloud Wallet Logo"
        width={230}
        height={100}
        className="ml-[-10px]"
      />
    </SidebarHeader>
  );
};

export default Header;
