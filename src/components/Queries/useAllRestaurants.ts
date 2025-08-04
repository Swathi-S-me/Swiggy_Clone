import { useQuery } from "@tanstack/react-query";

const API_URL =
  "/swiggy-api/dapi/restaurants/list/v5?lat=9.9252007&lng=78.1197754&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

const fetchAllRestaurants = async () => {
  const res = await fetch(API_URL);
  const json = await res.json();

  const cards = json?.data?.cards || [];
  // console.log("All Cards:", cards);

  
  // cards.forEach((card: any, i: number) => {
  //   const type = card?.card?.card?.["@type"];
  //   const id = card?.card?.card?.id;
  //   // console.log(`Card[${i}]:`, { type, id });
  // });

  
  const allRestaurantsCard = cards.find(
    (card: any) =>
      card?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget" &&
      card?.card?.card?.gridElements?.infoWithStyle?.restaurants
  );

  const restaurants =
    allRestaurantsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

  // console.log("Matched Restaurants:", restaurants);

  return restaurants;
};

export const useAllRestaurants = () =>
  useQuery({
    queryKey: ["allRestaurants"],
    queryFn: fetchAllRestaurants,
  });
