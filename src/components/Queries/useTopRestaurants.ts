
import { useQuery } from "@tanstack/react-query";
import type { Restaurant } from "../Restaurants/restaurant.types";

const fetchTopRestaurants = async (): Promise<Restaurant[]> => {
  const res = await fetch(
    "/swiggy-api/dapi/restaurants/list/v5?lat=9.9252007&lng=78.1197754&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
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

export const useTopRestaurants = () =>
  useQuery<Restaurant[], Error>({
    queryKey: ["topRestaurants"],
    queryFn: fetchTopRestaurants,
  });
