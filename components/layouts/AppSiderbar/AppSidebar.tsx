import Header from "./Header";
import Footer from "./Footer/Footer";
import Content from "./Content/Content";
import { Sidebar } from "@/components/ui/sidebar";
import { getUserById } from "@/api/user";

const AppSidebar = async () => {
  const user = await getUserById("67bc0cc1-9a51-48fb-8838-5be7586966e5");

  return (
    <Sidebar className="text-white">
      <Header />
      <Content />
      <Footer user={user} />
    </Sidebar>
  );
};

export default AppSidebar;
