import FoodCategoryCarousel from "../components/Food/FoodCategoryCarousel";
import AllRestaurantsSection from "../components/Restaurants/AllRestaurantsSection";
import TopRestaurantsCarousel from "../components/Restaurants/TopRestaurantsCarousel";

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <FoodCategoryCarousel />
      <TopRestaurantsCarousel />
      <AllRestaurantsSection />
    </div>
  );
}

export default Home;

