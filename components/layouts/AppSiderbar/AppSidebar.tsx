import Header from "./Header";
import Footer from "./Footer/Footer";
import Content from "./Content/Content";
import { Sidebar } from "@/components/ui/sidebar";

const AppSidebar = () => {
  return (
    <Sidebar className="text-white">
      <Header />
      <Content />
      <Footer />
    </Sidebar>
  );
};

export default AppSidebar;
