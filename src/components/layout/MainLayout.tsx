import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import ScrollToTop from "../HomeComponents/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="font-lora">
      <Navbar />
      <Outlet />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default MainLayout;
