import { useQuery } from "@tanstack/react-query";
import type { ImageInfo } from "../components/Food/foodcategory.types";
import type { Restaurant } from "../components/Restaurants/restaurant.types";
import { userLocation } from "../context/LocationContext";

interface CategoryResponse {
  data: {
    cards: Array<{
      card: {
        card: {
          "@type": string;
          id?: string;
          imageGridCards?: {
            info: ImageInfo[];
          };
          gridElements?: {
            infoWithStyle?: {
              restaurants: Restaurant[];
            };
          };
        };
      };
    }>;
  };
}

// Base API fetch function
const fetchSwiggyData = async (lat: number, lng: number): Promise<CategoryResponse> => {
  const res = await fetch(
    `/swiggy-api/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
  );
  
  if (!res.ok) throw new Error("Failed to fetch Swiggy data");
  
  return res.json();
};

// Base hook that fetches all data
export const useSwiggyData = () => {
  const { location } = userLocation();
  const lat = location?.lat ?? 0;
  const lng = location?.lng ?? 0;

  return useQuery<CategoryResponse, Error>({
    queryKey: ["swiggyData", lat, lng],
    queryFn: () => fetchSwiggyData(lat, lng),
    enabled: !!location,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Food Categories Hook
export const useFoodCategories = () => {
  const { data, isLoading, error, isError } = useSwiggyData();
  
  const foodCategories: ImageInfo[] = data?.data?.cards?.find(
    (card: any) =>
      card.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget" &&
      card.card?.card?.imageGridCards
  )?.card?.card?.imageGridCards?.info || [];

  return {
    data: foodCategories,
    isLoading,
    error,
    isError
  };
};

// Top Restaurants Hook
export const useTopRestaurants = () => {
  const { data, isLoading, error, isError } = useSwiggyData();
  
  const topRestaurants: Restaurant[] = data?.data?.cards?.find(
    (card: any) =>
      card.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget" &&
      card?.card?.card?.id === "top_brands_for_you"
  )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

  return {
    data: topRestaurants,
    isLoading,
    error,
    isError
  };
};

// All Restaurants Hook
export const useAllRestaurants = () => {
  const { data, isLoading, error, isError } = useSwiggyData();
  
  const allRestaurants: Restaurant[] = data?.data?.cards?.find(
    (card: any) =>
      card?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget" &&
      card?.card?.card?.gridElements?.infoWithStyle?.restaurants &&
      card?.card?.card?.id !== "top_brands_for_you"
  )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

  return {
    data: allRestaurants,
    isLoading,
    error,
    isError
  };
};

// Homepage Data Hook
export const useHomepageData = () => {
  const { data, isLoading, error, isError } = useSwiggyData();
  
  return {
    data,
    isLoading,
    error,
    isError
  };
};