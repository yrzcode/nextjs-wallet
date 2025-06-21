import Header from "./Header";
import Footer from "./Footer/Footer";
import Content from "./Content/Content";
import { Sidebar } from "@/components/ui/sidebar";
import { getUserById, testUserId } from "@/actions/user";

const AppSidebar = async () => {
  const user = await getUserById(testUserId);

  return (
    <Sidebar className="text-white">
      <Header />
      <Content />
      <Footer user={user} />
    </Sidebar>
  );
};

export default AppSidebar;
