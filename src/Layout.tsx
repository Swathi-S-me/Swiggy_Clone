import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useHomepageData } from "./components/Queries/useHomepageData";

const Layout: React.FC = () => {
  
  const { data, isLoading } = useHomepageData(0, 0);

  const cities = data?.data?.cards.find(
    (card: any) => 
      card?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.seo.widgets.v1.FooterContent"
  )?.card?.card?.cities || [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <Outlet />
      </main>
      {!isLoading && cities.length > 0 ? (
        <Footer cities={cities} />
      ) : (
        <div className="text-center py-6 text-gray-500">Loading footer...</div>
      )}
    </>
  );
};

export default Layout;
