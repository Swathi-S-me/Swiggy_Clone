import React from "react";
import HorizontalScrollCarousel from "../Carousel/HorizontalScrollCarousel";
import { userLocation } from "../../context/LocationContext";
import { useTopRestaurants } from "../../Queries/hooks";
import Card from "../Card/Card";

const TopRestaurantsCarousel: React.FC = () => {
  const { data: restaurants = [], isLoading } = useTopRestaurants();
  const { location } = userLocation();

const locationName =
    location?.address?.split(",")[0] || "your area";

   if (!isLoading && restaurants.length === 0) {
    return null;
  }
  return (
        <div className="mb-10 border-b border-gray-200">
    
    <HorizontalScrollCarousel
      title={`Top restaurant chains in ${locationName}`}
      items={restaurants}
      loading={isLoading}
      renderItem={(rest) => (

         <Card key={rest.info.id} rest={rest} variant="carousel" />
      )}
    />
    </div>
  );
};

export default TopRestaurantsCarousel;
