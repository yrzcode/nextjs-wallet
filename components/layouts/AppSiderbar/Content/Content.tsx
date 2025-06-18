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
  const sidebarItems = uiConfig.sidebarItems;
  return (
    <SidebarContent className="bg-side px-2">
      <SidebarGroup>
        <SidebarGroupLabel className="text-white text-xl">
          Menu
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="px-4">
            {sidebarItems.map((item) => {
              return <MenuItem key={item.name} {...item} />;
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default Content;
