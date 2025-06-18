import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import uiConfig from "@/config/ui";
import MenuItem from "./MenuItem";

const Content = () => {
  const menuItems = uiConfig.sidebarMenuItems;
  return (
    <SidebarContent className="bg-side px-2">
      <SidebarGroup>
        <SidebarGroupLabel className="text-white text-2xl my-4">
          Menu
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="px-4 text-white">
            {menuItems.map((item) => {
              return <MenuItem key={item.name} {...item} />;
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default Content;
