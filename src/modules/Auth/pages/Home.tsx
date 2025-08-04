import FoodCategoryCarousel from "../../../components/Food/FoodCategoryCarousel"
import AllRestaurantsSection from "../../../components/Restaurants/AllRestaurantsSection"
import TopRestaurantsCarousel from "../../../components/Restaurants/TopRestaurantsCarousel"


function Home() {
  return (
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10  border-b border-gray-200">
        <FoodCategoryCarousel />
      </div>
      <div className="mb-10  border-b border-gray-200">

      <TopRestaurantsCarousel/>
      </div>

      <AllRestaurantsSection/>

  
    </div>
  )
}

export default Home
