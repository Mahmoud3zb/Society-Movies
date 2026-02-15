import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

function Layout() {
  return (
    <div className={`min-h-screen`}>
      <Navbar />
      <div className="pt-16">
        <Outlet />
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}

export default Layout;
