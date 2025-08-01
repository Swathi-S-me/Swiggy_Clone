// src/Queries/useRestaurantMenu.ts
import { useQuery } from "@tanstack/react-query";
import type { RestaurantMenuResponse } from "../../modules/Auth/pages/restaurantMenuPage.types";

const fetchRestaurantMenu = async (restaurantId: string): Promise<RestaurantMenuResponse> => {
  const res = await fetch(`http://localhost:5000/api/restaurant-menu?restaurantId=${restaurantId}`
   
  );
  if (!res.ok) throw new Error("Failed to fetch restaurant menu");
  return res.json();
};

export const useRestaurantMenu = (restaurantId: string) => {
  return useQuery({
    queryKey: ["restaurantMenu", restaurantId],
    queryFn: () => fetchRestaurantMenu(restaurantId),
    enabled: !!restaurantId,
  });
};
