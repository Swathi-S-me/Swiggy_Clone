
import { useQuery } from "@tanstack/react-query";

const fetchAllRestaurants = async (lat: number, lng: number) => {
  const API_URL = `/swiggy-api/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
  
  const res = await fetch(API_URL);
  const json = await res.json();

  const cards = json?.data?.cards || [];

  const allRestaurantsCard = cards.find(
    (card: any) =>
      card?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget" &&
      card?.card?.card?.gridElements?.infoWithStyle?.restaurants
  );

  return allRestaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
};

export const useAllRestaurants = (lat: number, lng: number) =>
  useQuery({
    queryKey: ["allRestaurants", lat, lng],
    queryFn: () => fetchAllRestaurants(lat, lng), 
    enabled: !!lat && !!lng, 
  });
