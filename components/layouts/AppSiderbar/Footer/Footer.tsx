import * as FaIcons from "react-icons/fa";
import UserProfile from "./UserProfile";
import uiConfig from "@/config/ui";
import type { User } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const Footer = ({ user }: { user: User }) => {
  const profileMenuItems = uiConfig.profileMenuItems;
  const { name, email, profile } = user;
  return (
    <SidebarFooter className="bg-side px-4 py-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="xl"
            className="text-white border-2 border-sidebar-profile bg-side hover:bg-sidebar-profile"
          >
            <UserProfile name={name} email={email} profile={profile} />
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
  );
};

export default Footer;
