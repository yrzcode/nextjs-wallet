import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
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
