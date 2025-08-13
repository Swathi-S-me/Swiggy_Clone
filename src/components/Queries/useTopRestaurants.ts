
import { useQuery } from "@tanstack/react-query";
import type { Restaurant } from "../Restaurants/restaurant.types";
import { userLocation } from "../../context/LocationContext";
const fetchTopRestaurants = async (lat: number, lng: number): Promise<Restaurant[]> => {
  const res = await fetch(
    `/swiggy-api/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
  );
  const json = await res.json();

  const cards = json?.data?.cards || [];

  const topRestaurantsCard = cards.find(
    (card: any) =>
      card.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget"&&
      card?.card?.card?.id === "top_brands_for_you"
  );

  return (
     topRestaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
  );
};

export const useTopRestaurants = () =>{
   const { location } = userLocation(); 
  const lat = location?.lat ?? 0;
  const lng = location?.lng ?? 0;

  return useQuery<Restaurant[], Error>({
    
    queryKey: ["topRestaurants", lat, lng],
    queryFn: () => fetchTopRestaurants(lat, lng),
     enabled: !!location,
  });
};