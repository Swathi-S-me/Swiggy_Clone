import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const Layout: React.FC = () => {
  
  

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-8">
        <Outlet />
      </main>
    
        <Footer  />
      
    </>
  );
};

export default Layout;
